import type { BifurcationExplorerStatusState } from '../../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import type { ComputeEngineStatusState } from '../../../stores/ComputationManager/ComputeEngineStatusStore/ComputeEngineStatusState';
import type { ResultsStatus } from '../../../stores/ComputationManager/ResultStatus/ResultStatus';
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
  ModelObject,
  NodeDataBE,
  NodeDataTSSD,
  StabilityAnalysisModes,
  StabilityAnalysisVariable,
  UpdateFunctionStatus,
} from '../../../types';
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

  /** Saves currently set computation mode */
  private computationMode: ComputationModes = 'Attractor Analysis';

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

  /** Setter for the LiveModel reference */
  public setLiveModel(liveModel: LiveModelInt): void {
    this.liveModelServ = liveModel;
  }

  // #endregion

  // #region --- External Compute Engine Adress Setters/Getters ---

  /** Sets the URL of the compute engine */
  public setComputeEngineAddress(address: string): void {
    if (address && this.computeEngine.setEngineAddress)
      this.computeEngine.setEngineAddress(address);
  }

  /** Returns the URL of the compute engine */
  public getComputeEngineAddress(): string | undefined {
    if (this.computeEngine.getEngineAddress)
      return this.computeEngine.getEngineAddress();
  }

  // #endregion

  // #region --- Control Computation Parameters Setters/Getters ---

  /** Sets maximum number of perturbations */
  public setMaxNumberOfResults(max: number | undefined) {
    if (!max) this.controlComputationParams.maxNumberOfResults = 1000000;
    else if (max < 1) this.controlComputationParams.maxNumberOfResults = 1;
    else this.controlComputationParams.maxNumberOfResults = max;
  }

  /** Returns maximum number of perturbations */
  public getMaxNumberOfResults() {
    return this.controlComputationParams.maxNumberOfResults;
  }

  /** Resets the maximum size of a perturbation.
   * After calling this, the next call to getMaxSize() will set it to the current number of Control-Enabled variables in the model.
   */
  public resetMaxSize() {
    this.controlComputationParams.maxSize = undefined;
  }

  /** Sets maximum size of a perturbation */
  public setMaxSize(max: number | undefined) {
    const numberOfEnabled =
      this.getLiveModel()!.Control.getNumberOfSetControl()[0];

    if (!max || max > numberOfEnabled) {
      this.controlComputationParams.maxSize = numberOfEnabled;
    } else if (max < 1) {
      this.controlComputationParams.maxSize = 1;
    } else {
      this.controlComputationParams.maxSize = max;
    }
  }

  /** Returns maximum size of a perturbation */
  public getMaxSize() {
    if (this.controlComputationParams.maxSize === undefined) {
      this.controlComputationParams.maxSize =
        this.getLiveModel()!.Control.getNumberOfSetControl()[0];
    }

    return this.controlComputationParams.maxSize;
  }

  /** Sets minimum robustness for perturbations in %*/
  public setMinRobustness(min: number | undefined) {
    if (!min || min < 0) this.controlComputationParams.minRobustness = 0.01;
    else this.controlComputationParams.minRobustness = min;
  }

  /** Returns minimum robustness for perturbations */
  public getMinRobustness() {
    return this.controlComputationParams.minRobustness;
  }

  // #endregion

  // #region --- Computation Mode Setters/Getters ---

  /** Returns currently set computation mode */
  public getComputationMode() {
    return this.computationMode;
  }

  /** Sets computation mode */
  public setComputationMode(mode: ComputationModes) {
    if (mode) this.computationMode = mode;
  }

  // #endregion

  // #region --- Connection Manager ---

  public isComputeEngineConnected(): boolean {
    return this.computeEngine.isConnected();
  }

  public toggleConnection(): void {
    this.computeEngine.toggleConnection(this.setComputationStatus);
  }

  public computationIsRunning(): boolean {
    return this.computeEngine.isWaitingForResults();
  }

  // #endregion

  // #region --- Computation Status ---

  private computationCanStart(
    model: string | undefined
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

    if (this.computationMode === 'Control') {
      const [controlEnabled, inPhenotype] =
        this.getLiveModel()!.Control.getNumberOfSetControl();

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

    this.resultsStatusStore.getState().clearResult(this.computationMode);
    this.tabsStore
      .getState()
      .closeByTabType(
        this.tabOperationsServ.getTabTypeFromComputationMode(
          this.computationMode
        )
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
    response: UpdateFunctionStatus | undefined
  ): void {
    if (!response) {
      this.messageServ.showError(
        `Error validating update function for variable ${this.variablesStore
          .getState()
          .getVariableName(variableId)}`
      );
      this.updateFunctionsStore.getState().setUpdateFunctionStatus(variableId, {
        status: 'Error validating update function',
        isError: true,
      });
    } else {
      this.updateFunctionsStore
        .getState()
        .setUpdateFunctionStatus(variableId, response);
    }

    delete this.computationBlockingOperations[
      'Validating update function ' + variableId
    ];
  }

  /** Validates the update function for a specific variable and sets the status in the store */
  public validateUpdateFunction(
    variableId: number,
    updateFunctionFragment: string
  ): void {
    if (this.isComputeEngineConnected()) {
      this.computationBlockingOperations[
        'Validating update function ' + variableId
      ] = "'Validating update function'";

      this.computeEngine.validateUpdateFunction(
        variableId,
        updateFunctionFragment,
        this.validateUpdateFunctionCallback.bind(this)
      );
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
      this.tabsStore.getState().addTab(`/witness`, 'Witness', () => {
        this.getLiveModel()!.Models.loadModel(modelId);
        () => this.getLiveModel()!.Models.removeModel(modelId);
      });
    }

    this.loadingServ.endLoading();
  }

  /** Gets the witness for one result from the attractor analysis and opens new witness tab */
  public openWitnessAttractorAnalysis(behaviorString: string): void {
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

  /** Get witness for leaf node in the bifurcation explorer and opens new witness tab */
  public openWitnessBifurcationExplorer(nodeId: number): void {
    this.loadingServ.startLoading();
    this.computeEngine.getWitnessBifurcationExplorer(
      nodeId,
      this.openWitnessCallback.bind(this)
    );
  }

  /** Get witness for stability analysis and opens new witness tab */
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

  public startAttractorAnalysis(): void {
    const model = this.getLiveModel()!.Export.exportAeon();

    try {
      this.computationCanStart(model);
    } catch (error: any) {
      this.messageServ.showError(error.message);
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

  /** Fetches the bifurcation tree from the compute engine.
   * @param animate - (boolean) Determines whether the bifurcation tree should be loaded with animation (true) or without (false).
   * @param fit - (boolean) Determines whether to fit the tree in the view of AttractorBifurcationExplorer.
   */
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

  /** Sets the precision of the bifurcation tree.
   *  Precision is % with up to two decimal places
   */
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
      attractorBifurcationExplorerRef.insertBifurcationTree(nodes, true, true);
    }

    attractorBifurcationExplorerRef.refreshSelection();

    this.loadingServ.endLoading();
  }

  /** Automatically expands the bifurcation tree at the given node and depth. */
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

  /** Deletes a bifurcation decision by node ID. */
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

  /** Fetches the stability data for a specific node and behaviour.
   * @param nodeId - (number) The ID of the node to fetch stability data for.
   * @param behaviour - (StabilityAnalysisModes) The behaviour mode to use for fetching stability data.
   */
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

  /** Callback for fetching decisions. */
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

  /** Fetches the decisions for a specific node. */
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
      attractorBifurcationExplorerRef.insertBifurcationTree(node, true, false);
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

  /** Fetches an attractor by its behavior string. Used by the results window.*/
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

  /** Fetches an attractor for node in the AttractorBifurcationExplorer */
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

  public startControlComputation(): void {
    const model = this.getLiveModel()!.Export.exportAeon();

    const oscillation =
      this.getLiveModel()!.Control.getOscillation() ?? 'allowed';
    const phenotypeControlEnabled =
      this.getLiveModel()!.Control.getPhenotypeControlEnabledVars();

    try {
      this.computationCanStart(model);
    } catch (error: any) {
      this.messageServ.showError(error.message);
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
    const model = this.getLiveModel()!.Export.exportAeon();

    try {
      this.computationCanStart(model);
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
