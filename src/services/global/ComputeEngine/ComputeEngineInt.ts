import type {
  AttractorData,
  ComputationStatus,
  ControlPreComputationInfo,
  Decisions,
  DecisionsTSSD,
  ModelObject,
  NodeDataBE,
  NodeDataTSSD,
  StabilityAnalysisModes,
  StabilityAnalysisVariable,
  UpdateFunctionStatus,
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

  /** Open or close connection connection, depending on current status.
   *  @param succesfulConnectionCallback (() => void | undefined) function which runs after succesful connection to compute engine.
   *  @param pingCallback ( ((
      warning: string | undefined,
      error: string | undefined,
      engineStatus: string | undefined,
      compStatus: ComputationStatus | undefined,
      color: string | undefined
    ) => void) | undefined ) function which runs after each succesful ping to the currently connected compute engine
      @returns void
   */
  toggleConnection(
    succesfulConnectionCallback?: () => void,
    pingCallback?: (
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

  /** Checks if update function is valid.
   */
  validateUpdateFunction(
    variableId: number,
    updateFunctionFragment: string,
    callback?: (
      variableId: number,
      response: UpdateFunctionStatus | undefined
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

  // #region --- Trap Space Succession Diagram ---

  /** Gets the trap space succession diagram for a specific model. */
  getTrapSpaceSuccessionDiagram(
    model: string,
    callback: (
      error: string | undefined,
      nodes: NodeDataTSSD[] | undefined
    ) => void
  ): void;

  /** Gets decisions for a specific node in the Trap Space Succession Diagram.
   *  @param nodeId - (number) The ID of the node to fetch decisions for.
   *  @param callback - (function) Function which takes a list of decisions and sets them in the Trap Space Succession Diagram page. This function is used to set the available decisions for a node after they are fetched.
   */
  getDecisionsTSSD(
    nodeId: number,
    callback: (
      error: string | undefined,
      decisions: DecisionsTSSD | undefined
    ) => void
  ): void;

  /** Extends trap space succession diagram with a new node defined by decisionId.
   * The new node is a child of the node with id = nodeId. The new node is inserted into the succession diagram using the insertSuccessionDiagramFunction.
   * @param nodeId - (number) ID of the parent node from which the new node will be generated by applying the decision with ID = decisionId.
   * @param decisionId - (number) ID of the decision which will be applied to generate a new node in the trap space succession diagram.
   * @param callback - (function) Function which takes a list of NodeDataTSSD and inserts them into the succession diagram visualization. This function is used to insert the new node into the visualization after it is generated.
   */
  makeDecisionTSSD(
    nodeId: number,
    decisionId: number,
    callback: (
      error: string | undefined,
      nodes: NodeDataTSSD[] | undefined
    ) => void
  ): void;

  /** Deletes decision from trap space succession diagram.
   *  @param nodeId - (number) ID of the node from which the decision will be deleted.
   *  @param callback - (function) Function which takes a node and a list of removed node IDs. This function is used to remove the deleted node and its child nodes from the visualization after they are deleted.
   */
  deleteDecisionTSSD(
    nodeId: number,
    callback: (
      error: string | undefined,
      node: NodeDataTSSD | undefined,
      removedNodes: number[]
    ) => void
  ): void;

  // #endregion
}
