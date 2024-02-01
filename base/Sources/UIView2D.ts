
class UIView2D {

	///if (is_paint || is_sculpt)
	static pipe: PipelineState;
	static channelLocation: ConstantLocation;
	static textInputHover = false;
	static uvmapShow = false;
	static texType = PaintTex.TexBase;
	static layerMode = View2DLayerMode.View2DSelected;
	///end

	///if (is_paint || is_sculpt)
	static type = View2DType.View2DLayer;
	///else
	static type = View2DType.View2DAsset;
	///end

	static show = false;
	static wx: i32;
	static wy: i32;
	static ww: i32;
	static wh: i32;
	static ui: Zui;
	static hwnd = new Handle();
	static panX = 0.0;
	static panY = 0.0;
	static panScale = 1.0;
	static tiledShow = false;
	static controlsDown = false;

	constructor() {
		///if (is_paint || is_sculpt)
		UIView2D.pipe = new PipelineState();
		UIView2D.pipe.vertexShader = System.getShader("layer_view.vert");
		UIView2D.pipe.fragmentShader = System.getShader("layer_view.frag");
		let vs = new VertexStructure();
		vs.add("pos", VertexData.F32_3X);
		vs.add("tex", VertexData.F32_2X);
		vs.add("col", VertexData.U8_4X_Normalized);
		UIView2D.pipe.inputLayout = [vs];
		UIView2D.pipe.blendSource = BlendingFactor.BlendOne;
		UIView2D.pipe.blendDestination = BlendingFactor.BlendZero;
		UIView2D.pipe.colorWriteMasksAlpha[0] = false;
		UIView2D.pipe.compile();
		UIView2D.channelLocation = UIView2D.pipe.getConstantLocation("channel");
		///end

		let scale = Config.raw.window_scale;
		UIView2D.ui = new Zui({ theme: Base.theme, font: Base.font, color_wheel: Base.colorWheel, black_white_gradient: Base.colorWheelGradient, scaleFactor: scale });
		UIView2D.ui.scrollEnabled = false;
	}

