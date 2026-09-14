import type {
  ContentVisibleComponent,
  DecisionMixedNode,
  Decisions,
  FullStabilityAnalysisMode,
  LeafNode,
  MenuTabTypeABE,
  NodeStabilityData,
  VisualizationStatus,
} from '../../types/types';

/** Zustand store for managing Bifurcation Explorer status.
 * Provides actions to set and clear the selected node, load stability analysis results...
 */
export type BifurcationExplorerStatusState = {
  /** Currently saved visualization status. If null, no status is saved. (for example, when the page was newly created) */
  visualizationStatus: VisualizationStatus | null;
  /** Active menu tab inside the Bifurcation Explorer page. */
  activeMenuTab: MenuTabTypeABE;

  /** Currently set stability analysis mode */
  stabilityAnalysisMode: FullStabilityAnalysisMode;
  /** Currently selected node in the Bifurcation Explorer */
  selectedNode: LeafNode | DecisionMixedNode | null;
  /** Last computed stability analysis results */
  stabilityData: NodeStabilityData | null;
  /** Decisions available for the selected node */
  availableDecisions: Decisions | null;

  /** Reference to the utilities menu component. */
  utilitiesMenuRef: ContentVisibleComponent | null;
  /** Setter for the reference to the utilities menu component. */
  setUtilitiesMenuRef: (ref: ContentVisibleComponent) => void;

  setVisualizationStatus: (status: VisualizationStatus) => void;
  setActiveMenuTab: (tab: MenuTabTypeABE) => void;
  setStabilityAnalysisMode: (mode: FullStabilityAnalysisMode) => void;
  changeSelectedNode: (node: LeafNode | DecisionMixedNode | null) => void;
  loadStabilityData: (stabilityData: NodeStabilityData | null) => void;
  loadDecisions: (decisions: Decisions | null) => void;
  /** Removes information about selected node. */
  clearSelectedNodeInfo: () => void;
  clear: () => void;
};
