package arm.ui;

import haxe.Json;
import kha.Image;
import kha.System;
import zui.Zui;
import zui.Id;
import zui.Nodes;
import iron.system.Input;
import arm.shader.NodesMaterial;
import arm.node.NodesBrush;
import arm.node.MakeMaterial;
import arm.util.RenderUtil;
import arm.ui.UIHeader;
import arm.Enums;
import arm.Project;

@:access(zui.Zui)
@:access(zui.Nodes)
class UINodes {

	public static var inst: UINodes;

	public var show = false;
	public var wx: Int;
	public var wy: Int;
	public var ww: Int;
	public var wh: Int;

	public var ui: Zui;
	public var canvasType = CanvasMaterial;
	var drawMenu = false;
	var showMenu = false;
	var hideMenu = false;
	var menuCategory = 0;
	var addNodeButton = false;
	var popupX = 0.0;
	var popupY = 0.0;

	public var changed = false;
	var mdown = false;
	var mreleased = false;
	var mchanged = false;
	var mstartedlast = false;
	var recompileMat = false; // Mat preview
	var recompileMatFinal = false;
	var nodeSearchSpawn: TNode = null;
	var nodeSearchOffset = 0;
	var nodeSearchLast = "";
	var lastCanvas: TNodeCanvas;
	var lastNodeSelected: TNode = null;

	public var grid: Image = null;
	public var hwnd = Id.handle();
	public var groupStack: Array<TNodeGroup> = [];

	public function new() {
		inst = this;

		Nodes.excludeRemove.push("OUTPUT_MATERIAL_PBR");
		Nodes.excludeRemove.push("GROUP_OUTPUT");
		Nodes.excludeRemove.push("GROUP_INPUT");
		Nodes.excludeRemove.push("BrushOutputNode");
		Nodes.onLinkDrag = onLinkDrag;
		Nodes.onSocketReleased = onSocketReleased;
		Nodes.onNodeRemove = onNodeRemove;
		Nodes.onCanvasControl = onCanvasControl;

		var scale = Config.raw.window_scale;
		ui = new Zui({theme: App.theme, font: App.font, color_wheel: App.colorWheel, scaleFactor: scale});
		ui.scrollEnabled = false;
	}

	function onLinkDrag(linkDrag: TNodeLink, isNewLink: Bool) {
		if (isNewLink) {
			var nodes = getNodes();
			var node = nodes.getNode(getCanvas(true).nodes, linkDrag.from_id > -1 ? linkDrag.from_id : linkDrag.to_id);
			var linkX = ui._windowX + nodes.NODE_X(node);
			var linkY = ui._windowY + nodes.NODE_Y(node);
			if (linkDrag.from_id > -1) {
				linkX += nodes.NODE_W();
				linkY += nodes.SOCKET_Y(linkDrag.from_socket);
			}
			else {
				linkY += nodes.SOCKET_Y(linkDrag.to_socket + node.outputs.length) + nodes.BUTTONS_H(node);
			}
			var mouse = Input.getMouse();
			if (Math.abs(mouse.x - linkX) > 5 || Math.abs(mouse.y - linkY) > 5) { // Link length
				nodeSearch(-1, -1, function() {
					var n = nodes.nodesSelected[0];
					if (linkDrag.to_id == -1 && n.inputs.length > 0) {
						linkDrag.to_id = n.id;
						linkDrag.to_socket = 0;
						getCanvas(true).links.push(linkDrag);
					}
					else if (linkDrag.from_id == -1 && n.outputs.length > 0) {
						linkDrag.from_id = n.id;
						linkDrag.from_socket = 0;
						getCanvas(true).links.push(linkDrag);
					}
				});
			}
			else {
				Context.nodePreviewSocket = linkDrag.from_id > -1 ? linkDrag.from_socket : 0;
			}
		}
	}

