import { create } from 'zustand';
import type { ZustandStore } from '../ZustandStoreType';
import type { TrapSpaceSDStatusState } from './TrapSpaceSDStatusState';

function createTrapSpaceSDStatusStore(): ZustandStore<TrapSpaceSDStatusState> {
  return create<TrapSpaceSDStatusState>()((set, get) => ({
    visualizationStatus: null,
    activeMenuTab: null,
    availableDecisions: null,
    selectedItem: null,
    computedAttractorClasses: null,

    utilitiesMenuRef: null,
    setUtilitiesMenuRef: (ref) => set({ utilitiesMenuRef: ref }),

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
    setComputedAttractorClasses: (attractorClasses) => {
      set({ computedAttractorClasses: attractorClasses });
    },
    setActiveMenuTab: (tab) => {
      set({ activeMenuTab: tab });
    },
    changeSelectedItem: (selectedItem) => {
      if (selectedItem === null) {
        get().clearSelectedItemInfo();
        return;
      }

      set({
        selectedItem: selectedItem,
        availableDecisions:
          selectedItem === get().selectedItem ? get().availableDecisions : null,
      });
    },

    clearSelectedItemInfo: () => {
      set({
        selectedItem: null,
        availableDecisions: null,
        computedAttractorClasses: null,
      });
    },
  }));
}

export default createTrapSpaceSDStatusStore;
