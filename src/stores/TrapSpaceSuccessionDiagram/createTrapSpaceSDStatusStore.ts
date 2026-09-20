import { create } from 'zustand';
import type { ZustandStore } from '../ZustandStoreType';
import type { TrapSpaceSDStatusState } from './TrapSpaceSDStatusState';

function createTrapSpaceSDStatusStore(): ZustandStore<TrapSpaceSDStatusState> {
  return create<TrapSpaceSDStatusState>()((set, get) => ({
    visualizationStatus: null,
    activeMenuTab: null,
    availableDecisions: null,
    selectedItem: null,

    menuTabButtonsRef: {},
    setMenuTabButtonRef: (tab, el) =>
      set((state) => ({
        menuTabButtonsRef: {
          ...state.menuTabButtonsRef,
          [tab]: el,
        },
      })),

    setVisualizationStatus: (status) => {
      set({ visualizationStatus: status });
    },
    setAvailableDecisions: (decisions) => {
      set({ availableDecisions: decisions });
    },
    setActiveMenuTab: (tab) => {
      set({ activeMenuTab: tab });
    },
    changeSelectedItem: (selectedItem) => {
      if (selectedItem === null) {
        get().clearSelectedItemInfo();
        return;
      }
      set({ selectedItem: selectedItem });
    },

    clearSelectedItemInfo: () => {
      set({ selectedItem: null, visualizationStatus: null });
    },
  }));
}

export default createTrapSpaceSDStatusStore;
