import type { Result } from '../../../types/result';
import type {
  NodesWithParentInfoTSSD,
  NodeTypeTSSD,
  NodeWithType,
  VisualizationStatus,
  VisualOptionsSwitchableTSSD,
} from '../../../types/types';

export interface TrapSpaceSDVisualizationInt {
  // #region --- Initialization ---

  /** Initializes the visualization.
   *  @param container (HTMLElement) - html container in which the canvas will be rendered
   */
  init(container: HTMLElement): void;

  // #endregion

  // #region --- External Function Setters ---

  /** Setter for function which removes node from the succession diagram visualization. */
  setRemoveNodeFunction(
    func: (removedNodeId: number, removedNodeType: NodeTypeTSSD) => void
  ): void;

  // #endregion

  // #region --- Node/Edge Selection ---

  /** Refreshes selection in the visualization canvas. If targetInfo is undefined reselects already selected nodes, else unselects all and selects node specified by targetInfo.
   *  @param targetInfo (NodeWithType?) - Optional parameter which specifies which node should be selected
   */
  refreshSelection(targetInfo?: NodeWithType): void;

  /** Selects root node of the visualized diagram. */
  selectRootNode(): void;

  // #endregion

  // #region --- Node Getters ---

  /**
   * Retrieves information for a specific node.
   *
   * @param nodeId   - The numeric identifier of the node.
   * @param nodeType - The type of the node (`NodeTypeTSSD`).
   * @returns An object containing the node’s information (`NodeWithType`) if the node exists,
   *          otherwise `undefined`.
   */
  getNodeInfo(nodeId: number, nodeType: NodeTypeTSSD): NodeWithType | undefined;

  /** Returns the children of a specific node.
   *  @param sourceId (number) - The ID of the parent node for which you want its children.
   *  @param sourceType (NodeTypeTSSD) - The type of the parent node (e.g., "stable-motif").
   *  @returns Returns a Result object:
   *            Success<NodesWithParentInfoTSSD> -> If everything was fine, this contains a success result with the list of child nodes.
   *            Error    -> If there was an issue, this contains the error message as a string.
   */
  getChildNodes(
    sourceId: number,
    sourceType: NodeTypeTSSD
  ): Result<NodesWithParentInfoTSSD>;

  // #endregion

  // #region --- Ensure/Remove Nodes/Edges ---

  /** Checks if node exists, if it doesn't adds it into visualization.
   *  @param node (NodeWithType) - node who's existence should be ensured
   *  @returns returns Result object:
   *            Success<boolean> -> true if the node didn't exist and had to be added, if node existed then Success object contains false |
   *            Error -> if something failed, function returns Error object containing error message string
   */
  ensureNode(node: NodeWithType): Result<boolean>;

  /** Checks if edge exists, if it doesn't adds it into visualization.
   *  @param sourceId (number) - id of the source node
   *  @param targetId (number) - id of the target node
   *  @returns returns Result object:
   *            Success<boolean> -> true if the edge didn't exist and had to be added, if edge existed then Success object contains false |
   *            Error -> if something failed, function returns Error object containing error message string
   */
  ensureEdge(sourceId: number, targetId: number): Result<boolean>;

  /** Removes node with nodeId and nodeType.
   * @returns returns Result object:
   *            Success<undefined> -> if operation succeeded returns Success object containing undefined
   *            Error -> if something failed, function returns Error object containing error message string
   */
  removeNode(nodeId: number, nodeType: NodeTypeTSSD): Result<undefined>;

  /** Removes all elements from the visualization. */
  removeAll(): void;

  // #endregion

  // #region --- Tree Layout Management ---

  /** Layouts nodes in the decision diagram into tree.
   *  @param fit (boolean?) - optional parameter, if true function fits tree to the screen size when it finishes layouting
   *  @param animate (boolean?) - optional parameter, if true function animates the layouting process
   */
  applyTreeLayout(fit?: boolean, animate?: boolean): void;

  /** Resets current layout. For example when you move node to different spot, by appliing this function this node returns to the original layout spot. */
  resetTreeLayout(): void;

  /** Fits tree to the size of viewport. */
  fit(): void;

  /** Sets current zoom level of the canvas.
   *  @param zoomLevel (number) - zoom level to set the canvas to
   */
  setZoom(zoomLevel: number): void;

  /**
   * Returns the tree layout to its initial configuration by snapping all nodes back to their original positions.
   */
  getSetVisualOptions(): VisualOptionsSwitchableTSSD;

  /**
   * Toggles whether nodes snap visually to their respective layers in the view.
   */
  toggleSnapNodesToLayers(): void;

  /** Sets whether layout changes should trigger an animation. */
  toggleAnimateLayoutChanges(): void;

  // #endregion

  // #region --- Visualization Status ---

  /** Gets current status of the visualization (eg. zoom level) */
  getVisualizationStatus(): VisualizationStatus;

  /** Loads visualization status defined by status parameter and applies it to the visualization.
   *  @param status (VisualizationStatus) - visualization status to be loaded
   */
  loadVisualizationStatus(status: VisualizationStatus): void;

  // #endregion
}
