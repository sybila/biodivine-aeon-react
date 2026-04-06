import type { NodeDataTSSD } from '../../types';

export type TrapSpaceSDStatusState = {
  selectedNode: NodeDataTSSD | null;

  changeSelectedNode: (node: NodeDataTSSD | null) => void;
  /** Clears the information about the selected node. (sets selectedNode to null) */
  clearSelectedNodeInfo: () => void;
};
