import type { BifurcationExplorerStatusState } from '../../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import type { ComputeEngineStatusState } from '../../../stores/ComputationManager/ComputeEngineStatusStore/ComputeEngineStatusState';
import type { ResultsStatus } from '../../../stores/ComputationManager/ResultStatus/ResultStatus';
import type { ControlStatus } from '../../../stores/LiveModel/ControlStore/ControlStatus';
import type { UpdateFunctionsState } from '../../../stores/LiveModel/UpdateFunctionsStore/UpdateFunctionsState';
import type { VariablesStatus } from '../../../stores/LiveModel/VariablesStore/VariablesStatus';
import type { TabsState } from '../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type {
  AttractorResults,
  ComputationModes,
  ComputationStatus,
  ControlResults,
  DecisionsTSSD,
  NodeDataTSSD,
  UpdateFunctionStatus,
} from '../../../types/types';
import type { ComputeEngineInt } from '../ComputeEngine/ComputeEngineInt';
import ComputeEngine from '../ComputeEngine/External/ComputeEngine';
import type { LiveModelInt } from '../LiveModel/LiveModelInt';
import type { LoadingInt } from '../Loading/LoadingInt';
import type { MessageInt } from '../Message/MessageInt';
import type { TabOperationsInt } from '../Navigation/TabOperationsInt';
import AttractorAnalysis from './AttractorAnalysis/AttractorAnalysis';
import type { AttractorAnalysisInt } from './AttractorAnalysis/AttractorAnalysisInt';
import type { ComputationManagerInt } from './ComputationManagerInt';
import Control from './Control/Control';
import type { ControlInt } from './Control/ControlInt';

/**
	Responsible for managing computation inside AEON. (start computation, stop computation, computation parameters...)
*/
class ComputationManager implements ComputationManagerInt {
  // #region --- Properties + Constructor ---

  public Control: ControlInt;

  public AttractorAnalysis: AttractorAnalysisInt;

  /** Currently used compute engine comunicator */
  private computeEngine: ComputeEngineInt;

  /** If not empty, blocks all computations with the given reason. */
  private computationBlockingOperations: Record<string, string> = {};

  /** Reference to the LiveModel service. Needs to be set after creation of the ComputationManager because of circular dependencies. */
  private liveModelServ: LiveModelInt | undefined = undefined;
  private tabOperationsServ: TabOperationsInt;
  private messageServ: MessageInt;
  private loadingServ: LoadingInt;

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

    this.Control = new Control(
      this.messageServ,
      this.computeEngine,
      () => this.getLiveModel(),
      this.controlStore,
      (model) => this.computationCanStart(model, 'Control'),
      (warning, error, computeEngineStatus, computationStatus, color) =>
        this.setComputationStatus(
          warning,
          error,
          computeEngineStatus,
          computationStatus,
          color
        )
    );

    this.AttractorAnalysis = new AttractorAnalysis(
      this.messageServ,
      this.loadingServ,
      this.computeEngine,
      // TODO - change when multiple phenotypes for computation are allowed
      () => {
        return this.getLiveModel()!.Export.exportAeon(
          false,
          this.controlStore
            .getState()
            .phenotypesUsedInComputation.values()
            .next().value ?? -1
        );
      },
      () => this.getLiveModel(),
      bifurcationExplorerStatusStore,
      tabsStore,
      (model) => this.computationCanStart(model, 'Attractor Analysis'),
      (warning, error, computeEngineStatus, computationStatus, color) =>
        this.setComputationStatus(
          warning,
          error,
          computeEngineStatus,
          computationStatus,
          color
        )
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
