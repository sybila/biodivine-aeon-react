import type { BifurcationExplorerStatusState } from '../../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import type { ComputeEngineStatusState } from '../../../stores/ComputationManager/ComputeEngineStatusStore/ComputeEngineStatusState';
import type { ResultsStatus } from '../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { ControlStatus } from '../../../stores/LiveModel/ControlStore/ControlStatus';
import type { UpdateFunctionsState } from '../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { TabsState } from '../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type {
  AttractorData,
  AttractorResults,
  ComputationModes,
  ComputationStatus,
  ControlComputationParams,
  ControlResults,
  Decisions,
  DecisionsTSSD,
  ModelObject,
  NodeDataBE,
  NodeDataTSSD,
  StabilityAnalysisModes,
  StabilityAnalysisVariable,
  UpdateFunctionStatus,
} from '../../../types/types';
import type { AttractorBifurcationExplorerInt } from '../../attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { AttractorVisualizerInt } from '../../attractor-visualizer/AttractorVisualizerInt';
import type { ComputeEngineInt } from '../ComputeEngine/ComputeEngineInt';
import ComputeEngine from '../ComputeEngine/External/ComputeEngine';
import type { LiveModelInt } from '../LiveModel/LiveModelInt';
import type { LoadingInt } from '../Loading/LoadingInt';
import type { MessageInt } from '../Message/MessageInt';
import type { TabOperationsInt } from '../Navigation/TabOperationsInt';
import type { ComputationManagerInt } from './ComputationManagerInt';

/**
	Responsible for managing computation inside AEON. (start computation, stop computation, computation parameters...)
*/
class ComputationManager implements ComputationManagerInt {
  // #region --- Properties + Constructor ---

  /** Currently used compute engine comunicator */
  private computeEngine: ComputeEngineInt;

  /** Control computation parameters
   * - minRobustness: Minimum robustness for perturbations in %.
   * - maxSize: Maximum size of a perturbation (max number of perturbed variables).
   * - maxNumberOfResults: Maximum number of perturbations to return. */
  private controlComputationParams: ControlComputationParams = {
    minRobustness: 0.01,
    maxSize: undefined,
    maxNumberOfResults: 1000000,
  };

  /** If not empty, blocks all computations with the given reason. */
  private computationBlockingOperations: Record<string, string> = {};

  /** Reference to the LiveModel service. Needs to be set after creation of the ComputationManager because of circular dependencies. */
  private liveModelServ: LiveModelInt | undefined = undefined;
  private tabOperationsServ: TabOperationsInt;
  private messageServ: MessageInt;
  private loadingServ: LoadingInt;

  private bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>;
  private controlStore: ZustandStore<ControlStatus>;
  private resultsStatusStore: ZustandStore<ResultsStatus>;
  private computeEngineStatusStore: ZustandStore<ComputeEngineStatusState>;
  private updateFunctionsStore: ZustandStore<UpdateFunctionsState>;
  private variablesStore: ZustandStore<VariablesStatus>;
  private tabsStore: ZustandStore<TabsState>;

  constructor(
    tabOperationsServ: TabOperationsInt,
    messageServ: MessageInt,
    loadingServ: LoadingInt,

    bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>,
    controlStore: ZustandStore<ControlStatus>,
    resultsStatusStore: ZustandStore<ResultsStatus>,
    computeEngineStatusStore: ZustandStore<ComputeEngineStatusState>,
    updateFunctionsStore: ZustandStore<UpdateFunctionsState>,
    variablesStore: ZustandStore<VariablesStatus>,
    tabsStore: ZustandStore<TabsState>
  ) {
    this.tabOperationsServ = tabOperationsServ;
    this.messageServ = messageServ;
    this.loadingServ = loadingServ;

    this.bifurcationExplorerStatusStore = bifurcationExplorerStatusStore;
    this.controlStore = controlStore;
    this.resultsStatusStore = resultsStatusStore;
    this.computeEngineStatusStore = computeEngineStatusStore;
    this.updateFunctionsStore = updateFunctionsStore;
    this.variablesStore = variablesStore;
    this.tabsStore = tabsStore;

    this.computeEngine = new ComputeEngine(
      this.setResults.bind(this),
      this.loadingServ
    );
  }

