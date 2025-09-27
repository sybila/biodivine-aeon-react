import { create } from 'zustand';
import type { Position } from '../../types';

type ModelEditorState = {
  /** The id of the currently selected item (variable or regulation).
   *  If null, no item is selected. */
  selectedItemInfo: { type: 'variable' | 'regulation'; id: number } | null;

  /** Sets the currently selected item (variable or regulation).
   *  If null, no item is selected.
   */
  setSelectedItemInfo: (
    itemInfo: { type: 'variable' | 'regulation'; id: number } | null
  ) => void;

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

/* Zustand store for managing the model editor state */
const useModelEditorStatus = create<ModelEditorState>((set) => ({
  selectedItemInfo: null,
  setSelectedItemInfo: (itemInfo) => set({ selectedItemInfo: itemInfo }),
  floatingMenuInfo: null,
  setFloatingMenuInfo: (info) => set({ floatingMenuInfo: info }),
  clear: () => {
    set({ selectedItemInfo: null, floatingMenuInfo: null });
  },
}));

export default useModelEditorStatus;
