import { create } from 'zustand';
import type { DecisionMixedNode } from '../../types';

type BifurcationExplorerStatusState = {
  selectedNode: DecisionMixedNode | null;
  changeSelectedNode: (node: DecisionMixedNode | null) => void;
  clear: () => void;
};

/** Zustand store for managing Bifurcation Explorer status.
 * Provides actions to set and clear the selected node.
 */
const useBifurcationExplorerStatus = create<BifurcationExplorerStatusState>()(
  (set) => ({
    selectedNode: null,
    changeSelectedNode: (node) => {
      set({
        selectedNode: node,
      });
    },
    clear: () => set({ selectedNode: null }),
  })
);

export default useBifurcationExplorerStatus;