	function onSocketReleased(socket: TNodeSocket) {
		if (ui.inputReleasedR) {
			var nodes = getNodes();
			var node = nodes.getNode(getCanvas(true).nodes, socket.node_id);
			if (node.type == "GROUP_INPUT" || node.type == "GROUP_OUTPUT") {
				App.notifyOnNextFrame(function() {
					arm.ui.UIMenu.draw(function(ui: Zui) {
						ui.text(tr("Socket"), Right, ui.t.HIGHLIGHT_COL);
						if (ui.button(tr("Edit"), Left)) {
							var h = Id.handle();
							h.text = socket.name;
							UIBox.showCustom(function(ui: Zui) {
							if (ui.tab(Id.handle(), tr("Socket"))) {
								ui.row([0.5, 0.5]);
								var name = ui.textInput(h, tr("Name"));
								if (ui.button(tr("OK")) || ui.isReturnDown) {
									socket.name = name;
									UIBox.show = false;
									NodesMaterial.syncSockets(node);
									hwnd.redraws = 2;
								}
							}
						});
						}
						if (ui.button(tr("Delete"), Left)) {
							node.inputs.remove(socket);
							node.outputs.remove(socket);
							NodesMaterial.syncSockets(node);
						}
					}, 3);
				});
			}
		}
	}

	function onNodeRemove(node: TNode) {
		if (node.type == "GROUP") { // Remove unused groups
			var found = false;
			var canvases: Array<TNodeCanvas> = [];
			for (m in Project.materials) canvases.push(m.canvas);
			for (m in Project.materialGroups) canvases.push(m.canvas);
			for (canvas in canvases) {
				for (n in canvas.nodes) {
					if (n.type == "GROUP" && n.name == node.name) {
						found = true;
						break;
					}
				}
			}
			if (!found) {
				for (g in Project.materialGroups) {
					if (g.canvas.name == node.name) {
						Project.materialGroups.remove(g);
						break;
					}
				}
			}
		}
	}

	function onCanvasControl(): zui.Nodes.CanvasControl {
		return getCanvasControl(ui);
	}

	public static function getCanvasControl(ui: Zui): zui.Nodes.CanvasControl {
		var pan = ui.inputDownR || Operator.shortcut(Config.keymap.action_pan, ShortcutDown);
		var zoomDelta = Operator.shortcut(Config.keymap.action_zoom, ShortcutDown) ? getZoomDelta(ui) / 100.0 : 0.0;
		return {
			panX: pan ? ui.inputDX : 0.0,
			panY: pan ? ui.inputDY : 0.0,
			zoom: ui.inputWheelDelta != 0.0 ? -ui.inputWheelDelta / 10 : zoomDelta
		}
	}

	static function getZoomDelta(ui: Zui): Float {
		return Config.raw.zoom_direction == ZoomVertical ? -ui.inputDY :
			   Config.raw.zoom_direction == ZoomVerticalInverted ? -ui.inputDY :
			   Config.raw.zoom_direction == ZoomHorizontal ? ui.inputDX :
			   Config.raw.zoom_direction == ZoomHorizontalInverted ? ui.inputDX :
			   -(ui.inputDY - ui.inputDX);
	}

	public function getCanvas(groups = false): TNodeCanvas {
		if (canvasType == CanvasMaterial) {
			if (groups && groupStack.length > 0) return groupStack[groupStack.length - 1].canvas;
			else return getCanvasMaterial();
		}
		else return Context.brush.canvas;
	}

	public function getCanvasMaterial(): TNodeCanvas {
		var isScene = UIHeader.inst.worktab.position == SpaceRender;
		return isScene ? Context.materialScene.canvas : Context.material.canvas;
	}

	public function getNodes(): Nodes {
		if (canvasType == CanvasMaterial) {
			if (groupStack.length > 0) return groupStack[groupStack.length - 1].nodes;
			else {
				var isScene = UIHeader.inst.worktab.position == SpaceRender;
				return isScene ? Context.materialScene.nodes : Context.material.nodes;
			}
		}
		else return Context.brush.nodes;
	}

