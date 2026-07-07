import type {
  AttractorResults,
  ComputationModes,
  ComputationStatus,
  ControlResults,
  DecisionsTSSD,
  NodeDataTSSD,
  StabilityAnalysisModes,
  UpdateFunctionStatus,
} from '../../../types';
import type { AttractorBifurcationExplorerInt } from '../../attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { AttractorVisualizerInt } from '../../attractor-visualizer/AttractorVisualizerInt';
import type { LiveModelInt } from '../LiveModel/LiveModelInt';

/**
 * Interface for ComputationManagerClass. All public functions are included with their documentation and types.
 * Types are kept as in the class, even if there are syntax errors due to dependencies.
 */
export interface ComputationManagerInt {
  // #region --- LiveModel Reference ---

  /** Setter for the LiveModel reference */
  setLiveModel(liveModel: LiveModelInt): void;

  // #endregion

  // #region --- External Compute Engine Adress Setters/Getters ---

  /** Sets the URL of the compute engine */
  setComputeEngineAddress(address: string): void;

  /** Returns the URL of the compute engine */
  getComputeEngineAddress(): string | undefined;

  // #endregion

  // #region --- Control Computation Parameters Setters/Getters ---

  /** Sets maximum number of perturbations */
  setMaxNumberOfResults(max: number | undefined): void;

  /** Returns maximum number of perturbations */
  getMaxNumberOfResults(): number;

  /** Resets the maximum size of a perturbation.
   * After calling this, the next call to getMaxSize() will set it to the current number of Control-Enabled variables in the model.
   */
  resetMaxSize(): void;

  /** Sets maximum size of a perturbation */
  setMaxSize(max: number | undefined): void;

  /** Returns maximum size of a perturbation */
  getMaxSize(): number;

  /** Sets minimum robustness for perturbations in %*/
  setMinRobustness(min: number | undefined): void;

  /** Returns minimum robustness for perturbations */
  getMinRobustness(): number;

  // #endregion

  // #region --- Connection Manager ---

  isComputeEngineConnected(): boolean;

  toggleConnection(): void;

  computationIsRunning(): boolean;

  // #endregion

  // #region --- Computation Status ---

  setComputationStatus(
    warning: string | undefined,
    error: string | undefined,
    computeEngineStatus?: string | undefined,
    computationStatus?: ComputationStatus | undefined,
    color?: string | undefined
  ): void;

  // #endregion

  // #region --- Update Functions ---

  /** Validates the update function fragment for the specified variable and updates
   * the validation status using the provided callback.
   *
   * @param variableId The unique identifier of the variable whose update function
   * is being validated.
   * @param updateFunctionFragment The fragment of the model which contains all the data required for the validation of the function.
   * @param setUpdateFunctionStatus Callback which sets the status of update function (for example this.updateFunctionStore.getState().setUpdateFunctionStatus())
   */
  validateUpdateFunction(
    variableId: number,
    updateFunctionFragment: string,
    setUpdateFunctionStatus: (status: UpdateFunctionStatus) => void
  ): void;

  // #endregion

  // #region --- Open Witness ---

  /** Gets the witness for one result from the attractor analysis and opens new witness tab */
  openWitnessAttractorAnalysis(behaviorString: string): void;

  /** Get witness for leaf node in the bifurcation explorer and opens new witness tab */
  openWitnessBifurcationExplorer(nodeId: number): void;

  /** Get witness for stability analysis and opens new witness tab */
  openWitnessStabilityAnalysis(
    nodeId: number,
    variableName: string,
    behavior: string,
    vector: string[]
  ): void;

  // #endregion

  // #region --- Attractor Analysis Computation ---

  startAttractorAnalysis(): void;

  // #endregion

  // #region --- Attractor Bifurcation Explorer ---

