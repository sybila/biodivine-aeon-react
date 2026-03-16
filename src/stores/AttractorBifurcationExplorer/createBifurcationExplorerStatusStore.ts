import { create } from 'zustand';
import type { ZustandStore } from '../ZustandStoreType';
import type { BifurcationExplorerStatusState } from './BifurcationExplorerStatusState';

function createBifurcationExplorerStatusStore(): ZustandStore<BifurcationExplorerStatusState> {
  return create<BifurcationExplorerStatusState>()((set) => ({
    visualizationStatus: null,
    selectedNode: null,
    stabilityData: null,
    availableDecisions: null,
    setVisualizationStatus: (status) => {
      set({ visualizationStatus: status });
    },
    changeSelectedNode: (node) => {
      set({
        selectedNode: node,
      });
    },
    loadStabilityData: (stabilityData) => {
      set({ stabilityData });
    },
    loadDecisions: (decisions) => {
      set({ availableDecisions: decisions });
    },
    clearSelectedNodeInfo: () => {
      set({
        selectedNode: null,
        stabilityData: null,
        availableDecisions: null,
      });
    },
    clear: () =>
      set({
        visualizationStatus: null,
        selectedNode: null,
        stabilityData: null,
        availableDecisions: null,
      }),
  }));
}

export default createBifurcationExplorerStatusStore;