  // #endregion

  // #region --- LiveModel Reference ---

  private getLiveModel(): LiveModelInt | undefined {
    if (!this.liveModelServ) {
      console.error(
        'ComputationManager: LiveModel reference is not set. This should not happen, make sure to set it after creating the ComputationManager.'
      );
      return undefined;
    } else {
      return this.liveModelServ;
    }
  }

  public setLiveModel(liveModel: LiveModelInt) {
    this.liveModelServ = liveModel;
  }

  // #endregion

  // #region --- External Compute Engine Adress Setters/Getters ---

  public setComputeEngineAddress(address: string) {
    if (address && this.computeEngine.setEngineAddress)
      this.computeEngine.setEngineAddress(address);
  }

  public getComputeEngineAddress() {
    if (this.computeEngine.getEngineAddress)
      return this.computeEngine.getEngineAddress();
  }

  // #endregion

  // #region --- Control Computation Parameters Setters/Getters ---

  public setMaxNumberOfResults(max: number | undefined) {
    if (!max) this.controlComputationParams.maxNumberOfResults = 1000000;
    else if (max < 1) this.controlComputationParams.maxNumberOfResults = 1;
    else this.controlComputationParams.maxNumberOfResults = max;
  }

  public getMaxNumberOfResults() {
    return this.controlComputationParams.maxNumberOfResults;
  }

  public resetMaxSize() {
    this.controlComputationParams.maxSize = undefined;
  }

  public setMaxSize(max: number | undefined) {
    const numberOfEnabled = this.controlStore
      .getState()
      .getNumberOfSetControl()[0];

    if (!max || max > numberOfEnabled) {
      this.controlComputationParams.maxSize = numberOfEnabled;
    } else if (max < 1) {
      this.controlComputationParams.maxSize = 1;
    } else {
      this.controlComputationParams.maxSize = max;
    }
  }

  public getMaxSize() {
    if (this.controlComputationParams.maxSize === undefined) {
      this.controlComputationParams.maxSize = this.controlStore
        .getState()
        .getNumberOfSetControl()[0];
    }

    return this.controlComputationParams.maxSize;
  }

  public setMinRobustness(min: number | undefined) {
    if (!min || min < 0) this.controlComputationParams.minRobustness = 0.01;
    else this.controlComputationParams.minRobustness = min;
  }

  public getMinRobustness() {
    return this.controlComputationParams.minRobustness;
  }

  // #endregion

  // #region --- Connection Manager ---

  public isComputeEngineConnected() {
    return this.computeEngine.isConnected();
  }

  /** Callback for pinging of connected compute engine. Used as callback for the toggle connection function.
   *  This callback is also used on every ping, if the connection to the compute engine is succesful.
   */
  private pingCallback(
    warning: string | undefined,
    error: string | undefined,
    engineStatus: string | undefined,
    compStatus: ComputationStatus | undefined,
    color: string | undefined
  ): void {
    this.setComputationStatus(warning, error, engineStatus, compStatus, color);
  }

  /** Callback which should run after compute engine has succesfully connected. */
  private succesfulConnectionCallback() {
    this.getLiveModel()!.UpdateFunctions.validateAllUpdateFunctions();
  }

  public toggleConnection() {
    this.computeEngine.toggleConnection(
      () => this.succesfulConnectionCallback(),
      (
        warning: string | undefined,
        error: string | undefined,
        engineStatus: string | undefined,
        compStatus: ComputationStatus | undefined,
        color: string | undefined
      ) => {
        this.pingCallback(warning, error, engineStatus, compStatus, color);
      }
    );
  }

  public computationIsRunning() {
    return this.computeEngine.isWaitingForResults();
  }

  // #endregion

  // #region --- Computation Status ---

