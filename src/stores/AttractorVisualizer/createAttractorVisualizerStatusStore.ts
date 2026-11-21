import { create } from 'zustand';
import type { ZustandStore } from '../ZustandStoreType';
import type { AttractorVisualizerStatusState } from './AttractorVisualizerStatusState';

function createAttractorVisualizerStatusStore(): ZustandStore<AttractorVisualizerStatusState> {
  return create<AttractorVisualizerStatusState>()((set) => ({
    selectedNodeState: null,
    changeSelectedState: (state) => {
      set({
        selectedNodeState: state,
      });
    },
    menuTabButtonsRef: {},
    setMenuTabButtonRef: (tab, el) =>
      set((state) => ({
        menuTabButtonsRef: {
          ...state.menuTabButtonsRef,
          [tab]: el,
        },
      })),
    clear: () =>
      set({
        selectedNodeState: null,
      }),
  }));
}

export default createAttractorVisualizerStatusStore;