  /** Fetches the bifurcation tree from the compute engine.
   * @param fit - (boolean) Determines whether to fit the tree in the view of AttractorBifurcationExplorer.
   * @param animate - (boolean) Determines whether the bifurcation tree should be loaded with animation (true) or without (false).
   * @param attractorBifurcationExplorerRef - (AttractorBifurcationExplorerInt) Reference to the AttractorBifurcationExplorer, used to insert the tree data after fetching.
   */
  getBifurcationTree(
    fit: boolean,
    animate: boolean,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void;

  /** Sets the precision of the bifurcation tree.
   *  Precision is % with up to two decimal places
   */
  setBifurcationTreePrecision(
    precision: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void;

  /** Automatically expands the bifurcation tree at the given node and depth. */
  autoExpandBifurcationTree(
    nodeId: number,
    depth: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void;

  /** Deletes a bifurcation decision by node ID. */
  deleteBifurcationDecision(
    nodeId: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void;

  /** Fetches the stability data for a specific node and behaviour.
   * @param nodeId - (number) The ID of the node to fetch stability data for.
   * @param behaviour - (StabilityAnalysisModes) The behaviour mode to use for fetching stability data.
   */
  getStabilityData(nodeId: number, behaviour: StabilityAnalysisModes): void;

  /** Fetches the decisions for a specific node. */
  getDecisions(
    nodeId: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void;

  makeDecision(
    nodeId: number,
    decisionId: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void;

  // #endregion

  // #region --- Attractor Visualizer ---

  /** Fetches an attractor by its behavior string. Used by the results window.*/
  getAttractorByBehavior(
    behavior: string,
    attractorVisualizerRef: AttractorVisualizerInt
  ): void;

  /** Fetches an attractor for node in the AttractorBifurcationExplorer */
  getBifurcationExplorerAttractor(
    nodeId: number,
    attractorVisualizerRef: AttractorVisualizerInt
  ): void;

  getStabilityAnalysisAttractor(
    nodeId: number,
    variableName: string,
    behavior: string,
    vector: string[],
    attractorVisualizerRef: AttractorVisualizerInt
  ): void;

  // #endregion

  // #region --- Control Computation ---

  startControlComputation(): void;

  // #endregion

  // #region --- Trap Space Succession Diagram ---

  /** Fetches succession diagram for the  */
  getTrapSpaceSuccessionDiagram(
    insertSuccessionDiagramFunction: (nodes: NodeDataTSSD[]) => void
  ): void;

  getDecisionsTSSD(
    nodeId: number,
    setDecisionsFunction: (decisions: DecisionsTSSD) => void
  ): void;

  /** Extends trap space succession diagram with a new node defined by decisionId.
   * The new node is a child of the node with id = nodeId. The new node is inserted into the succession diagram using the insertSuccessionDiagramFunction.
   * @param nodeId - (number) ID of the parent node from which the new node will be generated by applying the decision with ID = decisionId.
   * @param decisionId - (number) ID of the decision which will be applied to generate a new node in the trap space succession diagram.
   * @param insertSuccessionDiagramFunction - (function) Function which takes a list of NodeDataTSSD and inserts them into the succession diagram visualization. This function is used to insert the new node into the visualization after it is generated.
   */
  makeDecisionTSSD(
    nodeId: number,
    decisionId: number,
    insertSuccessionDiagramFunction: (nodes: NodeDataTSSD[]) => void
  ): void;

  /** Deletes decision from trap space succession diagram.
   *  @param nodeId - (number) ID of the node from which the decision will be deleted.
   *  @param removeNodesFromVisualizationFunction - (function) Function which takes a node and a list of removed node IDs. This function is used to remove the deleted node and its child nodes from the visualization after they are deleted.
   */
  deleteDecisionTSSD(
    nodeId: number,
    removeNodesFromVisualizationFunction: (
      node: NodeDataTSSD,
      removedNodes: number[]
    ) => void
  ): void;

  // #endregion

  // #region --- Results ---

  setResults(
    warning: string | undefined,
    error: string | undefined,
    type: ComputationModes | undefined,
    results: AttractorResults | ControlResults | undefined
  ): void;

  // #endregion
}