	public function update() {
		var mouse = Input.getMouse();
		mreleased = mouse.released();
		mdown = mouse.down();

		// Recompile material on change
		if (ui.changed) {
			mchanged = true;
			if (!mdown) changed = true;
		}
		if ((mreleased && mchanged) || changed) {
			mchanged = changed = false;
			canvasChanged();
			if (mreleased) {
				UISidebar.inst.hwnd0.redraws = 2;
				var canvasGroup = groupStack.length > 0 ? Project.materialGroups.indexOf(groupStack[groupStack.length - 1]) : null;
				History.editNodes(lastCanvas, canvasType, canvasGroup);
			}
		}
		else if (ui.changed && (mstartedlast || mouse.moved) && Config.raw.material_live) {
			recompileMat = true; // Instant preview
		}
		mstartedlast = mouse.started();

		if (!show) return;
		if (!App.uiEnabled) return;
		var kb = Input.getKeyboard();

		wx = Std.int(iron.App.w()) + UIToolbar.inst.toolbarw;
		wy = UIHeader.inst.headerh * 2;
		if (UIView2D.inst.show) {
			wy += iron.App.h() - Config.raw.layout[LayoutNodesH];
		}
		var ww = Config.raw.layout[LayoutNodesW];
		var mx = mouse.x;
		var my = mouse.y;
		if (mx < wx || mx > wx + ww || my < wy) return;
		if (ui.isTyping) return;

		if (addNodeButton) {
			showMenu = true;
			addNodeButton = false;
		}
		else if (mouse.released()) {
			hideMenu = true;
		}

		var nodes = getNodes();
		if (nodes.nodesSelected.length > 0 && ui.isKeyPressed) {
			if (ui.key == kha.input.KeyCode.Left) for (n in nodes.nodesSelected) n.x -= 1;
			else if (ui.key == kha.input.KeyCode.Right) for (n in nodes.nodesSelected) n.x += 1;
			if (ui.key == kha.input.KeyCode.Up) for (n in nodes.nodesSelected) n.y -= 1;
			else if (ui.key == kha.input.KeyCode.Down) for (n in nodes.nodesSelected) n.y += 1;
		}

		// Node search popup
		if (kb.started(Config.keymap.node_search)) nodeSearch();
		if (nodeSearchSpawn != null) {
			ui.inputX = mouse.x; // Fix inputDX after popup removal
			ui.inputY = mouse.y;
			nodeSearchSpawn = null;
		}
	}

	public function canvasChanged() {
		recompileMat = true;
		recompileMatFinal = true;
	}

	function nodeSearch(x = -1, y = -1, done: Void->Void = null) {
		var kb = Input.getKeyboard();
		var searchHandle = Id.handle();
		var first = true;
		UIMenu.draw(function(ui: Zui) {
			ui.fill(0, 0, ui._w / ui.SCALE(), ui.t.ELEMENT_H * 8, ui.t.WINDOW_BG_COL);
			ui.textInput(searchHandle, "");
			ui.changed = false;
			if (first) {
				first = false;
				ui.startTextEdit(searchHandle); // Focus search bar
				ui.textSelected = searchHandle.text;
				searchHandle.text = "";
				nodeSearchLast = "";
			}
			var search = searchHandle.text;
			if (ui.textSelected != "") search = ui.textSelected;

			if (search != nodeSearchLast) {
				nodeSearchOffset = 0;
				nodeSearchLast = search;
			}
			if (ui.isKeyPressed) { // Move selection
				if (ui.key == kha.input.KeyCode.Down && nodeSearchOffset < 6) nodeSearchOffset++;
				if (ui.key == kha.input.KeyCode.Up && nodeSearchOffset > 0) nodeSearchOffset--;
			}
			var enter = kb.down("enter");
			var count = 0;
			var BUTTON_COL = ui.t.BUTTON_COL;
			var nodeList = canvasType == CanvasMaterial ? NodesMaterial.list : NodesBrush.list;
			for (list in nodeList) {
				for (n in list) {
					if (tr(n.name).toLowerCase().indexOf(search) >= 0) {
						ui.t.BUTTON_COL = count == nodeSearchOffset ? ui.t.HIGHLIGHT_COL : ui.t.WINDOW_BG_COL;
						if (ui.button(tr(n.name), Left) || (enter && count == nodeSearchOffset)) {
							var nodes = getNodes();
							var canvas = getCanvas(true);
							nodeSearchSpawn = makeNode(n, nodes, canvas); // Spawn selected node
							canvas.nodes.push(nodeSearchSpawn);
							nodes.nodesSelected = [nodeSearchSpawn];
							nodes.nodesDrag = true;
							hwnd.redraws = 2;
							if (enter) {
								ui.changed = true;
								count = 6; // Trigger break
							}
							if (done != null) done();
						}
						if (++count > 6) break;
					}
				}
				if (count > 6) break;
			}
			if (enter && count == 0) { // Hide popup on enter when node is not found
				ui.changed = true;
				searchHandle.text = "";
			}
			ui.t.BUTTON_COL = BUTTON_COL;
		}, 0, x, y);
	}

