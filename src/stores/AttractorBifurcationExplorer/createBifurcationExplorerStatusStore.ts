import { create } from 'zustand';
import type { ZustandStore } from '../ZustandStoreType';
import type { BifurcationExplorerStatusState } from './BifurcationExplorerStatusState';

function createBifurcationExplorerStatusStore(): ZustandStore<BifurcationExplorerStatusState> {
  return create<BifurcationExplorerStatusState>()((set) => ({
    selectedNode: null,
    stabilityData: null,
    availableDecisions: null,
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
    clear: () =>
      set({
        selectedNode: null,
        stabilityData: null,
        availableDecisions: null,
      }),
  }));
}

export default createBifurcationExplorerStatusStore;
