import type {
  ContentVisibleComponent,
  MenuTabButton,
  MenuTabTypeMENotNull,
  ModelEditorItem,
  ModelEditorItems,
  Position,
} from '../../types';

/* Zustand store for managing the model editor state */
export type ModelEditorStatus = {
  /** Info about the currently selected items (variable or regulation).
   *  The first item in the array is the last selected item.
   *  If the array is empty, no item is selected.
   */
  selectedItemsInfo: ModelEditorItems;

  /** Adds the selected item (variable or regulation).*/
  addSelectedItemInfo: (itemInfo: ModelEditorItem) => void;

  /** Removes the selected item (variable or regulation). */
  removeSelectedItemInfo: (itemInfo: ModelEditorItem) => void;

  /** Clears all selected items. */
  clearSelectedItemsInfo: () => void;

  /** Info about currently hovered item (variable or regulation).
   *  If null, no item is hovered.
   */
  hoverItemInfo: ModelEditorItem | null;

  /** Sets the currently hovered item (variable or regulation).
   *  If null, no item is hovered.
   */
  setHoverItemInfo: (itemInfo: ModelEditorItem | null) => void;

  /** The ID of the variable to scroll to in the Model Editor menu tab. */
  scrollToVariable: number | null;

  /** Sets id of the variable to scroll to. */
  setScrollToVariable: (variableId: number) => void;

  /** Clears the scroll to variable. */
  clearScrollToVariable: () => void;

  /** Reference to the menu tab buttons. */
  menuTabButtonsRef: Partial<Record<MenuTabTypeMENotNull, MenuTabButton>>;

  /** Sets the reference to a menu tab button.
   *  @param tab - The menu tab type.
   *  @param el - The HTML button element, or null to clear the reference.
   */
  setMenuTabButtonRef: (
    tab: MenuTabTypeMENotNull,
    el: MenuTabButton | null
  ) => void;

  /** Reference to the utilities menu component. */
  utilitiesMenuRef: ContentVisibleComponent | null;

  /** Setter for the reference to the utilities menu component. */
  setUtilitiesMenuRef: (ref: ContentVisibleComponent) => void;

  /** Information about the floating menu's position and zoom level.
   *  If null, the floating menu is hidden.
   *  @param info - The position and zoom level of the floating menu, or null to hide it.
   */
  floatingMenuInfo: {
    position: Position;
    zoom: number;
    itemInfo: ModelEditorItem;
  } | null;

  /** Sets the information about the floating menu's position and zoom level.
   *  If null, the floating menu is hidden.
   *  @param info - The position and zoom level of the floating menu, or null to hide it.
   */
  setFloatingMenuInfo: (
    info: { position: Position; zoom: number; itemInfo: ModelEditorItem } | null
  ) => void;

  /** Clears all the information. */
  clear: () => void;
};
