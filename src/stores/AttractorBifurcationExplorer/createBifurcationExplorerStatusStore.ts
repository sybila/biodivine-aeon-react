import { create } from 'zustand';
import type { ZustandStore } from '../ZustandStoreType';
import type { BifurcationExplorerStatusState } from './BifurcationExplorerStatusState';

function createBifurcationExplorerStatusStore(): ZustandStore<BifurcationExplorerStatusState> {
  return create<BifurcationExplorerStatusState>()((set) => ({
    visualizationStatus: null,
    activeMenuTab: null,
    selectedNode: null,
    stabilityData: null,
    availableDecisions: null,
    setVisualizationStatus: (status) => {
      set({ visualizationStatus: status });
    },
    setActiveMenuTab: (tab) => {
      set({ activeMenuTab: tab });
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
        activeMenuTab: null,
        selectedNode: null,
        stabilityData: null,
        availableDecisions: null,
      }),
  }));
}

export default createBifurcationExplorerStatusStore;
