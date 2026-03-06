import type {
  AttractorData,
  ComputationStatus,
  ControlPreComputationInfo,
  Decisions,
  ModelObject,
  NodeDataBE,
  StabilityAnalysisModes,
  StabilityAnalysisVariable,
} from '../../../types';

/**
 * Interface for ComputeEngine class used inside ComputationManager. Provides direct communication with the compute engine.
 */
export interface ComputeEngineInt {
  // #region --- Get Connection Status ---

  isConnected(): boolean;

  // #endregion

  // #region --- Address Setters/Getters ---

  setEngineAddress(newAddress: string): void;

  getEngineAddress(): string;

  // #endregion

  // #region --- Connection Management ---

  /** Open or close connection connection, depending on current status. */
  toggleConnection(
    callback?: (
      warning: string | undefined,
      error: string | undefined,
      engineStatus: string | undefined,
      compStatus: ComputationStatus | undefined,
      color: string | undefined
    ) => void
  ): void;

  // #endregion

  // #region --- Computation Status ---

  isWaitingForResults(): boolean;

  computationCanStart(): void;

  // #endregion

  // #region --- Get Witness ---

  getWitnessAttractorAnalysis(
    behaviorString: string,
    callback: (
      error: string | undefined,
      response: ModelObject | undefined
    ) => void
  ): void;

  getWitnessBifurcationExplorer(
    nodeId: number,
    callback: (
      error: string | undefined,
      response: ModelObject | undefined
    ) => void
  ): void;

  getWitnessStabilityAnalysis(
    nodeId: number,
    variableName: string,
    behavior: string,
    vector: string[],
    callback: (
      error: string | undefined,
      response: ModelObject | undefined
    ) => void
  ): void;

  // #endregion

  // #region --- Attractor Analysis Computation ---

  startAttractorAnalysis(
    model: string,
    callback?: (
      warning: string | undefined,
      error: string | undefined,
      engineStatus: string | undefined,
      compStatus: ComputationStatus | undefined,
      color: string | undefined
    ) => void
  ): void;

  cancelAttractorComputation(): void;

  // #endregion

  // #region --- Bifurcation Tree ---

  /** Fetches the bifurcation tree from the compute engine. */
  getBifurcationTree(
    callback: (
      error: string | undefined,
      nodes: NodeDataBE[] | undefined
    ) => void
  ): void;

  /** Sets the precision of the bifurcation tree in the compute engine.
   *  Precision is % with up to two decimal places
   */
  setBifurcationTreePrecision(
    precision: number,
    callback: (error: string | undefined) => void
  ): void;

  /** Automatically expands the bifurcation tree at the given node and depth. */
  autoExpandBifurcationTree(
    nodeId: number,
    depth: number,
    callback: (
      error: string | undefined,
      nodes: NodeDataBE[] | undefined
    ) => void
  ): void;

  getStabilityData(
    nodeId: number,
    behavior: StabilityAnalysisModes,
    callback: (
      error: string | undefined,
      behavior: StabilityAnalysisModes,
      data: Array<StabilityAnalysisVariable> | undefined
    ) => void
  ): void;

  /** Deletes a bifurcation decision from the compute engine. */
  deleteBifurcationDecision(
    nodeId: number,
    callback: (
      error: string | undefined,
      node: NodeDataBE | undefined,
      removedNodes: number[]
    ) => void
  ): void;

  /** Gets decisions for a specific node from the compute engine. */
  getDecisions(
    nodeId: number,
    callback: (
      error: string | undefined,
      decisions: Decisions | undefined
    ) => void
  ): void;

  /** Makes a decision for a specific node in the compute engine. */
  makeDecision(
    nodeId: number,
    decisionId: number,
    callback: (
      error: string | undefined,
      nodes: NodeDataBE[] | undefined
    ) => void
  ): void;

  // #endregion

  // #region --- Attractor Visualizer ---

  /** Gets the attractor for a specific behavior. */
  getAttractorByBehavior(
    behavior: string,
    callback: (
      error: string | undefined,
      attractorData: AttractorData | undefined
    ) => void
  ): void;

  /** Gets the attractor for a specific node in the AttractorBifurcationExplorer. */
  getBifurcationExplorerAttractor(
    nodeId: number,
    callback: (
      error: string | undefined,
      attractorData: AttractorData | undefined
    ) => void
  ): void;

  getStabilityAnalysisAttractor(
    nodeId: number,
    variableName: string,
    behavior: string,
    vector: string[],
    callback: (
      error: string | undefined,
      attractorData: AttractorData | undefined
    ) => void
  ): void;

  // #endregion

  // #region --- Control Computation ---

  startControlComputation(
    model: string,
    oscillation: string,
    minRobustness: number,
    maxSize: number,
    maxNumberResults: number,
    preComputationInfo: ControlPreComputationInfo,
    callback?: (
      warning: string | undefined,
      error: string | undefined,
      engineStatus: string | undefined,
      compStatus: ComputationStatus | undefined,
      color: string | undefined
    ) => void
  ): void;

  // #endregion
}
