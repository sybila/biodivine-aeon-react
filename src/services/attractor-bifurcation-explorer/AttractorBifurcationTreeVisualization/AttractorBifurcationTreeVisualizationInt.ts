// #region --- AttractorBifurcationTreeVisualizationInt ---
import type { Result } from '../../../types/result';
import type {
  NodeDataBE,
  NodeNecessaryConditions,
  VisualizationStatus,
  VisualOptionsSwitchableABE,
} from '../../../types/types';

/**
 * Interface which defines the methods and properties for the Attractor Bifurcation Tree Visualization from the AttractorBifurcationExplorer page.
 **/
export interface AttractorBifurcationTreeVisualizationInt {
  // #region --- Initialization ---

  /**
   * Initialize the visualization with a container element.
   * Avoids re-initialization if the same container is provided.
   */
  init(container: HTMLElement): void;

  // #endregion

  // #region --- External Function Setters ---

  /** Setter for function which calculates the dimension percentage. */
  setMathDimPercentFunction(
    func: (subsetSize: number, totalSize: number) => number
  ): void;

  /** Setter for function which removes node from the tree visualization. */
  setRemoveNodeFunction(func: (nodeId: number) => void): void;

  /** Setter for function which triggers save of the current visualization status of the tree visualization. */
  setSaveVisualizationStatusFunction(func: () => void): void;

  // #endregion

  // #region --- Cardinality ---

  /** Returns total cardinality of the graph or -1 if not available */
  getTotalCardinality(): number;

  // #endregion

  // #region --- Node/Edge Selection ---

  /**
   * Select a node by its ID.
   */
  selectNode(nodeId: string): void;

  /**
   * Selects root node of the bifurcation tree if exists.
   */
  selectRootNode(): void;

  /**
   * Triggers all necessary events to update UI after graph update.
   * Selects/Unselects nodes as needed.
   * If targetId is provided, it will be selected.
   */
  refreshSelection(targetId?: string): void;

  // #endregion

  // #region --- Node Getters ---

  getParentNode(targetId: string): any;
  getChildNode(sourceId: string, positive: boolean): any;
  getSiblingNode(targetId: string): any;
  getSelectedNodeId(): any;
  getSelectedNodeTreeData(): any;
  getNodeType(nodeId: string): any;
  /** Returns necessary conditions to reach a node. */
  getNodeNecessaryConditions(nodeId: number): NodeNecessaryConditions;

  // #endregion

  // #region --- Ensure/Remove Nodes/Edges ---

  /**
   * Ensures a node exists in the cytoscape graph.
   *
   * @param treeData - The data for the node to ensure in the graph.
   * @returns An `Ok` result with true if it exists or was successfully added,
   * or an `Err` result with an error message if there was an issue.
   */
  ensureNode(treeData: NodeDataBE): Result<boolean>;

  /**
   * Ensures an edge exists between two nodes in the cytoscape graph.
   *
   * @param sourceId - The ID of the source node.
   * @param targetId - The ID of the target node.
   * @param positive - A boolean indicating whether the edge is positive.
   * @returns An `Ok` result with `true` if the edge was successfully ensured,
   * or an `Err` result with an error message if there was an issue.
   */
  ensureEdge(
    sourceId: number | undefined,
    targetId: number | undefined,
    positive: boolean
  ): Result<boolean>;

  /** Removes all nodes from the CytoscapeABE. */
  removeAll(): void;

  /** Removes node from CytoscapeABE. */
  removeNode(nodeId: string): void;

  // #endregion

  // #region --- Mass Management ---

  setMassEnabled(): void;
  setMassDisabled(): void;

  // #endregion

  // #region --- Tree Layout Management ---

  /** Fit the whole Bifurcation Tree into view.
   *  @param customPadding (number | undefined) - optional parameter which overrides the padding preset by the fit function with custom padding. It is represented as number of pixels added by padding.
   */
  fit(customPadding?: number): void;

  /** Set zoom level of the model visualization
   *  @param zoomLevel (number) number which signifies how much zoomed the model should be.
   */
  setZoom(zoomLevel: number): void;

  /**  Applies the tree layout to the Cytoscape instance */
  applyTreeLayout(fit?: boolean, animate?: boolean): void;

  /** Resets the tree layout to the initial state */
  resetTreeLayout(): void;

  /**  Gets the current layout options for the switchable options in CytoscapeABE. */
  getSwitchLayoutOptions(): VisualOptionsSwitchableABE;

  /** Sets the nodes to snap to their respective layers.
   *  @param snap - (boolean) Whether to snap nodes to layers or un-snap them.
   */
  toggleSnapNodesToLayers(): void;

  /** Animates layout changes in the Cytoscape instance.
   *  @param animate - (boolean) Whether to animate layout changes or not.
   */
  toggleAnimateLayoutChanges(): void;

  /** Toggles the positive class on the left side of the bifurcation tree. */
  togglePositiveOnLeft(): void;

  // #endregion

  // #region --- Node/Edge moving ---

  moveNode(nodeId: string, steps: number): void;

  // #endregion

  // #region --- Visualization Status ---

  /** Gets the current visualization status. */
  getVisualizationStatus(): VisualizationStatus;

  /** Loads the visualization status into the visualization. */
  loadVisualizationStatus(status: VisualizationStatus): void;

  // #endregion
}