	static render = (g: Graphics2) => {

		UIView2D.ww = Config.raw.layout[LayoutSize.LayoutNodesW];

		///if (is_paint || is_sculpt)
		UIView2D.wx = Math.floor(App.w()) + UIToolbar.toolbarw;
		///else
		UIView2D.wx = Math.floor(App.w());
		///end

		UIView2D.wy = 0;

		///if (is_paint || is_sculpt)
		if (!UIBase.show) {
			UIView2D.ww += Config.raw.layout[LayoutSize.LayoutSidebarW] + UIToolbar.toolbarw;
			UIView2D.wx -= UIToolbar.toolbarw;
		}
		///end

		if (!UIView2D.show) return;
		if (System.width == 0 || System.height == 0) return;

		if (Context.raw.pdirty >= 0) UIView2D.hwnd.redraws = 2; // Paint was active

		g.end();

		// Cache grid
		if (UINodes.grid == null) UINodes.drawGrid();

		// Ensure UV map is drawn
		///if (is_paint || is_sculpt)
		if (UIView2D.uvmapShow) UtilUV.cacheUVMap();
		///end

		// Ensure font image is drawn
		///if (is_paint || is_sculpt)
		if (Context.raw.font.image == null) UtilRender.makeFontPreview();
		///end

		UIView2D.ui.begin(g);

		let headerh = Config.raw.layout[LayoutSize.LayoutHeader] == 1 ? UIHeader.headerh * 2 : UIHeader.headerh;
		let apph = System.height - Config.raw.layout[LayoutSize.LayoutStatusH] + headerh;
		UIView2D.wh = System.height - Config.raw.layout[LayoutSize.LayoutStatusH];

		if (UINodes.show) {
			UIView2D.wh -= Config.raw.layout[LayoutSize.LayoutNodesH];
			if (Config.raw.touch_ui) UIView2D.wh += UIHeader.headerh;
		}

		if (UIView2D.ui.window(UIView2D.hwnd, UIView2D.wx, UIView2D.wy, UIView2D.ww, UIView2D.wh)) {

			UIView2D.ui.tab(Zui.handle("uiview2d_0"), tr("2D View"));

			// Grid
			UIView2D.ui.g.color = 0xffffffff;
			UIView2D.ui.g.drawImage(UINodes.grid, (UIView2D.panX * UIView2D.panScale) % 100 - 100, (UIView2D.panY * UIView2D.panScale) % 100 - 100);

			// Texture
			let tex: Image = null;

			///if (is_paint || is_sculpt)
			let l = Context.raw.layer;
			let channel = 0;
			///end

			let tw = UIView2D.ww * 0.95 * UIView2D.panScale;
			let tx = UIView2D.ww / 2 - tw / 2 + UIView2D.panX;
			let ty = apph / 2 - tw / 2 + UIView2D.panY;

			if (UIView2D.type == View2DType.View2DAsset) {
				tex = Project.getImage(Context.raw.texture);
			}
			else if (UIView2D.type == View2DType.View2DNode) {
				///if (is_paint || is_sculpt)

				tex = Context.raw.nodePreview;

				///else

				let nodes = UINodes.getNodes();
				if (nodes.nodesSelectedId.length > 0) {
					let sel = nodes.getNode(UINodes.getCanvas(true).nodes, nodes.nodesSelectedId[0]);
					let brushNode = ParserLogic.getLogicNode(sel);
					if (brushNode != null) {
						tex = brushNode.getCachedImage();
					}
				}

				///end
			}
			///if is_paint
			else if (UIView2D.type == View2DType.View2DLayer) {
				let layer = l;

				if (Config.raw.brush_live && RenderPathPaint.liveLayerDrawn > 0) {
					layer = RenderPathPaint.liveLayer;
				}

				if (UIView2D.layerMode == View2DLayerMode.View2DVisible) {
					let current = Graphics2.current;
					if (current != null) current.end();
					layer = Base.flatten();
					if (current != null) current.begin(false);
				}
				else if (SlotLayer.isGroup(layer)) {
					let current = Graphics2.current;
					if (current != null) current.end();
					layer = Base.flatten(false, SlotLayer.getChildren(layer));
					if (current != null) current.begin(false);
				}

				tex =
					SlotLayer.isMask(Context.raw.layer) ? layer.texpaint :
					UIView2D.texType == PaintTex.TexBase     ? layer.texpaint :
					UIView2D.texType == PaintTex.TexOpacity  ? layer.texpaint :
					UIView2D.texType == PaintTex.TexNormal   ? layer.texpaint_nor :
														   layer.texpaint_pack;

				channel =
					SlotLayer.isMask(Context.raw.layer)  ? 1 :
					UIView2D.texType == PaintTex.TexOcclusion ? 1 :
					UIView2D.texType == PaintTex.TexRoughness ? 2 :
					UIView2D.texType == PaintTex.TexMetallic  ? 3 :
					UIView2D.texType == PaintTex.TexOpacity   ? 4 :
					UIView2D.texType == PaintTex.TexHeight    ? 4 :
					UIView2D.texType == PaintTex.TexNormal    ? 5 :
															0;
			}
			else if (UIView2D.type == View2DType.View2DFont) {
				tex = Context.raw.font.image;
			}
			///end

			let th = tw;
			if (tex != null) {
				th = tw * (tex.height / tex.width);
				ty = apph / 2 - th / 2 + UIView2D.panY;

				///if (is_paint || is_sculpt)
				if (UIView2D.type == View2DType.View2DLayer) {
					///if (!krom_opengl)
					UIView2D.ui.g.pipeline = UIView2D.pipe;
					///end
					if (!Context.raw.textureFilter) {
						UIView2D.ui.g.imageScaleQuality = ImageScaleQuality.Low;
					}
					///if krom_opengl
					Krom.setPipeline(UIView2D.pipe.pipeline_);
					///end
					Krom.setInt(UIView2D.channelLocation, channel);
				}
				///end

				UIView2D.ui.g.drawScaledImage(tex, tx, ty, tw, th);

				if (UIView2D.tiledShow) {
					UIView2D.ui.g.drawScaledImage(tex, tx - tw, ty, tw, th);
					UIView2D.ui.g.drawScaledImage(tex, tx - tw, ty - th, tw, th);
					UIView2D.ui.g.drawScaledImage(tex, tx - tw, ty + th, tw, th);
					UIView2D.ui.g.drawScaledImage(tex, tx + tw, ty, tw, th);
					UIView2D.ui.g.drawScaledImage(tex, tx + tw, ty - th, tw, th);
					UIView2D.ui.g.drawScaledImage(tex, tx + tw, ty + th, tw, th);
					UIView2D.ui.g.drawScaledImage(tex, tx, ty - th, tw, th);
					UIView2D.ui.g.drawScaledImage(tex, tx, ty + th, tw, th);
				}

				///if (is_paint || is_sculpt)
				if (UIView2D.type == View2DType.View2DLayer) {
					UIView2D.ui.g.pipeline = null;
					if (!Context.raw.textureFilter) {
						UIView2D.ui.g.imageScaleQuality = ImageScaleQuality.High;
					}
				}

				// Texture and node preview color picking
				if ((Context.in2dView(View2DType.View2DAsset) || Context.in2dView(View2DType.View2DNode)) && Context.raw.tool == WorkspaceTool.ToolPicker && UIView2D.ui.inputDown) {
					let x = UIView2D.ui.inputX - tx - UIView2D.wx;
					let y = UIView2D.ui.inputY - ty - UIView2D.wy;
					Base.notifyOnNextFrame(() => {
						let texpaint_picker = RenderPath.renderTargets.get("texpaint_picker").image;
						let g2 = texpaint_picker.g2;
						g2.begin(false);
						g2.drawScaledImage(tex, -x, -y, tw, th);
						g2.end();
						let a = new DataView(texpaint_picker.getPixels());
						///if (krom_metal || krom_vulkan)
						let i0 = 2;
						let i1 = 1;
						let i2 = 0;
						///else
						let i0 = 0;
						let i1 = 1;
						let i2 = 2;
						///end

						Context.raw.pickedColor.base = color_set_rb(Context.raw.pickedColor.base, a.getUint8(i0));
						Context.raw.pickedColor.base = color_set_gb(Context.raw.pickedColor.base, a.getUint8(i1));
						Context.raw.pickedColor.base = color_set_bb(Context.raw.pickedColor.base, a.getUint8(i2));
						UIHeader.headerHandle.redraws = 2;
					});
				}
				///end
			}

			///if (is_paint || is_sculpt)
			// UV map
			if (UIView2D.type == View2DType.View2DLayer && UIView2D.uvmapShow) {
				UIView2D.ui.g.drawScaledImage(UtilUV.uvmap, tx, ty, tw, th);
			}
			///end

			// Menu
			let ew = Math.floor(UIView2D.ui.ELEMENT_W());
			UIView2D.ui.g.color = UIView2D.ui.t.SEPARATOR_COL;
			UIView2D.ui.g.fillRect(0, UIView2D.ui.ELEMENT_H(), UIView2D.ww, UIView2D.ui.ELEMENT_H() + UIView2D.ui.ELEMENT_OFFSET() * 2);
			UIView2D.ui.g.color = 0xffffffff;

			let startY = UIView2D.ui.ELEMENT_H() + UIView2D.ui.ELEMENT_OFFSET();
			UIView2D.ui._x = 2;
			UIView2D.ui._y = 2 + startY;
			UIView2D.ui._w = ew;

			// Editable layer name
			let h = Zui.handle("uiview2d_1");

			///if (is_paint || is_sculpt)
			let text = UIView2D.type == View2DType.View2DNode ? Context.raw.nodePreviewName : h.text;
			///else
			let text = h.text;
			///end

			UIView2D.ui._w = Math.floor(Math.min(UIView2D.ui.font.width(UIView2D.ui.fontSize, text) + 15 * UIView2D.ui.SCALE(), 100 * UIView2D.ui.SCALE()));

			if (UIView2D.type == View2DType.View2DAsset) {
				let asset = Context.raw.texture;
				if (asset != null) {
					let assetNames = Project.assetNames;
					let i = assetNames.indexOf(asset.name);
					h.text = asset.name;
					asset.name = UIView2D.ui.textInput(h, "");
					assetNames[i] = asset.name;
				}
			}
			else if (UIView2D.type == View2DType.View2DNode) {
				///if (is_paint || is_sculpt)

				UIView2D.ui.text(Context.raw.nodePreviewName);

				///else

				let nodes = UINodes.getNodes();
				if (nodes.nodesSelectedId.length > 0) {
					UIView2D.ui.text(nodes.getNode(UINodes.getCanvas(true).nodes, nodes.nodesSelectedId[0]).name);
				}

				///end
			}
			///if (is_paint || is_sculpt)
			else if (UIView2D.type == View2DType.View2DLayer) {
				h.text = l.name;
				l.name = UIView2D.ui.textInput(h, "");
				UIView2D.textInputHover = UIView2D.ui.isHovered;
			}
			else if (UIView2D.type == View2DType.View2DFont) {
				h.text = Context.raw.font.name;
				Context.raw.font.name = UIView2D.ui.textInput(h, "");
			}
			///end

			if (h.changed) UIBase.hwnds[0].redraws = 2;
			UIView2D.ui._x += UIView2D.ui._w + 3;
			UIView2D.ui._y = 2 + startY;
			UIView2D.ui._w = ew;

			///if (is_paint || is_sculpt)
			if (UIView2D.type == View2DType.View2DLayer) {
				UIView2D.layerMode = UIView2D.ui.combo(Zui.handle("uiview2d_2", { position: UIView2D.layerMode }), [
					tr("Visible"),
					tr("Selected"),
				], tr("Layers"));
				UIView2D.ui._x += ew + 3;
				UIView2D.ui._y = 2 + startY;

				if (!SlotLayer.isMask(Context.raw.layer)) {
					UIView2D.texType = UIView2D.ui.combo(Zui.handle("uiview2d_3", { position: UIView2D.texType }), [
						tr("Base Color"),
						tr("Normal Map"),
						tr("Occlusion"),
						tr("Roughness"),
						tr("Metallic"),
						tr("Opacity"),
						tr("Height"),
					], tr("Texture"));
					UIView2D.ui._x += ew + 3;
					UIView2D.ui._y = 2 + startY;
				}

				UIView2D.ui._w = Math.floor(ew * 0.7 + 3);
				UIView2D.uvmapShow = UIView2D.ui.check(Zui.handle("uiview2d_4", { selected: UIView2D.uvmapShow }), tr("UV Map"));
				UIView2D.ui._x += ew * 0.7 + 3;
				UIView2D.ui._y = 2 + startY;
			}
			///end

			UIView2D.tiledShow = UIView2D.ui.check(Zui.handle("uiview2d_5", { selected: UIView2D.tiledShow }), tr("Tiled"));
			UIView2D.ui._x += ew * 0.7 + 3;
			UIView2D.ui._y = 2 + startY;

			if (UIView2D.type == View2DType.View2DAsset && tex != null) { // Texture resolution
				UIView2D.ui.text(tex.width + "x" + tex.height);
			}

			// Picked position
			///if (is_paint || is_sculpt)
			if (Context.raw.tool == WorkspaceTool.ToolPicker && (UIView2D.type == View2DType.View2DLayer || UIView2D.type == View2DType.View2DAsset)) {
				let cursorImg = Res.get("cursor.k");
				let hsize = 16 * UIView2D.ui.SCALE();
				let size = hsize * 2;
				UIView2D.ui.g.drawScaledImage(cursorImg, tx + tw * Context.raw.uvxPicked - hsize, ty + th * Context.raw.uvyPicked - hsize, size, size);
			}
			///end
		}
		UIView2D.ui.end();
		g.begin(false);
	}