  private computationCanStart(
    model: string | undefined,
    mode: ComputationModes
  ): asserts model is string {
    if (!model) {
      throw new Error('Cannot start computation: Model is empty.');
    }

    this.computeEngine.computationCanStart();

    const blockingOps = Object.keys(this.computationBlockingOperations);
    if (blockingOps.length > 0) {
      throw new Error(
        `Cannot start computation: ${blockingOps[0]} is running. Try again later.`
      );
    }

    const updateFunctionErrorVarID = this.updateFunctionsStore
      .getState()
      .errorInUpdateFunctions();

    if (updateFunctionErrorVarID !== undefined) {
      throw new Error(
        `Cannot start computation: Update function for variable '${this.variablesStore
          .getState()
          .getVariableName(updateFunctionErrorVarID)}' has errors.`
      );
    }

    if (mode === 'Control') {
      const [controlEnabled, inPhenotype] = this.controlStore
        .getState()
        .getNumberOfSetControl();

      if (controlEnabled === 0) {
        throw new Error(
          'Cannot start control computation: No variables are set as Control-Enabled.'
        );
      }

      if (inPhenotype === 0) {
        throw new Error(
          'Cannot start control computation: No variables are set in Phenotype.'
        );
      }
    }

    this.resultsStatusStore.getState().clearResult(mode);
    this.tabsStore
      .getState()
      .closeByTabType(
        this.tabOperationsServ.getTabTypeFromComputationMode(mode)
      );

    return;
  }

  public setComputationStatus = (
    warning: string | undefined,
    error: string | undefined,
    computeEngineStatus: string | undefined = undefined,
    computationStatus: ComputationStatus | undefined = undefined,
    color: string | undefined = undefined
  ): void => {
    if (computeEngineStatus)
      this.computeEngineStatusStore
        .getState()
        .setComputeEngineStatus(computeEngineStatus);

    if (computationStatus)
      this.computeEngineStatusStore
        .getState()
        .setComputationStatus(computationStatus);

    if (color) this.computeEngineStatusStore.getState().setStatusColor(color);

    if (error) {
      this.messageServ.showError(error);
    }

    if (warning) {
      this.messageServ.showInfo(warning);
    }
  };

  // #endregion

  // #region --- Update Functions ---

  private validateUpdateFunctionCallback(
    variableId: number,
    response: UpdateFunctionStatus | undefined,
    setUpdateFunctionStatus: (status: UpdateFunctionStatus) => void
  ): void {
    if (!response) {
      this.messageServ.showError(
        `Error validating update function for variable ${this.variablesStore
          .getState()
          .getVariableName(variableId)}`
      );
      setUpdateFunctionStatus({
        status: 'Error validating update function',
        isError: true,
      });
    } else {
      setUpdateFunctionStatus(response);
    }

    delete this.computationBlockingOperations[
      'Validating update function ' + variableId
    ];
  }

  public validateUpdateFunction(
    variableId: number,
    updateFunctionFragment: string,
    setUpdateFunctionStatus: (status: UpdateFunctionStatus) => void
  ): void {
    if (this.isComputeEngineConnected()) {
      this.computationBlockingOperations[
        'Validating update function ' + variableId
      ] = "'Validating update function'";

      this.computeEngine.validateUpdateFunction(
        variableId,
        updateFunctionFragment,
        (variableId, response) =>
          this.validateUpdateFunctionCallback(
            variableId,
            response,
            setUpdateFunctionStatus
          )
      );
    } else {
      setUpdateFunctionStatus({
        status:
          'Cannot validate update function:\n Compute engine not connected',
        isError: true,
      });
    }
  }

  // #endregion

  // #region --- Open Witness ---

  public openWitnessCallback(
    error: string | undefined,
    response: ModelObject | undefined
  ): void {
    if (error || !response || !response.model) {
      this.messageServ.showError(
        `Error opening witness: "${error ?? 'Unknown error'}"`
      );
    } else {
      const modelId = this.getLiveModel()!.Models.addModel(
        response.model,
        'witness'
      );
      this.getLiveModel()!.Models.loadModel(modelId);
      this.tabsStore.getState().addTab(
        `/witness`,
        'Witness',
        () => {
          this.getLiveModel()!.Models.loadModel(modelId);
        },
        () => this.getLiveModel()!.Models.removeModel(modelId)
      );
    }

    this.loadingServ.endLoading();
  }

