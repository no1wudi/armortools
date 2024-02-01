
///if (is_paint || is_sculpt)

class UIToolbar {

	static defaultToolbarW = 36;

	static toolbarHandle = new Handle();
	static toolbarw = UIToolbar.defaultToolbarW;
	static lastTool = 0;

	static toolNames = [
		_tr("Brush"),
		_tr("Eraser"),
		_tr("Fill"),
		_tr("Decal"),
		_tr("Text"),
		_tr("Clone"),
		_tr("Blur"),
		_tr("Smudge"),
		_tr("Particle"),
		_tr("ColorID"),
		_tr("Picker"),
		_tr("Bake"),
		_tr("Gizmo"),
		_tr("Material"),
	];

	constructor() {
	}

	static renderUI = (g: Graphics2) => {
		let ui = UIBase.ui;

		if (Config.raw.touch_ui) {
			UIToolbar.toolbarw = UIToolbar.defaultToolbarW + 6;
		}
		else {
			UIToolbar.toolbarw = UIToolbar.defaultToolbarW;
		}
		UIToolbar.toolbarw = Math.floor(UIToolbar.toolbarw * ui.SCALE());

		if (ui.window(UIToolbar.toolbarHandle, 0, UIHeader.headerh, UIToolbar.toolbarw, System.height - UIHeader.headerh)) {
			ui._y -= 4 * ui.SCALE();

			ui.imageScrollAlign = false;
			let img = Res.get("icons.k");
			let imgw = ui.SCALE() > 1 ? 100 : 50;

			let col = ui.t.WINDOW_BG_COL;
			if (col < 0) col += 4294967296;
			let light = col > 0xff666666 + 4294967296;
			let iconAccent = light ? 0xff666666 : -1;

			// Properties icon
			if (Config.raw.layout[LayoutSize.LayoutHeader] == 1) {
				let rect = Res.tile50(img, 7, 1);
				if (ui.image(img, light ? 0xff666666 : ui.t.BUTTON_COL, null, rect.x, rect.y, rect.w, rect.h) == State.Released) {
					Config.raw.layout[LayoutSize.LayoutHeader] = 0;
				}
			}
			// Draw ">>" button if header is hidden
			else {
				let _ELEMENT_H = ui.t.ELEMENT_H;
				let _BUTTON_H = ui.t.BUTTON_H;
				let _BUTTON_COL = ui.t.BUTTON_COL;
				let _fontOffsetY = ui.fontOffsetY;
				ui.t.ELEMENT_H = Math.floor(ui.t.ELEMENT_H * 1.5);
				ui.t.BUTTON_H = ui.t.ELEMENT_H;
				ui.t.BUTTON_COL = ui.t.WINDOW_BG_COL;
				let fontHeight = ui.font.height(ui.fontSize);
				ui.fontOffsetY = (ui.ELEMENT_H() - fontHeight) / 2;
				let _w = ui._w;
				ui._w = UIToolbar.toolbarw;

				if (ui.button(">>")) {
					UIToolbar.toolPropertiesMenu();
				}

				ui._w = _w;
				ui.t.ELEMENT_H = _ELEMENT_H;
				ui.t.BUTTON_H = _BUTTON_H;
				ui.t.BUTTON_COL = _BUTTON_COL;
				ui.fontOffsetY = _fontOffsetY;
			}
			if (ui.isHovered) ui.tooltip(tr("Toggle header"));
			ui._y -= 4 * ui.SCALE();

			let keys = [
				"(" + Config.keymap.tool_brush + ") - " + tr("Hold {action_paint} to paint\nHold {key} and press {action_paint} to paint a straight line (ruler mode)", new Map([["key", Config.keymap.brush_ruler], ["action_paint", Config.keymap.action_paint]])),
				"(" + Config.keymap.tool_eraser + ") - " + tr("Hold {action_paint} to erase\nHold {key} and press {action_paint} to erase a straight line (ruler mode)", new Map([["key", Config.keymap.brush_ruler], ["action_paint", Config.keymap.action_paint]])),
				"(" + Config.keymap.tool_fill + ")",
				"(" + Config.keymap.tool_decal + ") - " + tr("Hold {key} to paint on a decal mask", new Map([["key", Config.keymap.decal_mask]])),
				"(" + Config.keymap.tool_text + ") - " + tr("Hold {key} to use the text as a mask", new Map([["key", Config.keymap.decal_mask]])),
				"(" + Config.keymap.tool_clone + ") - " + tr("Hold {key} to set source", new Map([["key", Config.keymap.set_clone_source]])),
				"(" + Config.keymap.tool_blur + ")",
				"(" + Config.keymap.tool_smudge + ")",
				"(" + Config.keymap.tool_particle + ")",
				"(" + Config.keymap.tool_colorid + ")",
				"(" + Config.keymap.tool_picker + ")",
				"(" + Config.keymap.tool_bake + ")",
				"(" + Config.keymap.tool_gizmo + ")",
				"(" + Config.keymap.tool_material + ")",
			];

			let drawTool = (i: i32) => {
				ui._x += 2;
				if (Context.raw.tool == i) UIToolbar.drawHighlight();
				let tileY = Math.floor(i / 12);
				let tileX = tileY % 2 == 0 ? i % 12 : (11 - (i % 12));
				let rect = Res.tile50(img, tileX, tileY);
				let _y = ui._y;

				let imageState = ui.image(img, iconAccent, null, rect.x, rect.y, rect.w, rect.h);
				if (imageState == State.Started) {
					Context.selectTool(i);
				}
				else if (imageState == State.Released && Config.raw.layout[LayoutSize.LayoutHeader] == 0) {
					if (UIToolbar.lastTool == i) {
						UIToolbar.toolPropertiesMenu();
					}
					UIToolbar.lastTool = i;
				}

				///if is_paint
				if (i == WorkspaceTool.ToolColorId && Context.raw.colorIdPicked) {
					ui.g.drawScaledSubImage(RenderPath.renderTargets.get("texpaint_colorid").image, 0, 0, 1, 1, 0, _y + 1.5 * ui.SCALE(), 5 * ui.SCALE(), 34 * ui.SCALE());
				}
				///end

				if (ui.isHovered) ui.tooltip(tr(UIToolbar.toolNames[i]) + " " + keys[i]);
				ui._x -= 2;
				ui._y += 2;
			}

			drawTool(WorkspaceTool.ToolBrush);
			///if is_paint
			drawTool(WorkspaceTool.ToolEraser);
			drawTool(WorkspaceTool.ToolFill);
			drawTool(WorkspaceTool.ToolDecal);
			drawTool(WorkspaceTool.ToolText);
			drawTool(WorkspaceTool.ToolClone);
			drawTool(WorkspaceTool.ToolBlur);
			drawTool(WorkspaceTool.ToolSmudge);
			drawTool(WorkspaceTool.ToolParticle);
			drawTool(WorkspaceTool.ToolColorId);
			drawTool(WorkspaceTool.ToolPicker);
			drawTool(WorkspaceTool.ToolBake);
			drawTool(WorkspaceTool.ToolMaterial);
			///end

			///if is_forge
			drawTool(WorkspaceTool.ToolGizmo);
			///end

			ui.imageScrollAlign = true;
		}

		if (Config.raw.touch_ui) {
			// Hide scrollbar
			let _SCROLL_W = ui.t.SCROLL_W;
			ui.t.SCROLL_W = 0;
			ui.endWindow();
			ui.t.SCROLL_W = _SCROLL_W;
		}
	}

