import { create } from 'zustand';
import type { BifurcationExplorerStatusState } from './BifurcationExplorerStatusState';

/** Zustand store for managing Bifurcation Explorer status.
 * Provides actions to set and clear the selected node, load stability analysis results...
 */
const useBifurcationExplorerStatus = create<BifurcationExplorerStatusState>()(
  (set) => ({
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
  })
);

export default useBifurcationExplorerStatus;