	static update = () => {
		let headerh = UIView2D.ui.ELEMENT_H() * 1.4;

		///if (is_paint || is_sculpt)
		Context.raw.paint2d = false;
		///end

		if (!Base.uiEnabled ||
			!UIView2D.show ||
			Mouse.x < UIView2D.wx ||
			Mouse.x > UIView2D.wx + UIView2D.ww ||
			Mouse.y < UIView2D.wy + headerh ||
			Mouse.y > UIView2D.wy + UIView2D.wh) {
			if (UIView2D.controlsDown) {
				UINodes.getCanvasControl(UIView2D.ui, UIView2D);
			}
			return;
		}

		let control = UINodes.getCanvasControl(UIView2D.ui, UIView2D);
		UIView2D.panX += control.panX;
		UIView2D.panY += control.panY;
		if (control.zoom != 0) {
			let _panX = UIView2D.panX / UIView2D.panScale;
			let _panY = UIView2D.panY / UIView2D.panScale;
			UIView2D.panScale += control.zoom;
			if (UIView2D.panScale < 0.1) UIView2D.panScale = 0.1;
			if (UIView2D.panScale > 6.0) UIView2D.panScale = 6.0;
			UIView2D.panX = _panX * UIView2D.panScale;
			UIView2D.panY = _panY * UIView2D.panScale;

			if (Zui.touchScroll) {
				// Zoom to finger location
				UIView2D.panX -= (UIView2D.ui.inputX - UIView2D.ui._windowX - UIView2D.ui._windowW / 2) * control.zoom;
				UIView2D.panY -= (UIView2D.ui.inputY - UIView2D.ui._windowY - UIView2D.ui._windowH / 2) * control.zoom;
			}
		}

		///if (is_paint || is_sculpt)
		let decal = Context.raw.tool == WorkspaceTool.ToolDecal || Context.raw.tool == WorkspaceTool.ToolText;
		let decalMask = decal && Operator.shortcut(Config.keymap.decal_mask + "+" + Config.keymap.action_paint, ShortcutType.ShortcutDown);
		let setCloneSource = Context.raw.tool == WorkspaceTool.ToolClone && Operator.shortcut(Config.keymap.set_clone_source + "+" + Config.keymap.action_paint, ShortcutType.ShortcutDown);

		if (UIView2D.type == View2DType.View2DLayer &&
			!UIView2D.textInputHover &&
			(Operator.shortcut(Config.keymap.action_paint, ShortcutType.ShortcutDown) ||
			 Operator.shortcut(Config.keymap.brush_ruler + "+" + Config.keymap.action_paint, ShortcutType.ShortcutDown) ||
			 decalMask ||
			 setCloneSource ||
			 Config.raw.brush_live)) {
			Context.raw.paint2d = true;
		}
		///end

		if (UIView2D.ui.isTyping) return;

		if (Keyboard.started("left")) UIView2D.panX -= 5;
		else if (Keyboard.started("right")) UIView2D.panX += 5;
		if (Keyboard.started("up")) UIView2D.panY -= 5;
		else if (Keyboard.started("down")) UIView2D.panY += 5;

		// Limit panning to keep texture in viewport
		let border = 32;
		let tw = UIView2D.ww * 0.95 * UIView2D.panScale;
		let tx = UIView2D.ww / 2 - tw / 2 + UIView2D.panX;
		let hh = App.h();
		let ty = hh / 2 - tw / 2 + UIView2D.panY;

		if      (tx + border >  UIView2D.ww) UIView2D.panX =  UIView2D.ww / 2 + tw / 2 - border;
		else if (tx - border < -tw) UIView2D.panX = -tw / 2 - UIView2D.ww / 2 + border;
		if      (ty + border >  hh) UIView2D.panY =  hh / 2 + tw / 2 - border;
		else if (ty - border < -tw) UIView2D.panY = -tw / 2 - hh / 2 + border;

		if (Operator.shortcut(Config.keymap.view_reset)) {
			UIView2D.panX = 0.0;
			UIView2D.panY = 0.0;
			UIView2D.panScale = 1.0;
		}
	}
}
