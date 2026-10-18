import type {
  ComputationStatus,
  DecisionNodeTypeTSSD,
  NodeDataTSSDWithMotifs,
  NodesWithParentInfoTSSD,
  NodeTypeTSSD,
} from '../../../../types/types';

/** Compute Engine module which contains function used for computing and working with Trap Space Succession Diagram. */
export interface TrapSpaceSuccessionDiagramInt {
  // #region --- Computation ---

  /**
   * Initiates a computation based on the provided Boolean network model.
   * This method sends a request to start an "Trap Space" calculation using the specified model.
   *
   * @param model The Boolean network model in Aeon string format.
   * @param callback An optional function to be called upon completion or error of the computation.
   *                 If provided, it receives:
   *                 - `warning`: Any warning messages generated during the process.
   *                 - `error`: Error message if the computation failed.
   *                 - `engineStatus`: Current status of the background processing engine.
   *                 - `compStatus`: Detailed status of the specific computation job.
   *                 - `color`: Visual indicator color associated with the current state (e.g., green for success).
   * @result Triggers a request to the backend and updates the internal waiting state before asynchronous resolution.
   */
  startComputation(
    model: string,
    callback:
      | ((
          warning: string | undefined,
          error: string | undefined,
          engineStatus: string | undefined,
          compStatus: ComputationStatus | undefined,
          color: string | undefined
        ) => void)
      | undefined
  ): void;

  // #ednregion

  // #region --- Diagram Operations ---

  /** Gets the trap space succession diagram for a specific model. */
  getTrapSpaceSuccessionDiagram(
    model: string,
    callback: (
      error: string | undefined,
      rootNode: NodeDataTSSDWithMotifs | undefined
    ) => void
  ): void;

  /** Gets decisions for a specific node in the Trap Space Succession Diagram.
   *  @param sourceId - (number) The ID of the node to fetch decisions for.
   *  @param sourceType - (DecisionNodeTypeTSSD) The type of node for which to get the decisions (for example "trap-space-decision" or "stable-motif")
   *  @param callback - (function) Function which takes a list of decisions and sets them in the Trap Space Succession Diagram page. This function is used to set the available decisions for a node after they are fetched.
   */
  getDecisionsTSSD(
    sourceId: number,
    sourceType: DecisionNodeTypeTSSD,
    callback: (
      error: string | undefined,
      decisions: NodesWithParentInfoTSSD | undefined
    ) => void
  ): void;

  /**Extends trap space succession diagram with nodes corresponding to targetIds.
   * The new nodes are a children of the node with id = sourceId. The new nodes are inserted into the succession diagram using callback.
   * @param sourceId - (number) ID of the source node from which the new nodes will be generated
   * @param sourceType - (DecisionNodeTypeTSSD) The type of the source node (for example "trap-space-decision" or "stable-motif")
   * @param targetIds - (number) IDs of the nodes which should be added to the diagram (their type is determined from the type of the source node).
   * @param callback - (function) Function which takes nodes and inserts them into the succession diagram visualization.
   */
  makeDecisionTSSD(
    sourceId: number,
    sourceType: DecisionNodeTypeTSSD,
    targetIds: Array<number>,
    callback: (
      error: string | undefined,
      nodesToAdd: NodesWithParentInfoTSSD | undefined
    ) => void
  ): void;

  /** Deletes node from trap space succession diagram.
   *  @param nodeId - (number) number of the node to be removed.
   *  @param nodeType - (NodeTypeTSSD) type of the node to be removed
   *  @param callback - (function) This function is used to remove the deleted node and its child nodes from the visualization.
   */
  deleteNodeTSSD(
      nodeId: number,
      nodeType: NodeTypeTSSD,
      callback: (
        error: string | undefined,
        nodeId: number | undefined,
        nodeType: NodeTypeTSSD | undefined,
        removedNodeId: number
      ) => void
    ): void

  // #endregion
}
