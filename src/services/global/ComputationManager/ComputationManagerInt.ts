import type {
  AttractorResults,
  ComputationModes,
  ComputationStatus,
  ControlResults,
  StabilityAnalysisModes,
} from '../../../types';
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

  // #region --- Computation Mode Setters/Getters ---

  /** Returns currently set computation mode */
  getComputationMode(): ComputationModes;

  /** Sets computation mode */
  setComputationMode(mode: ComputationModes): void;

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

  /** Validates the update function for a specific variable and sets the status in the store */
  validateUpdateFunction(
    variableId: number,
    updateFunctionFragment: string
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
   */
  getBifurcationTree(fit: boolean): void;

  /** Sets the precision of the bifurcation tree.
   *  Precision is % with up to two decimal places
   */
  setBifurcationTreePrecision(precision: number): void;

  /** Automatically expands the bifurcation tree at the given node and depth. */
  autoExpandBifurcationTree(nodeId: number, depth: number): void;

  /** Deletes a bifurcation decision by node ID. */
  deleteBifurcationDecision(nodeId: number): void;

  /** Fetches the stability data for a specific node and behaviour.
   * @param nodeId - (number) The ID of the node to fetch stability data for.
   * @param behaviour - (StabilityAnalysisModes) The behaviour mode to use for fetching stability data.
   */
  getStabilityData(nodeId: number, behaviour: StabilityAnalysisModes): void;

  /** Fetches the decisions for a specific node. */
  getDecisions(nodeId: number): void;

  makeDecision(nodeId: number, decisionId: number): void;

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

  // #region --- Results ---

  setResults(
    warning: string | undefined,
    error: string | undefined,
    type: ComputationModes | undefined,
    results: AttractorResults | ControlResults | undefined
  ): void;

  // #endregion
}