	public function getNodeX(): Int {
		var mouse = Input.getMouse();
		return Std.int((mouse.x - wx - getNodes().PAN_X()) / getNodes().SCALE());
	}

	public function getNodeY(): Int {
		var mouse = Input.getMouse();
		return Std.int((mouse.y - wy - getNodes().PAN_Y()) / getNodes().SCALE());
	}

	public function drawGrid() {
		var ww = Config.raw.layout[LayoutNodesW];
		var wh = iron.App.h();
		var w = ww + 100 * 2;
		var h = wh + 100 * 2;
		if (w < 1) w = 1;
		if (h < 1) h = 1;
		grid = Image.createRenderTarget(w, h);
		grid.g2.begin(true, ui.t.SEPARATOR_COL);

		grid.g2.color = ui.t.SEPARATOR_COL - 0x00050505;
		for (i in 0...Std.int(h / 20) + 1) {
			grid.g2.drawLine(0, i * 20, w, i * 20);
		}
		for (i in 0...Std.int(w / 20) + 1) {
			grid.g2.drawLine(i * 20, 0, i * 20, h);
		}

		grid.g2.color = ui.t.SEPARATOR_COL - 0x00090909;
		for (i in 0...Std.int(h / 100) + 1) {
			grid.g2.drawLine(0, i * 100, w, i * 100);
		}
		for (i in 0...Std.int(w / 100) + 1) {
			grid.g2.drawLine(i * 100, 0, i * 100, h);
		}

		grid.g2.end();
	}

