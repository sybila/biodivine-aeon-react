// #region --- AttractorBifurcationTreeVisualizationInt ---
import type {
  NodeDataBE,
  NodeNecessaryConditions,
  VisualOptionsSwitchableABE,
} from '../../../types';

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

  /** Checks if node exists, if it doesn't, creates it, else updates its data. */
  ensureNode(treeData: NodeDataBE): any;

  /** Ensures that an edge exists between two nodes. */
  ensureEdge(
    sourceId: number | undefined,
    targetId: number | undefined,
    positive: boolean
  ): void;

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

  /** Fit the whole Bifurcation Tree into view */
  fit(): void;

  /**  Applies the tree layout to the Cytoscape instance */
  applyTreeLayout(fit?: boolean): void;

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
}
// #endregion
