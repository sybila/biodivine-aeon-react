import { create } from 'zustand';
import type { ZustandStore } from '../ZustandStoreType';
import type { ModelEditorStatus } from './ModelEditorStatus';

function createModelEditorStatusStore(): ZustandStore<ModelEditorStatus> {
  return create<ModelEditorStatus>((set) => ({
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
}

export default createModelEditorStatusStore;