	public function render(g: kha.graphics2.Graphics) {
		if (recompileMat) {
			if (canvasType == CanvasBrush) {
				MakeMaterial.parseBrush();
				Context.parseBrushInputs();
				RenderUtil.makeBrushPreview();
				UISidebar.inst.hwnd1.redraws = 2;
			}
			else {
				Layers.isFillMaterial() ? Layers.updateFillLayers() : RenderUtil.makeMaterialPreview();
			}

			UISidebar.inst.hwnd1.redraws = 2;
			recompileMat = false;
		}
		else if (recompileMatFinal) {
			MakeMaterial.parsePaintMaterial();
			if (Layers.isFillMaterial()) {
				RenderUtil.makeMaterialPreview();
			}
			var decal = Context.tool == ToolDecal || Context.tool == ToolText;
			if (decal) RenderUtil.makeDecalPreview();

			UISidebar.inst.hwnd0.redraws = 2;
			recompileMatFinal = false;
			Context.nodePreviewDirty = true;
		}

		var nodes = getNodes();
		if (nodes.nodesSelected.length > 0 && nodes.nodesSelected[0] != lastNodeSelected) {
			lastNodeSelected = nodes.nodesSelected[0];
			Context.nodePreviewDirty = true;
			Context.nodePreviewSocket = 0;
		}

		if (!show) return;
		if (System.windowWidth() == 0 || System.windowHeight() == 0) return;

		if (!App.uiEnabled && ui.inputRegistered) ui.unregisterInput();
		if (App.uiEnabled && !ui.inputRegistered) ui.registerInput();

		if (ui.inputStarted) {
			lastCanvas = Json.parse(Json.stringify(getCanvas(true)));
		}

		g.end();

		if (grid == null) drawGrid();

		if (Config.raw.node_preview && Context.nodePreviewDirty) makeNodePreview();

		// Start with UI
		ui.begin(g);

		// Make window
		ww = Config.raw.layout[LayoutNodesW];
		wx = Std.int(iron.App.w()) + UIToolbar.inst.toolbarw;
		wy = UIHeader.inst.headerh * 2;
		var ew = Std.int(ui.ELEMENT_W() * 0.7);
		wh = iron.App.h();
		if (UIView2D.inst.show) {
			wh = Config.raw.layout[LayoutNodesH];
			wy = iron.App.h() - Config.raw.layout[LayoutNodesH] + UIHeader.inst.headerh * 2;
		}
		if (ui.window(hwnd, wx, wy, ww, wh)) {

			// Grid
			ui.g.color = 0xffffffff;
			ui.g.drawImage(grid, (nodes.panX * nodes.SCALE()) % 100 - 100, (nodes.panY * nodes.SCALE()) % 100 - 100);

			// Nodes
			var c = getCanvas(true);
			nodes.nodeCanvas(ui, c);

			// Node previews
			if (Config.raw.node_preview && nodes.nodesSelected.length > 0) {
				var img: kha.Image = null;
				var sel = nodes.nodesSelected[0];
				if (sel.type == "TEX_IMAGE") {
					var id = sel.buttons[0].default_value;
					if (id < Project.assets.length) {
						img = Project.getImage(Project.assets[id]);
					}
				}
				else if (sel.type == "LAYER") {
					var id = sel.buttons[0].default_value;
					if (id < Project.layers.length) {
						img = Project.layers[id].texpaint_preview;
					}
				}
				else if (sel.type == "LAYER_MASK") {
					var id = sel.buttons[0].default_value;
					if (id < Project.layers.length) {
						img = Project.layers[id].texpaint_mask_preview;
					}
				}
				else if (sel.type == "MATERIAL") {
					var id = sel.buttons[0].default_value;
					if (id < Project.materials.length) {
						img = Project.materials[id].image;
					}
				}
				else if (sel.type == "OUTPUT_MATERIAL_PBR") {
					img = Context.material.image;
				}
				else if (sel.type == "BrushOutputNode") {
					img = Context.brush.image;
				}
				else if (canvasType == CanvasMaterial) {
					img = Context.nodePreview;
				}
				if (img != null) {
					var tw = 80 * ui.SCALE();
					var th = tw * (img.height / img.width);
					var tx = ww - tw - 8 * ui.SCALE();
					var ty = wh - th - 40 * ui.SCALE();

					#if kha_opengl
					var invertY = sel.type == "MATERIAL";
					#else
					var invertY = false;
					#end

					ui.g.color = 0xffffffff;
					invertY ?
						ui.g.drawScaledImage(img, tx, ty + th, tw, -th) :
						ui.g.drawScaledImage(img, tx, ty, tw, th);
				}
			}

			// Editable canvas name
			var _ACCENT_COL = ui.t.ACCENT_COL;
			var _BUTTON_H = ui.t.BUTTON_H;
			var _ELEMENT_H = ui.t.ELEMENT_H;
			var _FONT_SIZE = ui.fontSize;
			ui.t.ACCENT_COL = 0x00000000;
			ui.t.BUTTON_H = 30;
			ui.t.ELEMENT_H = 30;
			ui.fontSize = Std.int(22 * ui.SCALE());
			ui._x = ww - ui.ELEMENT_W() * 1.4;
			ui._y = wh - ui.ELEMENT_H() * 1.2;
			ui._w = Std.int(ui.ELEMENT_W() * 1.4);
			var h = Id.handle();
			h.text = c.name;
			var oldName = c.name;
			c.name = ui.textInput(h, "", Right);
			if (h.changed && groupStack.length > 0) { // Update group links
				var canvases: Array<TNodeCanvas> = [];
				for (m in Project.materials) canvases.push(m.canvas);
				for (m in Project.materialGroups) canvases.push(m.canvas);
				for (canvas in canvases) {
					for (n in canvas.nodes) {
						if (n.type == "GROUP" && n.name == oldName) {
							n.name = c.name;
						}
					}
				}
			}
			ui.t.ACCENT_COL = _ACCENT_COL;
			ui.t.BUTTON_H = _BUTTON_H;
			ui.t.ELEMENT_H = _ELEMENT_H;
			ui.fontSize = _FONT_SIZE;

			// Close node group
			if (groupStack.length > 0) {
				ui._x = 5;
				ui._y = wh - ui.ELEMENT_H() * 1.2;
				ui._w = Std.int(ui.ELEMENT_W() * 1.4);
				if (ui.button(tr("Close"))) groupStack.pop();
			}

			// Menu
			ui.g.color = ui.t.WINDOW_BG_COL;
			ui.g.fillRect(0, 0, ww, ui.ELEMENT_H() + ui.ELEMENT_OFFSET());
			ui.g.color = 0xffffffff;

			ui._x = 0;
			ui._y = 0;
			ui._w = ew;

			var _BUTTON_COL = ui.t.BUTTON_COL;
			ui.t.BUTTON_COL = ui.t.WINDOW_BG_COL;

			var cats = canvasType == CanvasMaterial ? NodesMaterial.categories : NodesBrush.categories;
			for (i in 0...cats.length) {
				if ((ui.button(tr(cats[i]), Left) && UISidebar.inst.ui.comboSelectedHandle == null) || (ui.isHovered && drawMenu)) {
					addNodeButton = true;
					menuCategory = i;
					popupX = wx + ui._x;
					popupY = wy + ui._y;
				}
				if (i < cats.length - 1) {
					ui._x += ew + 3;
					ui._y = 0;
				}
			}
			ui._x += ew + 3;
			ui._y = 0;

			if (ui.button(tr("Search"), Left)) nodeSearch(Std.int(ui._windowX + ui._x), Std.int(ui._windowY + ui._y));
			if (ui.isHovered) ui.tooltip(tr("Search for nodes") + ' (${Config.keymap.node_search})');

			ui.t.BUTTON_COL = _BUTTON_COL;
		}

		ui.end(!drawMenu);

		g.begin(false);

		if (drawMenu) {
			var list = canvasType == CanvasMaterial ? NodesMaterial.list : NodesBrush.list;
			var numNodes = list[menuCategory].length;

			var isGroupCategory = canvasType == CanvasMaterial && NodesMaterial.categories[menuCategory] == tr("Group");
			if (isGroupCategory) numNodes += Project.materialGroups.length;

			var ph = numNodes * ui.t.ELEMENT_H * ui.SCALE();
			var py = popupY;
			g.color = ui.t.WINDOW_BG_COL;
			var menuw = Std.int(ew * 2.0);
			g.fillRect(popupX, py, menuw, ph);

			ui.beginRegion(g, Std.int(popupX), Std.int(py), menuw);
			var _BUTTON_COL = ui.t.BUTTON_COL;
			ui.t.BUTTON_COL = ui.t.WINDOW_BG_COL;
			var _ELEMENT_OFFSET = ui.t.ELEMENT_OFFSET;
			ui.t.ELEMENT_OFFSET = 0;

			for (n in list[menuCategory]) {
				if (ui.button("      " + tr(n.name), Left)) {
					var canvas = getCanvas(true);
					var nodes = getNodes();
					var node = makeNode(n, nodes, canvas);
					canvas.nodes.push(node);
					nodes.nodesSelected = [node];
					nodes.nodesDrag = true;
				}
			}
			if (isGroupCategory) {
				for (g in Project.materialGroups) {
					if (ui.button("      " + g.canvas.name, Left)) {
						var canvas = getCanvas(true);
						var nodes = getNodes();
						var node = makeGroupNode(g.canvas, nodes, canvas);
						canvas.nodes.push(node);
						nodes.nodesSelected = [node];
						nodes.nodesDrag = true;
					}
				}
			}

			ui.t.BUTTON_COL = _BUTTON_COL;
			ui.t.ELEMENT_OFFSET = _ELEMENT_OFFSET;
			ui.endRegion();
		}

		if (showMenu) {
			showMenu = false;
			drawMenu = true;
		}
		if (hideMenu) {
			hideMenu = false;
			drawMenu = false;
		}
	}

