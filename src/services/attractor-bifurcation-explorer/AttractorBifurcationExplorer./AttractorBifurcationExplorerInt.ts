import type { Result } from '../../../types/result';
import type {
  Decisions,
  NodeDataBE,
  NodeNecessaryConditions,
  StabilityAnalysisModes,
  VisualOptionsSwitchableABE,
} from '../../../types/types';

/**
 * Interface which defines service responsible for managing the attractor bifurcation explorer page.
 */
export interface AttractorBifurcationExplorerInt {
  // #region --- Initialization ---

  init(container: HTMLElement): void;

  // #endregion

  // #region --- Math helpers ---

  /** Calculates the logarithmic dimension percentage of a subset relative to the total set.
   * The result is computed as:
   *   percent = Math.round(((Math.log2(cardinality) + 1) / (Math.log2(total) + 1)) * 100)
   * This reflects the relative "dimension" (logarithmic scale) of the subset compared to the whole,
   * which is useful for visualizing exponential growth or combinatorial complexity.
   *
   * @param subsetSize The size of the subset.
   * @param total The size of the total set.
   * @return The dimension percentage (0-100) of the subset relative to the total.
   */
  mathDimPercent(subsetSize: number, total: number): number;

  /** Calculates the linear percentage of a subset relative to the total set.
   * The result is computed as:
   *   percent = Math.round((cardinality / total) * 100)
   * This reflects the direct ratio of the subset size to the total size,
   * expressed as a percentage (0-100).
   *
   * @param subsetSize The size of the subset.
   * @param total The size of the total set.
   * @return The percentage (0-100) of the subset relative to the total.
   */
  mathPercent(subsetSize: number, total: number): number;

  // #endregion

  // #region --- Cardinality ---

  /** Returns total cardinality of the graph or -1 if not available */
  getTotalCardinality(): number;

  // #endregion

  // #region --- Bifurcation Tree Management ---

  /** Opens the bifurcation tree, loading it if necessary. */
  openBifurcationTree(): void;

  /** Inserts a bifurcation tree into this.cytoscape.
   *  @param nodeList - (NodeDataBE[]) List of nodes to insert into the tree.
   *  @param fit - (boolean) Determines whether to fit the tree in the view of AttractorBifurcationExplorer after inserting.
   *  @param animate - (boolean) Determines whether to apply the tree layout with animation (true) or without (false) after inserting.
   *  @param clearCytoscape - (boolean, optional) If true, clears the existing Cytoscape instance before inserting the new tree. Defaults to false.
   */
  insertBifurcationTree(
    nodeList: NodeDataBE[],
    fit: boolean,
    animate: boolean,
    clearCytoscape?: boolean
  ): void;

  /** Loads the bifurcation tree from the compute engine and inserts it into the this.cytoscape.
   *  If fit is true, applies the tree layout after loading.
   *  If animate is true, applies the tree layout with animation. Otherwise, applies it instantly.
   */
  loadBifurcationTree(fit: boolean, animate: boolean): void;

  /** Automatically expands the bifurcation tree from the selected node.
   *  If nodeId is not provided, it uses the currently selected node.
   * @param nodeId - (number?) The ID of the node to expand from.
   * @param depth - (number) The depth to expand to.
   */
  autoExpandBifurcationTreeFromSelected(
    depth: number,
    nodeId?: number
  ): Result<boolean>;

  // #endregion

  // #region --- Node Operations ---

  /** Refreshes the selection in the AttractorBifurcationExplorer. */
  refreshSelection(): void;

  /** Removes a node from Cytoscape. Should be used only after calling of the removeNode function.*/
  removeFromCytoscape(
    node: NodeDataBE | undefined,
    removedNodes: number[]
  ): void;

  /** Removes a node and its child nodes from the AttractorBifurcationExplorer. */
  removeNode(nodeId: number): void;

  /** Gets the necessary conditions for a specific node. */
  getNodeNecessaryConditions(nodeId: number): NodeNecessaryConditions;

  /**
   * Moves a node up or down in the layout by a specified number of steps.
   *
   * @param nodeId - The unique identifier of the node to move.
   * @param steps - The number of steps to move the node. Positive values move the node down, negative values move it up.
   */
  moveNode(nodeId: string, steps: number): void;

