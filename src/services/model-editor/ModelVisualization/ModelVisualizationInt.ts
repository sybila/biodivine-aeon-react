import type { Variable } from '../../../types';

/**
 * Interface for model visualization in the ModelEditor page.
 */
export interface ModelVisualizationInt {
  // #region --- Initialization ---

  /** Reference to the container element, where the cytoscape graph is rendered. */
  init(container: HTMLElement): void;

  // #endregion

  // #region --- Node Management ---

  /** Add a new node to the graph at the given position. */
  addNode(id: number, name: string, position?: [number, number]): void;

  /** Remove the node with the given ID from the graph. */
  removeNode(id: number): void;

  /** Change name of the node to the given value. */
  renameNode(id: number, newName: string): void;

  /** Set the given node as selected. */
  selectNode(id: number): void;

  /** Set the given node as not selected. */
  unselectNode(id: number): void;

  /** Return an id of the selected node, or undefined if nothing is selected. */
  getSelectedNodeId(): string | undefined;

  /** Allow to externally set which node is hovered - make sure to unset it as well. */
  hoverNode(id: number, isHover: boolean): void;

  /** Get the position of the node with the given id, or undefined if the node does not exist. */
  getNodePosition(id: number): [number, number] | undefined;

  // #endregion

  // #region --- Edge Management ---

  /** Allow to externally set which edge is hovered - just make sure to unset it later. */
  hoverEdge(regulatorId: number, targetId: number, isHover: boolean): void;

  // #endregion

  // #region --- Global Select ---

  /** Unselects all items selected in the cytoscape editor. */
  unselectAll(): void;

  // #endregion

  // #region --- Regulation Management ---

  /** Remove regulation between the two specified nodes. */
  removeRegulation(regulatorId: number, targetId: number): void;

  /** Ensure that the graph contains edge which corresponds to the provided regulation. */
  ensureRegulation(regulation: any): void;

  /** Return a { regulator, target } object that describes currently selected regulation,
   * or undefined if nothing is selected. */
  getSelectedRegulationPair():
    | { regulator: string; target: string }
    | undefined;

  // #endregion

  // #region --- Graph Actions ---

  /** Zoom and pan the editor to ensure that given node is visible. */
  showNode(id: number): void;

  /** Pan and zoom the graph to show the whole model.
   *  @param variables (Variable[]) If provided, fit only the given nodes instead of the whole graph.
   */
  fit(variables?: Variable[]): void;

  /** Set zoom level of the model visualization
   *  @param zoomLevel (number) number which signifies how much zoomed the model should be.
   */
  setZoom(zoomLevel: number): void;

  // #endregion

  // #region --- Node Layouts ---

  /** Layout the nodes in a organic manner, using the `cose` algorithm. */
  layoutCose(): void;

  /** Layout the nodes in a hierarchical manner, using the `dagre` algorithm.
   *  @param layoutOnlySelected (boolean) = optional parameter which if is set to true runs the layout algorithm only over the subset of the model, else runs it over the whole model.
   *                                        If not specified set to false (layout the whole model).
   */
  layoutDagre(layoutOnlySelected?: boolean): void;

  /** Layout the nodes in a phenotype-aware manner.
   *  @param layoutOnlySelected (boolean) = optional parameter which if is set to true runs the layout algorithm only over the subset of the model, else runs it over the whole model.
   *                                        If not specified set to false (layout the whole model).
   */
  layoutPhenotype(layoutOnlySelected?: boolean): void;

  /** Layout the nodes in a control-enabled manner.
   *  @param layoutOnlySelected (boolean) = optional parameter which if is set to true runs the layout algorithm only over the subset of the model, else runs it over the whole model.
   *                                        If not specified set to false (layout the whole model).
   */
  layoutControlEnabled(layoutOnlySelected?: boolean): void;

  // #endregion

  // #region --- Node Highlighting ---

  /** Changes colour of all nodes which are set as control-enabled. */
  highlightControlEnabled(inputNodes?: Array<[number, any]> | null): void;

  /** Returns true if the control-enabled highlighting is currently active. */
  isControlEnabledHighlighted(): boolean;

  /** Changes borders of all nodes which are in the phenotype. */
  highlightPhenotype(inputNodes?: Array<[number, any]> | null): void;

  /** Returns true if the phenotype highlighting is currently active. */
  isPhenotypeHighlighted(): boolean;

  // #endregion
}
