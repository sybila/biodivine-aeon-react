import type {
  Decisions,
  NodeDataBE,
  NodeNecessaryConditions,
  StabilityAnalysisModes,
  VisualOptionsSwitchableABE,
} from '../../../types';

/**
 * Interface which defines service responsible for managing the attractor bifurcation explorer page.
 */
export interface AttractorBifurcationExplorerInt {
  // #region --- Initialization ---

  init(container: HTMLElement): void;

  // #endregion

  // #region --- Math helpers ---

  /** Calculates the logarithmic dimension percentage of a subset relative to the total set. */
  mathDimPercent(subsetSize: number, total: number): number;

  /** Calculates the linear percentage of a subset relative to the total set. */
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

  /** Automatically expands the bifurcation tree from the selected node. */
  autoExpandBifurcationTreeFromSelected(depth: number, nodeId?: number): void;

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

  moveNode(nodeId: string, steps: number): void;

  // #endregion

  // #region --- Stability Analysis ---

  /** Gets the stability data for a specific node. */
  getStabilityData(nodeId: number, behavior: StabilityAnalysisModes): void;

  // #endregion

  // #region --- Make Decision ---

  /** Formats behavior classes inside decisions for display. */
  formatClassesDecisions(decisions: Decisions): Decisions;

  /** Gets the decisions for the selected node. */
  getDecisions(nodeId: number): void;

  /** Make decision for a specific node. */
  makeDecision(nodeId: number, decisionId: number): void;

  // #endregion

  // #region --- Visualization Status ---

  /** Saves the current status of the bifurcation tree visualization */
  saveVisualizationStatus(): void;

  /** Restores state of the bifurcation tree visualization (pan, zoom, selected node ...) */
  restoreVisualizationState(): void;

  // #endregion

  // #region --- Visual Options ---

  /** Gets last precision set in the VisualOptions of AttractorExplorer */
  getLastPrecision(): number;

  /** Gets the current state of the switchable options in the visual options tab */
  getSwitchableOptionsState(): VisualOptionsSwitchableABE;

  /** Set precision for the bifurcation tree. */
  setPrecision(precision: number): void;

  /** Fits the bifurcation tree to the viewport. */
  fitTree(): void;

  /** Resets the layout of the bifurcation tree. */
  resetTreeLayout(): void;

  /** Sets the nodes to snap to their respective layers. */
  toggleSnapNodesToLayers(): void;

  /** Animates layout changes in the Cytoscape instance. */
  toggleAnimateLayoutChanges(): void;

  /** Toggles the positive class on the left side of the bifurcation tree. */
  togglePositiveOnLeft(): void;

  // #endregion

  // #region --- Open witness/attractor ---

  /** Opens the witness tab for a specific leaf node. */
  openLeafNodeWitness(nodeId: number): void;

  /** Opens the witness tab for a specific stability analysis. */
  openStabilityWitness(
    nodeId: number | null,
    variable: string,
    behaviour: string,
    vector: Array<string>
  ): void;

  /** Opens the attractor visualizer for a specific leaf node. */
  openLeafNodeAttractor(nodeId: number): void;

  /** Opens the attractor visualizer for a specific stability analysis. */
  openStabilityAttractor(
    nodeId: number | null,
    variableName: string,
    behavior: StabilityAnalysisModes,
    vector: string[]
  ): void;

  // #endregion

  // #region --- Reset ---

  clear(): void;

  // #endregion
}
