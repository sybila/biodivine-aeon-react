import { create } from 'zustand';
import type { ModelEditorStatus } from './ModelEditorStatus';

/* Zustand store for managing the model editor state */
const useModelEditorStatus = create<ModelEditorStatus>((set) => ({
  selectedItemInfo: null,
  setSelectedItemInfo: (itemInfo) => set({ selectedItemInfo: itemInfo }),
  hoverItemInfo: null,
  setHoverItemInfo: (itemInfo) => set({ hoverItemInfo: itemInfo }),
  floatingMenuInfo: null,
  setFloatingMenuInfo: (info) => set({ floatingMenuInfo: info }),
  clear: () => {
    set({
      selectedItemInfo: null,
      hoverItemInfo: null,
      floatingMenuInfo: null,
    });
  },
}));

export default useModelEditorStatus;
