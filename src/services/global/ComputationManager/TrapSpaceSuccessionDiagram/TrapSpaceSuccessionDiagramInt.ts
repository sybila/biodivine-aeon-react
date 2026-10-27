import type {
  DecisionNodeTypeTSSD,
  NodeDataTSSDWithMotifs,
  NodesWithParentInfoTSSD,
  NodeTypeTSSD,
} from '../../../../types/types';

export interface TrapSpaceSuccessionDiagramInt {
  /* #region --- Computation --- */

  /** Starts the computation of trap space succession diagram. */
  startComputation(): void;

  /* #endregion */

  /* #region --- Trap Space Succession Diagram --- */

  /** Fetches whole succession diagram for the TrapSpaceSuccessionDiagram page. */
  getTrapSpaceSuccessionDiagram(
    insertSuccessionDiagramFunction: (rootNode: NodeDataTSSDWithMotifs) => void
  ): void;

  getDecisions(
    nodeId: number,
    sourceType: DecisionNodeTypeTSSD,
    setDecisionsFunction: (decisions: NodesWithParentInfoTSSD) => void
  ): void;

  /** Extends trap space succession diagram with a new nodes defined by targetIds.
   *  The new nodes are a children of the node with id = sourceId. The new nodes are inserted into the succession diagram using addNodesIntoSuccessionDiagramFunction function.
   * @param sourceId - (number) ID of the parent node from which the new node will be generated.
   * @param sourceType - (DecisionNodeTypeTSSD) type of node specified by the sourceId (for example "trap-space-decision")
   * @param targetIds - (Array<number>) IDs of nodes which should be added into the succession diagram.
   * @param addNodesIntoSuccessionDiagramFunction - (function) Function which takes nodes and adds them into succession diagram.
   */
  makeDecision(
    sourceId: number,
    sourceType: DecisionNodeTypeTSSD,
    targetIds: Array<number>,
    addNodesIntoSuccessionDiagramFunction: (
      nodesToAdd: NodesWithParentInfoTSSD
    ) => void
  ): void;

  /** Deletes node from trap space succession diagram.
   *  @param nodeId: (number) Id of the node to be removed,
   *  @param nodeType: (NodeTypeTSSD) type of the node to be removed,
   *  @param removeNodesFromVisualizationFunction - (function) This function is used to remove the deleted node and its child nodes from the visualization.
   */
  deleteNode(
    nodeId: number,
    nodeType: NodeTypeTSSD,
    removeNodesFromVisualizationFunction: (
      removedNodeId: number,
      removedNodeType: NodeTypeTSSD
    ) => void
  ): void;

  /* #endregion */
}