  public openWitnessAttractorAnalysis(behaviorString: string) {
    if (!behaviorString || behaviorString.length === 0) {
      this.messageServ.showError(
        'Cannot open witness: No behavior string provided for the attractor.'
      );
      return;
    }

    this.loadingServ.startLoading();
    this.computeEngine.getWitnessAttractorAnalysis(
      behaviorString,
      this.openWitnessCallback.bind(this)
    );
  }

  public openWitnessBifurcationExplorer(nodeId: number) {
    this.loadingServ.startLoading();
    this.computeEngine.getWitnessBifurcationExplorer(
      nodeId,
      this.openWitnessCallback.bind(this)
    );
  }

  public openWitnessStabilityAnalysis(
    nodeId: number,
    variableName: string,
    behavior: string,
    vector: string[]
  ): void {
    this.loadingServ.startLoading();
    this.computeEngine.getWitnessStabilityAnalysis(
      nodeId,
      variableName,
      behavior,
      vector,
      this.openWitnessCallback.bind(this)
    );
  }

  // #endregion

  // #region --- Attractor Analysis Computation ---

  public startAttractorAnalysis() {
    // TODO - change when multiple phenotypes for computation are allowed
    const model = this.getLiveModel()!.Export.exportAeon(
      false,
      this.controlStore.getState().phenotypesUsedInComputation.values().next()
        .value ?? -1
    );

    try {
      this.computationCanStart(model, 'Attractor Analysis');
    } catch (error) {
      if (error instanceof Error) {
        this.messageServ.showError(error.message);
      }
      return;
    }

    this.computeEngine.startAttractorAnalysis(model, this.setComputationStatus);
  }

  // #endregion

  // #region --- Attractor Bifurcation Explorer ---

