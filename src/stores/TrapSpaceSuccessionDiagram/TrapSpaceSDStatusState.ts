import type {
  DecisionsTSSD,
  MenuTabTypeTrapSpaceSD,
  NodeDataTSSD,
  VisualizationStatus,
} from '../../types/types';

/** Zustand Store which manages state of the Trap Space Succession Diagram page. */
export type TrapSpaceSDStatusState = {
  /** Currently saved visualization status. If null, no status is saved. (for example, when the page was newly created) */
  visualizationStatus: VisualizationStatus | null;
  /** Active menu tab inside the Trap Space Succession Diagram page. */
  activeMenuTab: MenuTabTypeTrapSpaceSD;

  selectedNode: NodeDataTSSD | null;
  /** Decisions available for the selected node */
  availableDecisions: DecisionsTSSD | null;

  setVisualizationStatus: (status: VisualizationStatus) => void;
  setAvailableDecisions: (decisions: DecisionsTSSD) => void;
  setActiveMenuTab: (tab: MenuTabTypeTrapSpaceSD) => void;
  changeSelectedNode: (node: NodeDataTSSD | null) => void;
  /** Clears the information about the selected node. (sets selectedNode to null) */
  clearSelectedNodeInfo: () => void;
};
