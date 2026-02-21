import type { ModelEditorItem, Position } from '../../types';

export type ModelEditorStatus = {
  /** Info about the currently selected item (variable or regulation).
   *  If null, no item is selected. */
  selectedItemInfo: ModelEditorItem | null;

  /** Sets the currently selected item (variable or regulation).
   *  If null, no item is selected.
   */
  setSelectedItemInfo: (itemInfo: ModelEditorItem | null) => void;

  /** Info about currently hovered item (variable or regulation).
   *  If null, no item is hovered.
   */
  hoverItemInfo: ModelEditorItem | null;

  /** Sets the currently hovered item (variable or regulation).
   *  If null, no item is hovered.
   */
  setHoverItemInfo: (itemInfo: ModelEditorItem | null) => void;

  /** Information about the floating menu's position and zoom level.
   *  If null, the floating menu is hidden.
   *  @param info - The position and zoom level of the floating menu, or null to hide it.
   */
  floatingMenuInfo: { position: Position; zoom: number } | null;

  /** Sets the information about the floating menu's position and zoom level.
   *  If null, the floating menu is hidden.
   *  @param info - The position and zoom level of the floating menu, or null to hide it.
   */
  setFloatingMenuInfo: (
    info: { position: Position; zoom: number } | null
  ) => void;

  /** Clears all the information. */
  clear: () => void;
};