  /** Callback for fetching the bifurcation tree.
   * Sets the bifurcation tree in the AttractorBifurcationExplorer.
   * @param fit - (boolean) Determines whether to fit the tree in the view of AttractorBifurcationExplorer
   * @param animate - (boolean) Determines whether the bifurcation tree should be loaded with animation (true) or without (false). */
  private getBifurcationTreeCallback(
    error: string | undefined,
    nodes: NodeDataBE[] | undefined,
    fit: boolean,
    animate: boolean,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void {
    if (error || !nodes) {
      this.messageServ.showError(
        `Error fetching bifurcation tree: ${error ?? 'Internal error'}`
      );
    } else {
      attractorBifurcationExplorerRef.insertBifurcationTree(
        nodes,
        fit,
        animate
      );
    }

    this.loadingServ.endLoading();
  }

  public getBifurcationTree(
    fit: boolean,
    animate: boolean,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void {
    this.loadingServ.startLoading();
    this.computeEngine.getBifurcationTree((error, nodes) =>
      this.getBifurcationTreeCallback(
        error,
        nodes,
        fit,
        animate,
        attractorBifurcationExplorerRef
      )
    );
  }

  /** Callback for setting the bifurcation tree precision. Checks for errors and updates the UI accordingly. */
  private setBifurcationTreePrecisionCallback(
    error: string | undefined,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void {
    if (error) {
      this.messageServ.showError(
        `Error setting bifurcation tree precision: ${error}`
      );
      return;
    }

    this.getBifurcationTree(false, true, attractorBifurcationExplorerRef);
  }

  public setBifurcationTreePrecision(
    precision: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void {
    this.computeEngine.setBifurcationTreePrecision(precision, (error) =>
      this.setBifurcationTreePrecisionCallback(
        error,
        attractorBifurcationExplorerRef
      )
    );
  }

  /** Callback for auto-expanding the bifurcation tree. Sets the expanded nodes in the AttractorBifurcationExplorer and unselects selected node. */
  private autoExpandBifurcationTreeCallback(
    error: string | undefined,
    nodes: NodeDataBE[] | undefined,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void {
    if (error || !nodes) {
      this.messageServ.showError(
        `Error auto-expanding bifurcation tree: ${error ?? 'Internal error'}`
      );
    } else {
      attractorBifurcationExplorerRef.loadBifurcationTree(true, false);
    }

    attractorBifurcationExplorerRef.refreshSelection();

    this.loadingServ.endLoading();
  }

  public autoExpandBifurcationTree(
    nodeId: number,
    depth: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void {
    this.loadingServ.startLoading();
    this.computeEngine.autoExpandBifurcationTree(
      nodeId,
      depth,
      (error, nodes) =>
        this.autoExpandBifurcationTreeCallback(
          error,
          nodes,
          attractorBifurcationExplorerRef
        )
    );
  }

  /** Callback for deleting a bifurcation decision. */
  private deleteBifurcationDecisionCallback(
    error: string | undefined,
    node: NodeDataBE | undefined,
    removed: number[] | undefined,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void {
    if (error || !node) {
      this.messageServ.showError(
        `Error deleting bifurcation decision: ${error ?? 'Internal error'}`
      );
    } else {
      if (!removed || removed.length === 0) {
        this.messageServ.showInfo(
          `Bifurcation decision for node ${node.id} was deleted, but no nodes were removed.`
        );
      }
      attractorBifurcationExplorerRef.removeFromCytoscape(node, removed ?? []);
    }

    this.loadingServ.endLoading();
  }

  public deleteBifurcationDecision(
    nodeId: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void {
    this.loadingServ.startLoading();
    this.computeEngine.deleteBifurcationDecision(
      nodeId,
      (error, node, removed) =>
        this.deleteBifurcationDecisionCallback(
          error,
          node,
          removed,
          attractorBifurcationExplorerRef
        )
    );
  }

  /** Callback for fetching stability data. */
  private getStabilityDataCallback(
    error: string | undefined,
    behavior: StabilityAnalysisModes,
    data: Array<StabilityAnalysisVariable> | undefined
  ): void {
    if (error || !data) {
      this.messageServ.showError(
        `Error fetching stability data: ${error ?? 'Internal error'}`
      );
    } else {
      this.bifurcationExplorerStatusStore.getState().loadStabilityData({
        computedBehavior: behavior,
        stabilityAnalysis: data,
      });
    }

    this.loadingServ.endLoading();
  }

  public getStabilityData(
    nodeId: number,
    behaviour: StabilityAnalysisModes
  ): void {
    this.loadingServ.startLoading();
    this.computeEngine.getStabilityData(
      nodeId,
      behaviour,
      this.getStabilityDataCallback.bind(this)
    );
  }

  public getDecisionsCallback(
    error: string | undefined,
    decisions: Decisions | undefined,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ) {
    if (error || !decisions) {
      this.messageServ.showError(
        `Error fetching decisions: ${error ?? 'Internal error'}`
      );
    } else {
      const formatedDecisions =
        attractorBifurcationExplorerRef.formatClassesDecisions(decisions);
      this.bifurcationExplorerStatusStore
        .getState()
        .loadDecisions(formatedDecisions);
    }

    this.loadingServ.endLoading();
  }

  public getDecisions(
    nodeId: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void {
    this.loadingServ.startLoading();
    this.computeEngine.getDecisions(nodeId, (error, decisions) =>
      this.getDecisionsCallback(
        error,
        decisions,
        attractorBifurcationExplorerRef
      )
    );
  }

  public makeDecisionCallback(
    error: string | undefined,
    node: NodeDataBE[] | undefined,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void {
    if (error || !node) {
      this.messageServ.showError(
        `Error making decision: ${error ?? 'Internal error'}`
      );
    } else {
      attractorBifurcationExplorerRef.loadBifurcationTree(true, false);
      attractorBifurcationExplorerRef.refreshSelection();
    }

    this.loadingServ.endLoading();
  }

  public makeDecision(
    nodeId: number,
    decisionId: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void {
    this.loadingServ.startLoading();
    this.computeEngine.makeDecision(nodeId, decisionId, (error, node) =>
      this.makeDecisionCallback(error, node, attractorBifurcationExplorerRef)
    );
  }

  // #endregion

  // #region --- Attractor Visualizer ---

  /** Callback for attractor getting functions.
   * Handles errors and inserts attractor data into AttractorVisualizer */
  private getAttractorCallback(
    error: string | undefined,
    attractorData: AttractorData | undefined,
    attractorVisualizerRef: AttractorVisualizerInt
  ) {
    if (error || !attractorData) {
      this.messageServ.showError(
        `Error fetching attractor: ${error ?? 'Internal error'}`
      );
    } else {
      attractorVisualizerRef.insertAttractorData(attractorData, true);
    }

    this.loadingServ.endLoading();
  }

  public getAttractorByBehavior(
    behavior: string,
    attractorVisualizerRef: AttractorVisualizerInt
  ) {
    this.loadingServ.startLoading();
    this.computeEngine.getAttractorByBehavior(
      behavior,
      (error, attractorData) =>
        this.getAttractorCallback(error, attractorData, attractorVisualizerRef)
    );
  }

  public getBifurcationExplorerAttractor(
    nodeId: number,
    attractorVisualizerRef: AttractorVisualizerInt
  ) {
    this.loadingServ.startLoading();
    this.computeEngine.getBifurcationExplorerAttractor(
      nodeId,
      (error, attractorData) =>
        this.getAttractorCallback(error, attractorData, attractorVisualizerRef)
    );
  }

  public getStabilityAnalysisAttractor(
    nodeId: number,
    variableName: string,
    behavior: string,
    vector: string[],
    attractorVisualizerRef: AttractorVisualizerInt
  ) {
    this.loadingServ.startLoading();
    this.computeEngine.getStabilityAnalysisAttractor(
      nodeId,
      variableName,
      behavior,
      vector,
      (error, attractorData) =>
        this.getAttractorCallback(error, attractorData, attractorVisualizerRef)
    );
  }

  // #endregion

  // #region --- Control Computation ---

  public startControlComputation() {
    // TODO - change when multiple phenotypes for computation are allowed
    const model = this.getLiveModel()!.Export.exportAeon(
      false,
      this.controlStore.getState().phenotypesUsedInComputation.values().next()
        .value ?? -1
    );

    const oscillation =
      this.getLiveModel()!.Control.getOscillation() ?? 'allowed';
    const phenotypeControlEnabled =
      this.getLiveModel()!.Control.getPhenotypeControlEnabledVars();

    try {
      this.computationCanStart(model, 'Control');
    } catch (error) {
      if (error instanceof Error) {
        this.messageServ.showError(error.message);
      }

      return;
    }

    this.computeEngine.startControlComputation(
      model,
      oscillation,
      this.getMinRobustness(),
      this.getMaxSize(),
      this.getMaxNumberOfResults(),
      { ...phenotypeControlEnabled, oscillation: oscillation },
      this.setComputationStatus
    );
  }

  // #endregion

  // #region --- Trap Space Succession Diagram ---

  private getSuccessionDiagramCallback(
    error: string | undefined,
    nodes: NodeDataTSSD[] | undefined,
    insertSuccessionDiagramFunction: (nodes: NodeDataTSSD[]) => void
  ): void {
    if (error || !nodes) {
      this.messageServ.showError(
        `Error fetching trap space succession diagram: ${error ?? 'Internal error'}`
      );
    } else {
      insertSuccessionDiagramFunction(nodes);
    }

    this.loadingServ.endLoading();
  }

  public getTrapSpaceSuccessionDiagram(
    insertSuccessionDiagramFunction: (nodes: NodeDataTSSD[]) => void
  ): void {
    // TODO - change when multiple phenotypes for computation are allowed
    const model = this.getLiveModel()!.Export.exportAeon(
      false,
      this.controlStore.getState().phenotypesUsedInComputation.values().next()
        .value ?? -1
    );

    try {
      // Todo - change the mode string to a specific one for TSSD when we have more computations using TSSD
      this.computationCanStart(model, 'Attractor Analysis');
    } catch (error: unknown) {
      this.messageServ.showError((error as Error).message);
      return;
    }

    this.computeEngine.getTrapSpaceSuccessionDiagram(
      model,
      (error: string | undefined, nodes: NodeDataTSSD[] | undefined) =>
        this.getSuccessionDiagramCallback(
          error,
          nodes,
          insertSuccessionDiagramFunction
        )
    );
  }

  private getDecisionsTSSDCallback(
    error: string | undefined,
    decisions: DecisionsTSSD | undefined,
    setDecisionsFunction: (decisions: DecisionsTSSD) => void
  ) {
    if (error || !decisions) {
      this.messageServ.showError(
        `Error fetching decisions: ${error ?? 'Internal error'}`
      );
    } else {
      setDecisionsFunction(decisions);
    }

    this.loadingServ.endLoading();
  }

  public getDecisionsTSSD(
    nodeId: number,
    setDecisionsFunction: (decisions: DecisionsTSSD) => void
  ): void {
    this.loadingServ.startLoading();
    this.computeEngine.getDecisionsTSSD(nodeId, (error, decisions) =>
      this.getDecisionsTSSDCallback(error, decisions, setDecisionsFunction)
    );
  }

  private makeDecisionTSSDCallback(
    error: string | undefined,
    node: NodeDataTSSD[] | undefined,
    insertSuccessionDiagramFunction: (nodes: NodeDataTSSD[]) => void
  ): void {
    if (error || !node) {
      this.messageServ.showError(
        `Error making decision: ${error ?? 'Internal error'}`
      );
    } else {
      insertSuccessionDiagramFunction(node);
    }

    this.loadingServ.endLoading();
  }

  public makeDecisionTSSD(
    nodeId: number,
    decisionId: number,
    insertSuccessionDiagramFunction: (nodes: NodeDataTSSD[]) => void
  ): void {
    this.loadingServ.startLoading();
    this.computeEngine.makeDecisionTSSD(nodeId, decisionId, (error, node) =>
      this.makeDecisionTSSDCallback(
        error,
        node,
        insertSuccessionDiagramFunction
      )
    );
  }

  private deleteDecisionTSSDCallback(
    error: string | undefined,
    node: NodeDataTSSD | undefined,
    removed: number[] | undefined,
    removeNodesFromVisualizationFunction: (
      node: NodeDataTSSD,
      removedNodes: number[]
    ) => void
  ): void {
    if (error || !node) {
      this.messageServ.showError(
        `Error deleting decision: ${error ?? 'Internal error'}`
      );
      return;
    }

    if (!removed || removed.length === 0) {
      this.messageServ.showInfo(
        `Decision for node ${node.id} was deleted, but no nodes were removed.`
      );
      return;
    }

    removeNodesFromVisualizationFunction(node, removed);
  }

  public deleteDecisionTSSD(
    nodeId: number,
    removeNodesFromVisualizationFunction: (
      node: NodeDataTSSD,
      removedNodes: number[]
    ) => void
  ): void {
    this.loadingServ.startLoading();
    this.computeEngine.deleteDecisionTSSD(nodeId, (error, node, removed) => {
      this.deleteDecisionTSSDCallback(
        error,
        node,
        removed,
        removeNodesFromVisualizationFunction
      );
    });
  }

  // #endregion

  // #region --- Results ---

  public setResults(
    warning: string | undefined,
    error: string | undefined,
    type: ComputationModes | undefined,
    results: AttractorResults | ControlResults | undefined
  ): void {
    if (type && results) {
      this.resultsStatusStore.getState().setResults(type, results);
    }

    if (error) {
      this.messageServ.showError(error);
    }

    if (warning) {
      this.messageServ.showInfo(warning);
    }
  }

  // #endregion
}

export default ComputationManager;