	public function acceptAssetDrag(assetIndex: Int) {
		var n = canvasType == CanvasMaterial ? NodesMaterial.createNode("TEX_IMAGE") : NodesBrush.createNode("TEX_IMAGE");
		n.buttons[0].default_value = assetIndex;
		getNodes().nodesSelected = [n];
	}

	public function acceptLayerDrag(layerIndex: Int) {
		if (Project.layers[layerIndex].getChildren() != null) return;
		var n = NodesMaterial.createNode(Context.layerIsMask ? "LAYER_MASK" : "LAYER");
		n.buttons[0].default_value = layerIndex;
		getNodes().nodesSelected = [n];
	}

	public function acceptMaterialDrag(layerIndex: Int) {
		var n = NodesMaterial.createNode("MATERIAL");
		n.buttons[0].default_value = layerIndex;
		getNodes().nodesSelected = [n];
	}

	public static function makeNode(n: TNode, nodes: Nodes, canvas: TNodeCanvas): TNode {
		var node: TNode = Json.parse(Json.stringify(n));
		node.id = nodes.getNodeId(canvas.nodes);
		node.x = UINodes.inst.getNodeX();
		node.y = UINodes.inst.getNodeY();
		for (soc in node.inputs) {
			soc.id = nodes.getSocketId(canvas.nodes);
			soc.node_id = node.id;
		}
		for (soc in node.outputs) {
			soc.id = nodes.getSocketId(canvas.nodes);
			soc.node_id = node.id;
		}
		return node;
	}

