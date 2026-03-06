import type {
  DecisionMixedNode,
  Decisions,
  LeafNode,
  NodeStabilityData,
} from '../../types';

/** Zustand store for managing Bifurcation Explorer status.
 * Provides actions to set and clear the selected node, load stability analysis results...
 */
export type BifurcationExplorerStatusState = {
  /** Currently selected node in the Bifurcation Explorer */
  selectedNode: LeafNode | DecisionMixedNode | null;
  /** Last computed stability analysis results */
  stabilityData: NodeStabilityData | null;
  /** Decisions available for the selected node */
  availableDecisions: Decisions | null;
  changeSelectedNode: (node: LeafNode | DecisionMixedNode | null) => void;
  loadStabilityData: (stabilityData: NodeStabilityData | null) => void;
  loadDecisions: (decisions: Decisions | null) => void;
  clear: () => void;
};
