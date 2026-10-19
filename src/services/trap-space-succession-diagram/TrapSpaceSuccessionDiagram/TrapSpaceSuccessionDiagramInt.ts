import type {
  DecisionNodeTypeTSSD,
  NodeDataTSSDWithMotifs,
  NodeTypeTSSD,
  VisualOptionsSwitchableTSSD,
} from '../../../types/types';

/** Interface which defines service responsible for managing Trap Space Succession Diagram page.  */
export interface TrapSpaceSuccessionDiagramInt {
  init: (container: HTMLDivElement) => void;

  // #region --- Succession diagram management ---

  /** Tests if the succession diagram can be opened. If yes gets it from compute engine. */
  openSuccessionDiagram: () => void;

  /** Inserts the succession diagram into visualization. */
  insertSuccessionDiagram: (
    rootNode: NodeDataTSSDWithMotifs,
    fit: boolean,
    animate: boolean,
    clearVisualization: boolean
  ) => void;

  // #endregion

  // #region --- Node Operations ---

  /** Refreshes the selection in the TrapSpaceSuccessionDiagram.
   *  Unselects and re-selects the current selected node. */
  refreshSelection: () => void;

  /**
   * Removes a node from the visualization after showing a confirmation warning.
   *
   * @param nodeId   - (number) The unique identifier of the node to be removed.
   * @param nodeType - (NodeTypeTSSD) The type of the node
   */
  removeNodeWithWarning(nodeId: number, nodeType: NodeTypeTSSD): void;

  // #endregion

  // #region --- Decision management ---

  /** Gets all possible decisions for a specific node.
   *  @param nodeId - (number) The ID of the node to fetch decisions for.
   *  @param nodeType - (DecisionNodeTypeTSSD) The type of node for which to fetch decisions (eg. "stable-motif")
   */
  getDecisions(nodeId: number, nodeType: DecisionNodeTypeTSSD): void;

  /** Extends trap space succession diagram with a new nodes defined by targetIds.
   *  The new nodes are a children of the node with id = sourceId.
   * @param sourceId - (number) ID of the parent node from which the new node will be generated.
   * @param sourceType - (DecisionNodeTypeTSSD) type of node specified by the sourceId (for example "trap-space-decision")
   * @param targetIds - (Array<number>) IDs of nodes which should be added into the succession diagram.
   */
  makeDecision(
    sourceNodeId: number,
    sourceNodeType: DecisionNodeTypeTSSD,
    selectedNodeIds: Array<number>
  ): void;

  // #endregion

  // #region --- Attractor C;asses --

  /** Gets attractor classes for specified node */
  getAttractorClasses(nodeId: number, nodeType: NodeTypeTSSD): void;

  /** Opens attractor visualization for attractor behavior class. */
  openAttractorVisualization(classBehavior: string): void;

  /** Opens witness model for attractor behavior class. */
  openWitness(classBehavior: string): void;

  // #endregion

  // #region --- Visual Options ---

  /** Gets the current state of the switchable options in the visual options tab */
  getSwitchableOptionsState(): VisualOptionsSwitchableTSSD;

  /** Sets the nodes to snap to their respective layers. */
  toggleSnapNodesToLayers(): void;

  /** Animates layout changes in the visualization instance. */
  toggleAnimateLayoutChanges(): void;

  // #endregion

  // #region --- Visualization Operations ---

  /** Set zoom level of the model visualization
   *  @param zoomLevel (number) number which signifies how much should be the canvas zoomed.
   *
   * */
  setZoom(zoomLevel: number): void;

  /** Fits the succession diagram to the viewport. */
  fitTree(): void;

  /** Resets the layout of the succession diagram. */
  resetTreeLayout(): void;

  // #endregion
}
