import { create } from 'zustand';
import type { ZustandStore } from '../ZustandStoreType';
import type { BifurcationExplorerStatusState } from './BifurcationExplorerStatusState';

function createBifurcationExplorerStatusStore(): ZustandStore<BifurcationExplorerStatusState> {
  return create<BifurcationExplorerStatusState>()((set) => ({
    visualizationStatus: null,
    activeMenuTab: null,

    stabilityAnalysisMode: 'Total',
    selectedNode: null,
    stabilityData: null,
    availableDecisions: null,

    utilitiesMenuRef: null,
    setUtilitiesMenuRef: (ref) => set({ utilitiesMenuRef: ref }),

    setVisualizationStatus: (status) => {
      set({ visualizationStatus: status });
    },
    setActiveMenuTab: (tab) => {
      set({ activeMenuTab: tab });
    },
    setStabilityAnalysisMode: (mode) => {
      set({ stabilityAnalysisMode: mode });
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
        stabilityAnalysisMode: 'Total',
      });
    },
    clear: () =>
      set({
        visualizationStatus: null,
        activeMenuTab: null,
        selectedNode: null,
        stabilityData: null,
        availableDecisions: null,
        stabilityAnalysisMode: 'Total',
      }),
  }));
}

export default createBifurcationExplorerStatusStore;
