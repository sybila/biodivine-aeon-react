import { create } from 'zustand';
import type { DecisionMixedNode, StabilityAnalysisVariable } from '../../types';

type BifurcationExplorerStatusState = {
  /** Currently selected node in the Bifurcation Explorer */
  selectedNode: DecisionMixedNode | null;
  /** Last computed stability analysis results */
  stabilityData: Array<StabilityAnalysisVariable> | null;
  changeSelectedNode: (node: DecisionMixedNode | null) => void;
  loadStabilityData: (
    stabilityData: Array<StabilityAnalysisVariable> | null
  ) => void;
  clear: () => void;
};

/** Zustand store for managing Bifurcation Explorer status.
 * Provides actions to set and clear the selected node, load stability analysis results...
 */
const useBifurcationExplorerStatus = create<BifurcationExplorerStatusState>()(
  (set) => ({
    selectedNode: null,
    stabilityData: null,
    changeSelectedNode: (node) => {
      set({
        selectedNode: node,
      });
    },
    loadStabilityData: (stabilityData) => {
      set({ stabilityData });
    },
    clear: () => set({ selectedNode: null, stabilityData: null }),
  })
);

export default useBifurcationExplorerStatus;
