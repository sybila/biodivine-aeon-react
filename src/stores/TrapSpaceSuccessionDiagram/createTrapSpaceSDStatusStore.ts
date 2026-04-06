import { create } from 'zustand';
import type { ZustandStore } from '../ZustandStoreType';
import type { TrapSpaceSDStatusState } from './TrapSpaceSDStatusState';

function createTrapSpaceSDStatusStore(): ZustandStore<TrapSpaceSDStatusState> {
  return create<TrapSpaceSDStatusState>()((set, get) => ({
    selectedNode: null,
    visualizationStatus: null,
    availableDecisions: null,

    setVisualizationStatus: (status) => {
      set({ visualizationStatus: status });
    },
    setAvailableDecisions: (decisions) => {
      set({ availableDecisions: decisions });
    },
    changeSelectedNode: (node) => {
      if (node === null) {
        get().clearSelectedNodeInfo();
        return;
      }
      set({ selectedNode: node });
    },

    clearSelectedNodeInfo: () => {
      set({ selectedNode: null, visualizationStatus: null });
    },
  }));
}

export default createTrapSpaceSDStatusStore;
