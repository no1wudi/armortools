
class TabSwatches {

	static _empty: Image;

	static set empty(image: Image) {
		TabSwatches._empty = image;
	}

	static get empty(): Image {
		if (TabSwatches._empty == null) {
			let b = new Uint8Array(4);
			b[0] = 255;
			b[1] = 255;
			b[2] = 255;
			b[3] = 255;
			TabSwatches._empty = Image.fromBytes(b.buffer, 1, 1);
		}
		return TabSwatches._empty;
	}

	static dragPosition: i32 = -1;

	static draw = (htab: Handle) => {
		let ui = UIBase.ui;
		let statush = Config.raw.layout[LayoutSize.LayoutStatusH];
		if (ui.tab(htab, tr("Swatches")) && statush > UIStatus.defaultStatusH * ui.SCALE()) {

			ui.beginSticky();
			if (Config.raw.touch_ui) {
				ui.row([1 / 5, 1 / 5, 1 / 5, 1 / 5, 1 / 5]);
			}
			else {
				ui.row([1 / 14, 1 / 14, 1 / 14, 1 / 14, 1 / 14]);
			}

			if (ui.button(tr("New"))) {
				Context.setSwatch(Project.makeSwatch());
				Project.raw.swatches.push(Context.raw.swatch);
			}
			if (ui.isHovered) ui.tooltip(tr("Add new swatch"));

			if (ui.button(tr("Import"))) {
				UIMenu.draw((ui: Zui) => {
					if (UIMenu.menuButton(ui, tr("Replace Existing"))) {
						Project.importSwatches(true);
						Context.setSwatch(Project.raw.swatches[0]);
					}
					if (UIMenu.menuButton(ui, tr("Append"))) {
						Project.importSwatches(false);
					}
				}, 2);
			}
			if (ui.isHovered) ui.tooltip(tr("Import swatches"));

			if (ui.button(tr("Export"))) Project.exportSwatches();
			if (ui.isHovered) ui.tooltip(tr("Export swatches"));

			if (ui.button(tr("Clear"))) {
				Context.setSwatch(Project.makeSwatch());
				Project.raw.swatches = [Context.raw.swatch];
			}

			if (ui.button(tr("Restore"))) {
				Project.setDefaultSwatches();
				Context.setSwatch(Project.raw.swatches[0]);
			}
			if (ui.isHovered) ui.tooltip(tr("Restore default swatches"));

			ui.endSticky();
			ui.separator(3, false);

			let slotw = Math.floor(26 * ui.SCALE());
			let num = Math.floor(ui._w / (slotw + 3));
			let dragPositionSet = false;

			let uix = 0.0;
			let uiy = 0.0;
			for (let row = 0; row < Math.floor(Math.ceil(Project.raw.swatches.length / num)); ++row) {
				let ar = [];
				for (let i = 0; i < num; ++i) ar.push(1 / num);
				ui.row(ar);

				ui._x += 2;
				if (row > 0) ui._y += 6;

				for (let j = 0; j < num; ++j) {
					let i = j + row * num;
					if (i >= Project.raw.swatches.length) {
						ui.endElement(slotw);
						continue;
					}

					if (Context.raw.swatch == Project.raw.swatches[i]) {
						let off = row % 2 == 1 ? 1 : 0;
						let w = 32;
						ui.fill(-2, -2, w, w, ui.t.HIGHLIGHT_COL);
					}

					uix = ui._x;
					uiy = ui._y;

					// Draw the drag position indicator
					if (Base.dragSwatch != null && TabSwatches.dragPosition == i) {
						ui.fill(-1, -2 , 2, 32, ui.t.HIGHLIGHT_COL);
					}

					let state = ui.image(TabSwatches.empty, Project.raw.swatches[i].base, slotw);

					if (state == State.Started) {
						Context.setSwatch(Project.raw.swatches[i]);

						Base.dragOffX = -(Mouse.x - uix - ui._windowX - 2 * slotw);
						Base.dragOffY = -(Mouse.y - uiy - ui._windowY + 1);
						Base.dragSwatch = Context.raw.swatch;
					}
					else if (state == State.Hovered) {
						TabSwatches.dragPosition = (Mouse.x > uix + ui._windowX + slotw / 2) ? i + 1 : i; // Switch to the next position if the mouse crosses the swatch rectangle center
						dragPositionSet = true;
					}
					else if (state == State.Released) {
						if (Time.time() - Context.raw.selectTime < 0.25) {
							UIMenu.draw((ui: Zui) => {
								ui.changed = false;
								let h = Zui.handle("tabswatches_0");
								h.color = Context.raw.swatch.base;

								Context.raw.swatch.base = ui.colorWheel(h, false, null, 11 * ui.t.ELEMENT_H * ui.SCALE(), true, () => {
									Context.raw.colorPickerPreviousTool = Context.raw.tool;
									Context.selectTool(WorkspaceTool.ToolPicker);
									Context.raw.colorPickerCallback = (color: TSwatchColor) => {
										Project.raw.swatches[i] = Project.cloneSwatch(color);
									};
								});
								let hopacity = Zui.handle("tabswatches_1");
								hopacity.value = Context.raw.swatch.opacity;
								Context.raw.swatch.opacity = ui.slider(hopacity, "Opacity", 0, 1, true);
								let hocclusion = Zui.handle("tabswatches_2");
								hocclusion.value = Context.raw.swatch.occlusion;
								Context.raw.swatch.occlusion = ui.slider(hocclusion, "Occlusion", 0, 1, true);
								let hroughness = Zui.handle("tabswatches_3");
								hroughness.value = Context.raw.swatch.roughness;
								Context.raw.swatch.roughness = ui.slider(hroughness, "Roughness", 0, 1, true);
								let hmetallic = Zui.handle("tabswatches_4");
								hmetallic.value = Context.raw.swatch.metallic;
								Context.raw.swatch.metallic = ui.slider(hmetallic, "Metallic", 0, 1, true);
								let hheight = Zui.handle("tabswatches_5");
								hheight.value = Context.raw.swatch.height;
								Context.raw.swatch.height = ui.slider(hheight, "Height", 0, 1, true);

								if (ui.changed || ui.isTyping) UIMenu.keepOpen = true;
								if (ui.inputReleased) Context.setSwatch(Context.raw.swatch); // Trigger material preview update
							}, 16, Math.floor(Mouse.x - 200 * ui.SCALE()), Math.floor(Mouse.y - 250 * ui.SCALE()));
						}

						Context.raw.selectTime = Time.time();
					}
					if (ui.isHovered && ui.inputReleasedR) {
						Context.setSwatch(Project.raw.swatches[i]);
						let add = Project.raw.swatches.length > 1 ? 1 : 0;
						///if (krom_windows || krom_linux || krom_darwin)
						add += 1; // Copy
						///end

						///if (is_paint || is_sculpt)
						add += 3;
						///end
						///if is_lav
						add += 1;
						///end

						UIMenu.draw((ui: Zui) => {
							if (UIMenu.menuButton(ui, tr("Duplicate"))) {
								Context.setSwatch(Project.cloneSwatch(Context.raw.swatch));
								Project.raw.swatches.push(Context.raw.swatch);
							}
							///if (krom_windows || krom_linux || krom_darwin)
							else if (UIMenu.menuButton(ui, tr("Copy Hex Code"))) {
								let color = Context.raw.swatch.base;
								color = color_set_ab(color, Context.raw.swatch.opacity * 255);
								let val = color;
								if (val < 0) val += 4294967296;
								Krom.copyToClipboard(val.toString(16));
							}
							///end
							else if (Project.raw.swatches.length > 1 && UIMenu.menuButton(ui, tr("Delete"), "delete")) {
								TabSwatches.deleteSwatch(Project.raw.swatches[i]);
							}
							///if (is_paint || is_sculpt)
							else if (UIMenu.menuButton(ui, tr("Create Material"))) {
								TabMaterials.acceptSwatchDrag(Project.raw.swatches[i]);
							}
							else if (UIMenu.menuButton(ui, tr("Create Color Layer"))) {
								let color = Project.raw.swatches[i].base;
								color = color_set_ab(color, Project.raw.swatches[i].opacity * 255);
								Base.createColorLayer(color, Project.raw.swatches[i].occlusion, Project.raw.swatches[i].roughness, Project.raw.swatches[i].metallic);
							}
							///end
						}, add);
					}
					if (ui.isHovered) {
						let color = Project.raw.swatches[i].base;
						color = color_set_ab(color, Project.raw.swatches[i].opacity * 255);
						let val = color;
						if (val < 0) val += 4294967296;
						ui.tooltip("#" + val.toString(16));
					}
				}
			}

			// Draw the rightmost line next to the last swatch
			if (Base.dragSwatch != null && TabSwatches.dragPosition == Project.raw.swatches.length) {
				ui._x = uix; // Reset the position because otherwise it would start in the row below
				ui._y = uiy;
				ui.fill(28, -2, 2, 32, ui.t.HIGHLIGHT_COL);
			}

			// Currently there is no valid dragPosition so reset it
			if (!dragPositionSet) {
				TabSwatches.dragPosition = -1;
			}

			let inFocus = ui.inputX > ui._windowX && ui.inputX < ui._windowX + ui._windowW &&
						  ui.inputY > ui._windowY && ui.inputY < ui._windowY + ui._windowH;
			if (inFocus && ui.isDeleteDown && Project.raw.swatches.length > 1) {
				ui.isDeleteDown = false;
				TabSwatches.deleteSwatch(Context.raw.swatch);
			}
		}
	}

	static acceptSwatchDrag = (swatch: TSwatchColor) => {
		// No valid position available
		if (TabSwatches.dragPosition == -1) return;

		let swatchPosition = Project.raw.swatches.indexOf(swatch);
		// A new swatch from color picker
		if (swatchPosition == -1) {
			Project.raw.swatches.splice(TabSwatches.dragPosition, 0, swatch);
		}
		else if (Math.abs(swatchPosition - TabSwatches.dragPosition) > 0) { // Existing swatch is reordered
			array_remove(Project.raw.swatches, swatch);
			// If the new position is after the old one, decrease by one because the swatch has been deleted
			let newPosition = TabSwatches.dragPosition - swatchPosition > 0 ? TabSwatches.dragPosition -1 : TabSwatches.dragPosition;
			Project.raw.swatches.splice(newPosition, 0, swatch);
		}
	}

	static deleteSwatch = (swatch: TSwatchColor) => {
		let i = Project.raw.swatches.indexOf(swatch);
		Context.setSwatch(Project.raw.swatches[i == Project.raw.swatches.length - 1 ? i - 1 : i + 1]);
		Project.raw.swatches.splice(i, 1);
		UIBase.hwnds[TabArea.TabStatus].redraws = 2;
	}
}