	public static function makeGroupNode(groupCanvas: TNodeCanvas, nodes: Nodes, canvas: TNodeCanvas): TNode {
		var n = NodesMaterial.list[5][0];
		var node: TNode = Json.parse(Json.stringify(n));
		node.name = groupCanvas.name;
		node.id = nodes.getNodeId(canvas.nodes);
		node.x = UINodes.inst.getNodeX();
		node.y = UINodes.inst.getNodeY();
		var origin: TNode = null;
		for (m in Project.materials) for (n in m.canvas.nodes) if (n.type == "GROUP" && n.name == node.name) { origin = n; break; }
		if (origin == null) for (g in Project.materialGroups) for (n in g.canvas.nodes) if (n.type == "GROUP" && n.name == node.name) { origin = n; break; }
		if (origin != null) {
			for (soc in origin.inputs) {
				node.inputs.push(NodesMaterial.createSocket(nodes, node, soc.type, canvas));
			}
			for (soc in origin.outputs) {
				node.outputs.push(NodesMaterial.createSocket(nodes, node, soc.type, canvas));
			}
		}
		return node;
	}

	function makeNodePreview() {
		var nodes = Context.material.nodes;
		if (nodes.nodesSelected.length == 0) return;

		var node = nodes.nodesSelected[0];
		if (node.type == "TEX_IMAGE" ||
			node.type == "LAYER" ||
			node.type == "LAYER_MASK" ||
			node.type == "MATERIAL" ||
			node.type == "OUTPUT_MATERIAL_PBR") return;

		if (Context.material.canvas.nodes.indexOf(node) == -1) return;

		if (Context.nodePreview == null) {
			Context.nodePreview = kha.Image.createRenderTarget(RenderUtil.matPreviewSize, RenderUtil.matPreviewSize);
		}

		Context.nodePreviewDirty = false;
		UINodes.inst.hwnd.redraws = 2;
		RenderUtil.makeNodePreview(Context.material.canvas, node, Context.nodePreview);
	}
}