	static toolPropertiesMenu = () => {
		let ui = UIBase.ui;
		let _x = ui._x;
		let _y = ui._y;
		let _w = ui._w;
		UIMenu.draw((ui: Zui) => {
			let startY = ui._y;
			ui.changed = false;

			UIHeader.drawToolProperties(ui);

			if (ui.changed) {
				UIMenu.keepOpen = true;
			}

			if (ui.button(tr("Pin to Header"), Align.Left)) {
				Config.raw.layout[LayoutSize.LayoutHeader] = 1;
			}

			let h = ui._y - startY;
			UIMenu.menuElements = Math.floor(h / ui.ELEMENT_H());
			UIMenu.menuX = Math.floor(_x + _w + 2);
			UIMenu.menuY = Math.floor(_y - 6 * ui.SCALE());
			UIMenu.fitToScreen();

		}, 0);

		// First draw out of screen, then align the menu based on menu height
		UIMenu.menuX = -System.width;
		UIMenu.menuY = -System.height;
	}

	static drawHighlight = () => {
		let ui = UIBase.ui;
		let size = UIToolbar.toolbarw - 4;
		ui.g.color = ui.t.HIGHLIGHT_COL;
		ui.drawRect(ui.g, true, ui._x + -1,  ui._y + 2, size + 2, size + 2);
	}
}

///end