  // #endregion

  // #region --- Stability Analysis ---

  /** Gets the stability data for a specific node. */
  getStabilityData(nodeId: number, behavior: StabilityAnalysisModes): void;

  // #endregion

  // #region --- Make Decision ---

  /** Formats behavior classes inside decisions for display.
   * @param decisions - The decisions to format.
   * @returns The formatted decisions.
   */
  formatClassesDecisions(decisions: Decisions): Decisions;

  /** Gets the decisions for the selected node. */
  getDecisions(nodeId: number): void;

  /** Make decision for a specific node. */
  makeDecision(nodeId: number, decisionId: number): void;

  // #endregion

  // #region --- Visualization Status ---

  /** Saves the current status of the bifurcation tree visualization */
  saveVisualizationStatus(): void;

  /**
   * Restores the state of the bifurcation tree visualization (pan, zoom, selected node, etc.).
   *
   * @param selectRootNodeFallback (boolean | undefined) When set to `true`, the visualization will automatically select the root node of the bifurcation tree, if no previously selected node can be restored from the saved state.
   */
  restoreVisualizationState(selectRootNodeFallback?: boolean): void;

  // #endregion

  // #region --- Visual Options ---

  /** Gets last precision set in the VisualOptions of AttractorExplorer */
  getLastPrecision(): number;

  /** Gets the current state of the switchable options in the visual options tab */
  getSwitchableOptionsState(): VisualOptionsSwitchableABE;

  /** Set precision for the bifurcation tree. */
  setPrecision(precision: number): void;

  /** Sets the nodes to snap to their respective layers. */
  toggleSnapNodesToLayers(): void;

  /** Animates layout changes in the Cytoscape instance. */
  toggleAnimateLayoutChanges(): void;

  /** Toggles the positive class on the left side of the bifurcation tree. */
  togglePositiveOnLeft(): void;

  // #endregion

  // #region --- Open witness/attractor ---

  /**
   * Opens a witness bifurcation explorer for a specified leaf node.
   *
   * @param nodeId - The ID of the leaf node for which the witness bifurcation explorer should be opened.
   */
  openLeafNodeWitness(nodeId: number): Result<boolean>;

  /**
   * Opens the witness tab for a specific stability analysis.
   * This function takes the following parameters:
   *
   * @param nodeId The ID of the node for which the witness tab is being opened.
   * @param variable The variable for which the witness tab is being opened.
   * @param behaviour The behaviour class for which the witness tab is being opened.
   * @param vector An array of strings representing the witness data.
   */
  openStabilityWitness(
    nodeId: number | null,
    variable: string,
    behaviour: string,
    vector: Array<string>
  ): Result<boolean>;

  /**
   * Opens the attractor visualizer for a specific leaf node.
   *
   * @param nodeId - The unique identifier of the leaf node to open the attractor visualizer for.
   * @returns A Result object indicating whether the operation was successful.
   */
  openLeafNodeAttractor(nodeId: number): Result<boolean>;

  /**
 * Opens the attractor visualizer for a specific stability analysis.
 * 
 * @param nodeId - The unique identifier of the node to open the attractor visualizer for, or null if the attractor visualizer should be opened for a 
global stability analysis.
 * @param variableName - The name of the variable to analyze for stability.
 * @param behavior - The type of stability analysis to perform.
 * @param vector - An array of strings representing the vector components for the stability analysis.
 * @returns A Result object indicating whether the operation was successful.
 */
  openStabilityAttractor(
    nodeId: number | null,
    variableName: string,
    behavior: StabilityAnalysisModes,
    vector: string[]
  ): Result<boolean>;

  // #endregion

  // #region --- Visualization Operations ---

  /** Set zoom level of the model visualization
   *  @param zoomLevel (number) number which signifies how much zoomed the model should be.
   */
  setZoom(zoomLevel: number): void;

  /** Fits the bifurcation tree to the viewport. */
  fitTree(): void;

  /** Resets the layout of the bifurcation tree. */
  resetTreeLayout(): void;

  // #endregion

  // #region --- Reset ---

  clear(): void;

  // #endregion
}
