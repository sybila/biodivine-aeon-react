import type {
  DecisionTSSD,
  ItemTypesTSSD,
  NodeDataTSSDWithMotifs,
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
    nodeList: NodeDataTSSDWithMotifs[],
    fit: boolean,
    animate: boolean,
    clearVisualization: boolean
  ) => void;

  // #endregion

  // #region --- Node Operations ---

  /** Refreshes the selection in the TrapSpaceSuccessionDiagram.
   *  Unselects and re-selects the current selected node. */
  refreshSelection: () => void;

  /** Removes node from the succession diagram. */
  removeNode(node: NodeDataTSSDWithMotifs): void;

  // #endregion

  // #region --- Decision management ---

  /** Gets all possible decisions for a specific node.
   *  @param nodeId - (number) The ID of the node to fetch decisions for.
   */
  getDecisions(nodeId: number): void;

  /** Extends succession diagram by adding new node corresponding to the selected decision. */
  makeDecision(
    sourceNodeId: number,
    selectedDecision: DecisionTSSD,
    selectedNodeId: number
  ): void;

  // #endregion

  // #region --- Attractor C;asses --

  /** Gets attractor classes for specified item (stable motif (edge) or node) */
  getAttractorClasses(itemType: ItemTypesTSSD, itemId: number): void;

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
