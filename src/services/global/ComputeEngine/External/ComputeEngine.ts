import config from '../../../../config';
import type {
  AttractorData,
  AttractorResults,
  ComputationModes,
  ComputationStatus,
  ControlComputationStats,
  ControlPreComputationInfo,
  ControlResult,
  ControlResultNoId,
  ControlResults,
  Decisions,
  DecisionsTSSD,
  ModelObject,
  NodeDataBE,
  NodeDataTSSD,
  StabilityAnalysisModes,
  StabilityAnalysisVariable,
  TimestampResponse,
  UpdateFunctionStatus,
} from '../../../../types/types';
import type { LoadingInt } from '../../Loading/LoadingInt';
import type { ComputeEngineInt } from '../ComputeEngineInt';
import type {
  AttractorResponse,
  ComputationInfo,
  ControlResponse,
  DeleteBifDecisionResponse,
  ValidateUpdateFunctionResponse,
} from './ComputeEngineTypes';

// Check if we already have a Tab ID for this specific tab
let TAB_ID = sessionStorage.getItem('X-Tab-ID');

if (!TAB_ID) {
  // If not, create a new unique ID
  TAB_ID = crypto.randomUUID();
  sessionStorage.setItem('X-Tab-ID', TAB_ID);
}

class ComputeEngine implements ComputeEngineInt {
  // #region --- Properties + Constructor ---

  private address: string =
    config.computeEngine.defaultURL ?? 'http://localhost:8000';

  private connected: boolean = false;

  private pingRepeatToken: number | undefined = undefined;

  private waitingForResults: boolean = false;

  private lastComputationType: ComputationModes | undefined = undefined;

  private lastComputationData: ControlPreComputationInfo | undefined =
    undefined;

  private setResults: (
    warning: string | undefined,
    error: string | undefined,
    type: ComputationModes | undefined,
    results: any | undefined
  ) => void;

  private loadingServ: LoadingInt;

  constructor(
    setResults: (
      warning: string | undefined,
      error: string | undefined,
      type: ComputationModes | undefined,
      results: AttractorResults | ControlResults | undefined
    ) => void,

    loadingServ: LoadingInt
  ) {
    this.setResults = setResults;

    this.loadingServ = loadingServ;
  }

  // #endregion

  // #region --- Get Connection Status ---

  public isConnected() {
    return this.connected;
  }

  // #endregion

  // #region --- Address Setters/Getters ---

  public setEngineAddress(newAddress: string) {
    if (newAddress) {
      this.address = newAddress;
    }
  }

  public getEngineAddress() {
    return this.address;
  }

  // #endregion

  // #region --- Connection Management ---

  /** Open or close connection connection, depending on current status. */
  public toggleConnection(
    succesfulConnectionCallback: (() => void) | undefined = undefined,
    pingCallback:
      | ((
          warning: string | undefined,
          error: string | undefined,
          engineStatus: string | undefined,
          compStatus: ComputationStatus | undefined,
          color: string | undefined
        ) => void)
      | undefined = undefined
  ) {
    if (this.connected) {
      this.closeConnection(pingCallback);
    } else {
      this.openConnection(succesfulConnectionCallback, pingCallback);
    }
  }

  /** Open connection, taking up to date address from user input.
		Callback is called upon first ping. */
  private openConnection(
    succesfulConnectionCallback: (() => void) | undefined = undefined,
    pingCallback:
      | ((
          warning: string | undefined,
          error: string | undefined,
          engineStatus: string | undefined,
          compStatus: ComputationStatus | undefined,
          color: string | undefined
        ) => void)
      | undefined = undefined
  ): void {
    if (!this.address) {
      if (pingCallback)
        pingCallback(
          undefined,
          'Compute Engine Adress not set',
          'Disconnected',
          { status: 'No computation', running: false },
          'var(--color-compute-engine-status-error)'
        );

      return;
    }

    this.ping(true, 2000, succesfulConnectionCallback, pingCallback);
  }

  /** Close current connection - return true if really closed. */
  private closeConnection(
    callback:
      | ((
          warning: string | undefined,
          error: string | undefined,
          engineStatus: string | undefined,
          compStatus: ComputationStatus | undefined,
          color: string | undefined
        ) => void)
      | undefined = undefined
  ): void {
    if (this.pingRepeatToken !== undefined) {
      clearTimeout(this.pingRepeatToken);
      this.pingRepeatToken = undefined;
    }

    this.connected = false;
    if (callback !== undefined) {
      callback(
        undefined,
        undefined,
        'Disconnected',
        { status: 'No computation', running: false },
        'var(--color-compute-engine-status-error)'
      );
    }
  }

  /** Check if the connection is open. */
  private pingCallback = (
    keepAlive: boolean,
    interval: number,
    error: string | undefined,
    response: AttractorResponse | ControlResponse | undefined,
    succesfulConnectionCallback: (() => void) | undefined = undefined,
    callback:
      | ((
          warning: string | undefined,
          error: string | undefined,
          engineStatus: string | undefined,
          compStatus: ComputationStatus | undefined,
          color: string | undefined
        ) => void)
      | undefined = undefined
  ) => {
    if (error || response === undefined) {
      if (callback)
        callback(
          undefined,
          error ?? 'Connection error',
          'Disconnected',
          { status: `Error: ${error ?? 'Connection error'}`, running: false },
          'var(--color-compute-engine-status-error)'
        );
      this.closeConnection(undefined);
      return;
    }

    if (keepAlive && error === undefined) {
      this.pingRepeatToken = setTimeout(() => {
        this.ping(true, interval, succesfulConnectionCallback, callback);
      }, interval);
    }

    // If is the first ping with the compute (!this.connected) set version warning
    const versionWarning: string | undefined =
      !this.connected && response['version'] != config.computeEngine.version
        ? `Your AEON client version is ${config.computeEngine.version}, but your compute engine version is ${response['version']}. You may encounter compatibility issues. For best experience, please download recommended engine binary from the 'Compute Engine' panel.`
        : undefined;

    const previousConnectedStatus = this.connected;
    this.connected = true;

    if (
      succesfulConnectionCallback &&
      this.connected &&
      !previousConnectedStatus
    ) {
      succesfulConnectionCallback();
    }

    const statusInfo: ComputationInfo = this.createComputationStatus(response);

    if (
      this.waitingForResults &&
      statusInfo.computationStatus.status === 'Done'
    ) {
      this.waitingForResults = false;
      this.getResults();
    }

    if (callback !== undefined) {
      callback(
        versionWarning,
        response.error ?? undefined,
        statusInfo.computeEngineStatus,
        statusInfo.computationStatus,
        statusInfo.statusColor
      );
    }
  };

  /** Send a ping request. If interval is set, the ping will be repeated
		 until connection is closed. (Callback is called only once) */
  private ping(
    keepAlive: boolean = false,
    interval: number = 2000,
    succesfulConnectionCallback: (() => void) | undefined = undefined,
    callback:
      | ((
          warning: string | undefined,
          error: string | undefined,
          engineStatus: string | undefined,
          compStatus: ComputationStatus | undefined,
          color: string | undefined
        ) => void)
      | undefined = undefined
  ) {
    // if this is a keepAlive ping, cancel any previous pings...
    if (keepAlive && this.pingRepeatToken !== undefined) {
      clearTimeout(this.pingRepeatToken);
      this.pingRepeatToken = undefined;
    }

    if (this.lastComputationType === 'Control') {
      this.backendRequest(
        '/get_control_computation_status',
        (error: string | undefined, response: ControlResponse | undefined) =>
          this.pingCallback(
            keepAlive,
            interval,
            error,
            response,
            succesfulConnectionCallback,
            callback
          ),
        'GET'
      );
    } else {
      this.backendRequest(
        '/ping',
        (error: string | undefined, response: AttractorResponse | undefined) =>
          this.pingCallback(
            keepAlive,
            interval,
            error,
            response,
            succesfulConnectionCallback,
            callback
          ),
        'GET'
      );
    }
  }

  // #endregion

  // #region --- Computation Status ---

  /** Create a ComputationInfo object based on the response of control computation. **/
  private proccessControlStatus(response: ControlResponse): ComputationInfo {
    const compStatus: ComputationInfo = {
      computeEngineStatus: 'Connected',
      computationStatus: {
        status: 'No computation',
        computationMode: 'Control',
        running: false,
      },
      statusColor: 'var(--color-compute-engine-status-success)',
    };

    if (response.error) {
      compStatus.computationStatus.status = `Error: ${response.error}`;
      compStatus.statusColor = 'var(--color-compute-engine-status-error)';
      return compStatus;
    }

    if (response.isRunning) {
      compStatus.computationStatus.status = 'Running';
      compStatus.statusColor = 'var(--color-compute-engine-status-running)';
      compStatus.computationStatus.timestamp = response.elapsed ?? -1;
      compStatus.computationStatus.running = true;
    } else {
      compStatus.computationStatus.status = response.computationCancelled
        ? 'Cancelled'
        : 'Done';
      compStatus.statusColor = 'var(--color-compute-engine-status-success)';
      compStatus.computationStatus.timestamp =
        response.computationStarted && response.elapsed
          ? response.computationStarted + response.elapsed
          : -1;
    }

    return compStatus;
  }

  /** Create a ComputationInfo object based on the response of attractor analysis computation. **/
  private proccessAttractorStatus(
    response: AttractorResponse
  ): ComputationInfo {
    const compStatus: ComputationInfo = {
      computeEngineStatus: 'Connected',
      computationStatus: {
        status: 'No computation',
        computationMode: 'Attractor Analysis',
        running: false,
      },
      statusColor: 'var(--color-compute-engine-status-success)',
    };

    if (response.error) {
      compStatus.computationStatus.status = `Error: ${response.error}`;
      compStatus.statusColor = 'var(--color-compute-engine-status-error)';
      return compStatus;
    }

    if (response.is_running) {
      compStatus.computationStatus.status = 'Running';
      compStatus.statusColor = 'var(--color-compute-engine-status-running)';
      compStatus.computationStatus.timestamp = response.timestamp
        ? Date.now() - response.timestamp
        : -1;
      compStatus.computationStatus.running = true;
      compStatus.computationStatus.additionalInfo = [
        `Num Classes: ${response.num_classes}`,
        `Progress: ${response.progress}`,
      ];
    } else {
      compStatus.computationStatus.status = response.is_canceled
        ? 'Cancelled'
        : 'Done';
      compStatus.statusColor = 'var(--color-compute-engine-status-success)';
      compStatus.computationStatus.timestamp = response.timestamp ?? -1;
    }

    return compStatus;
  }

  /** Process the response from the Compute Engine and create a ComputationInfo object. **/
  private createComputationStatus(
    response: AttractorResponse | ControlResponse
  ): ComputationInfo {
    if (!response || !this.connected) {
      return {
        computeEngineStatus: 'Disconnected',
        computationStatus: { status: 'No computation' },
        statusColor: 'var(--color-compute-engine-status-error)',
      } as ComputationInfo;
    }

    if (this.lastComputationType === 'Control') {
      return this.proccessControlStatus(response as ControlResponse);
    }

    if (this.lastComputationType === 'Attractor Analysis') {
      return this.proccessAttractorStatus(response as AttractorResponse);
    }

    return {
      computeEngineStatus: 'Connected',
      computationStatus: { status: 'No computation', running: false },
      statusColor: 'var(--color-compute-engine-status-success)',
    };
  }

  public isWaitingForResults(): boolean {
    return this.waitingForResults;
  }

  public computationCanStart(): void {
    if (!this.connected) {
      throw new Error(
        'Cannot start computation: Compute Engine is not connected.'
      );
    }

    if (this.waitingForResults) {
      throw new Error('Cannot start computation: Computation already running.');
    }

    return;
  }

  // #endregion

  // #region --- Get Witness ---

  public getWitnessAttractorAnalysis(
    behaviorString: string,
    callback: (
      error: string | undefined,
      response: ModelObject | undefined
    ) => void
  ): void {
    this.backendRequest(
      '/get_witness/' + behaviorString,
      (error: string | undefined, response: ModelObject | undefined) => {
        if (callback !== undefined) {
          callback(error, response);
        }
      },
      'GET'
    );
  }

  public getWitnessBifurcationExplorer(
    nodeId: number,
    callback: (
      error: string | undefined,
      response: ModelObject | undefined
    ) => void
  ): void {
    this.backendRequest(
      '/get_tree_witness/' + nodeId,
      (error: string | undefined, response: ModelObject | undefined) => {
        if (callback !== undefined) {
          callback(error, response);
        }
      },
      'GET'
    );
  }

  public getWitnessStabilityAnalysis(
    nodeId: number,
    variableName: string,
    behavior: string,
    vector: string[],
    callback: (
      error: string | undefined,
      response: ModelObject | undefined
    ) => void
  ): void {
    this.backendRequest(
      '/get_stability_witness/' +
        nodeId +
        '/' +
        encodeURI(behavior) +
        '/' +
        encodeURI(variableName) +
        '/' +
        encodeURI('[' + vector + ']'),
      (error: string | undefined, response: ModelObject | undefined) => {
        if (callback !== undefined) {
          callback(error, response);
        }
      },
      'GET'
    );
  }

  // #endregion

  // #region --- Start Computation ---

  private processTimestampResponse(
    response: TimestampResponse | undefined,
    computationMode: ComputationModes
  ): ComputationInfo {
    const compStatus: ComputationInfo = {
      computeEngineStatus: 'Connected',
      computationStatus: {
        status: 'No computation',
        running: false,
      },
      statusColor: 'var(--color-compute-engine-status-success)',
    };

    if (!response || !response.timestamp) {
      compStatus.computationStatus.status =
        'Error: Internal Compute Engine error';
      compStatus.statusColor = 'var(--color-compute-engine-status-error)';
      return compStatus;
    }

    compStatus.computationStatus.timestamp = 0;
    compStatus.computationStatus.status = 'Running';
    compStatus.computationStatus.running = true;
    compStatus.computationStatus.computationMode = computationMode;
    compStatus.statusColor = 'var(--color-compute-engine-status-running)';

    return compStatus;
  }

  private startComputationCallback(
    error: string | undefined,
    response: TimestampResponse | undefined,
    computationMode: ComputationModes,
    callback:
      | ((
          warning: string | undefined,
          error: string | undefined,
          engineStatus: string | undefined,
          compStatus: ComputationStatus | undefined,
          color: string | undefined
        ) => void)
      | undefined = undefined
  ): void {
    if (error !== undefined || response === undefined) {
      this.waitingForResults = false;
      if (callback) {
        callback(
          undefined,
          error ?? 'Internal Compute Engine error',
          'Connected',
          {
            status: `Error: ${error ?? 'Internal Compute Engine error'}`,
            computationMode: computationMode,
            running: false,
          },
          'var(--color-compute-engine-status-success)'
        );
      }
      return;
    }

    this.lastComputationType = computationMode;
    const statusInfo: ComputationInfo = this.processTimestampResponse(
      response,
      computationMode
    );

    callback?.(
      undefined,
      undefined,
      undefined,
      statusInfo.computationStatus,
      statusInfo.statusColor
    );

    this.ping();
  }

  // #endregion

  // #region --- Update Function Validation ---

  /** Converts the response from the validate update function endpoint.
   *  Returns undefined if response is undefined, else returns the status converted into UpdateFunctionStatus
   */
  private convertValidateUpdateFunctionResponse(
    response: ValidateUpdateFunctionResponse | undefined,
    error: string | undefined
  ): UpdateFunctionStatus | undefined {
    if (error) {
      return { isError: true, status: error.replaceAll('<br>', '\n') };
    }

    if (response) {
      return {
        isError: response.cardinality === undefined,
        status:
          response.cardinality !== undefined
            ? `Possible Instantiations: ${response.cardinality}`
            : 'Error Validating Functions: No instantiations found',
      };
    }
    return undefined;
  }

  /** Checks if update function is valid.
   */
  public validateUpdateFunction(
    variableId: number,
    updateFunctionFragment: string,
    callback?: (
      variableId: number,
      response: UpdateFunctionStatus | undefined
    ) => void
  ): void {
    if (this.connected) {
      this.backendRequest(
        '/check_update_function',
        (
          error: string | undefined,
          response: ValidateUpdateFunctionResponse | undefined
        ) => {
          callback?.(
            variableId,
            this.convertValidateUpdateFunctionResponse(response, error)
          );
        },
        'POST',
        updateFunctionFragment
      );
    }
  }

  // #endregion

  // #region --- Attractor Analysis Computation ---

  public startAttractorAnalysis(
    model: string,
    callback:
      | ((
          warning: string | undefined,
          error: string | undefined,
          engineStatus: string | undefined,
          compStatus: ComputationStatus | undefined,
          color: string | undefined
        ) => void)
      | undefined = undefined
  ): void {
    this.waitingForResults = true;

    this.backendRequest(
      '/start_computation',
      (error: string | undefined, response: TimestampResponse | undefined) =>
        this.startComputationCallback(
          error,
          response,
          'Attractor Analysis',
          callback
        ),
      'POST',
      model
    );
  }

  private cancelAnalysisCallback(error: string | undefined) {
    if (error !== undefined) {
      throw new Error(`Error: ${error}`);
    }

    this.ping();
  }

  public cancelAttractorComputation() {
    if (!this.connected) {
      throw new Error(
        'Cannot cancel computation: Compute engine not connected.'
      );
    }

    this.backendRequest(
      '/cancel_computation',
      (error: string | undefined) => {
        this.cancelAnalysisCallback(error);
      },
      'POST',
      ''
    );
  }

  // #endregion

  // #region --- Bifurcation Tree ---

  /** Fetches the bifurcation tree from the compute engine. */
  public getBifurcationTree(
    callback: (
      error: string | undefined,
      nodes: NodeDataBE[] | undefined
    ) => void
  ): void {
    this.backendRequest(
      '/get_bifurcation_tree',
      (error: string | undefined, response: NodeDataBE[] | undefined) => {
        callback?.(error, response);
      },
      'GET'
    );
  }

  /** Sets the precision of the bifurcation tree in the compute engine.
   *  Precision is % with up to two decimal places
   */
  public setBifurcationTreePrecision(
    precision: number,
    callback: (error: string | undefined) => void
  ): void {
    const fixedPrecision =
      precision < 100
        ? precision.toFixed(2).replace('.', '').slice(0, 4)
        : '10000';

    this.backendRequest(
      '/apply_tree_precision/' + fixedPrecision,
      (error: string | undefined, _response: any) => {
        if (callback !== undefined) {
          callback(error);
        }
      },
      'POST'
    );
  }

  /** Automatically expands the bifurcation tree at the given node and depth. */
  public autoExpandBifurcationTree(
    nodeId: number,
    depth: number,
    callback: (
      error: string | undefined,
      nodes: NodeDataBE[] | undefined
    ) => void
  ) {
    this.backendRequest(
      '/auto_expand/' + nodeId + '/' + depth,
      (error: string | undefined, nodes: NodeDataBE[] | undefined) => {
        if (callback !== undefined) {
          callback(error, nodes);
        }
      },
      'POST'
    );
  }

  public getStabilityData(
    nodeId: number,
    behavior: StabilityAnalysisModes,
    callback: (
      error: string | undefined,
      behavior: StabilityAnalysisModes,
      data: Array<StabilityAnalysisVariable> | undefined
    ) => void
  ) {
    this.backendRequest(
      '/get_stability_data/' + nodeId + '/' + behavior,
      (
        error: string | undefined,
        response: Array<StabilityAnalysisVariable> | undefined
      ) => {
        if (callback !== undefined) {
          callback(error, behavior, response);
        }
      },
      'GET'
    );
  }

  /** Deletes a bifurcation decision from the compute engine. */
  public deleteBifurcationDecision(
    nodeId: number,
    callback: (
      error: string | undefined,
      node: NodeDataBE | undefined,
      removedNodes: number[]
    ) => void
  ) {
    this.backendRequest(
      '/revert_decision/' + nodeId,
      (
        error: string | undefined,
        response: DeleteBifDecisionResponse | undefined
      ) => {
        if (callback !== undefined) {
          callback(error, response?.node ?? undefined, response?.removed ?? []);
        }
      },
      'POST'
    );
  }

  /** Gets decisions for a specific node from the compute engine. */
  public getDecisions(
    nodeId: number,
    callback: (
      error: string | undefined,
      decisions: Decisions | undefined
    ) => void
  ) {
    this.backendRequest(
      '/get_attributes/' + nodeId,
      (error: string | undefined, response: Decisions | undefined) => {
        callback?.(error, response);
      },
      'GET'
    );
  }

  /** Makes a decision for a specific node in the compute engine. */
  public makeDecision(
    nodeId: number,
    decisionId: number,
    callback: (
      error: string | undefined,
      nodes: NodeDataBE[] | undefined
    ) => void
  ) {
    this.backendRequest(
      '/apply_attribute/' + nodeId + '/' + decisionId,
      (error: string | undefined, nodes: NodeDataBE[] | undefined) => {
        if (callback !== undefined) {
          callback(error, nodes);
        }
      },
      'POST'
    );
  }

  // #endregion

  // #region --- Attractor Visualizer ---

  /** Gets the attractor for a specific behavior. */
  public getAttractorByBehavior(
    behavior: string,
    callback: (
      error: string | undefined,
      attractorData: AttractorData | undefined
    ) => void
  ): void {
    this.backendRequest('/get_attractors/' + behavior, callback, 'GET', null);
  }

  /** Gets the attractor for a specific node in the AttractorBifurcationExplorer. */
  public getBifurcationExplorerAttractor(
    nodeId: number,
    callback: (
      error: string | undefined,
      attractorData: AttractorData | undefined
    ) => void
  ): void {
    this.backendRequest(
      '/get_tree_attractors/' + nodeId,
      callback,
      'GET',
      null
    );
  }

  public getStabilityAnalysisAttractor(
    nodeId: number,
    variableName: string,
    behavior: string,
    vector: string[],
    callback: (
      error: string | undefined,
      attractorData: AttractorData | undefined
    ) => void
  ): void {
    this.backendRequest(
      '/get_stability_attractors/' +
        nodeId +
        '/' +
        encodeURI(behavior) +
        '/' +
        encodeURI(variableName) +
        '/' +
        encodeURI('[' + vector + ']'),
      callback,
      'GET',
      null
    );
  }

  // #endregion

  // #region --- Control Computation ---

  public startControlComputation(
    model: string,
    oscillation: string,
    minRobustness: number,
    maxSize: number,
    maxNumberResults: number,
    preComputationInfo: ControlPreComputationInfo,
    callback:
      | ((
          warning: string | undefined,
          error: string | undefined,
          engineStatus: string | undefined,
          compStatus: ComputationStatus | undefined,
          color: string | undefined
        ) => void)
      | undefined = undefined
  ): void {
    this.waitingForResults = true;
    this.lastComputationData = preComputationInfo;

    this.backendRequest(
      `/start_control_computation/${oscillation}/${
        minRobustness / 100
      }/${maxSize}/${maxNumberResults}`,
      (error: string | undefined, response: TimestampResponse | undefined) => {
        this.startComputationCallback(error, response, 'Control', callback);
      },
      'POST',
      model
    );
  }

  // #endregion

  // #region --- Trap Space Succession Diagram ---

  public getTrapSpaceSuccessionDiagram(
    model: string,
    callback: (
      error: string | undefined,
      nodes: NodeDataTSSD[] | undefined
    ) => void
  ): void {
    // TODO - remove this mock data when the endpoint is implemented in the compute engine. This is just to be able to work on the frontend part of the succession diagram before the backend is ready.
    callback(undefined, [
      {
        id: 0,
        variableValues: {
          A: undefined,
          B: undefined,
          C: undefined,
        },
        cardinality: 8,
        childNodeIds: [1, 2, 4],
        type: 'decision',
      },
      {
        id: 1,
        variableValues: {
          A: 0,
          B: undefined,
          C: undefined,
        },
        cardinality: 4,
        childNodeIds: [3],
        type: 'decision',
      },
      {
        id: 2,
        variableValues: {
          A: 1,
          B: undefined,
          C: undefined,
        },
        cardinality: 4,
        childNodeIds: [],
        type: 'leaf',
      },
      {
        id: 3,
        variableValues: {
          A: 0,
          B: 0,
          C: undefined,
        },
        cardinality: 2,
        childNodeIds: [],
        type: 'leaf',
      },
      {
        id: 4,
        variableValues: {
          A: 0,
          B: 1,
          C: undefined,
        },
        cardinality: 2,
        childNodeIds: [],
        type: 'leaf',
      },
    ]);
    // TODO - implement this endpoint in the compute engine and uncomment the backend request. For now, this function will return an error to avoid confusion.
    // this.backendRequest(
    //   '/get_trap_space_succession_diagram',
    //   callback,
    //   'GET',
    //   null
    // );
  }

  public getDecisionsTSSD(
    nodeId: number,
    callback: (
      error: string | undefined,
      decisions: DecisionsTSSD | undefined
    ) => void
  ): void {
    // TODO - implement this endpoint in the compute engine and uncomment the backend request.
    callback(undefined, [
      { id: 0, variableValues: {}, numberOfInterpretations: 4 },
      { id: 1, variableValues: { A: 1 }, numberOfInterpretations: 4 },
      { id: 0, variableValues: { B: 0 }, numberOfInterpretations: 4 },
      { id: 1, variableValues: { B: 1 }, numberOfInterpretations: 4 },
      { id: 0, variableValues: { C: 0 }, numberOfInterpretations: 2 },
      { id: 1, variableValues: { C: 1 }, numberOfInterpretations: 2 },
    ]);
    // this.backendRequest(
    //   '/get_attributes_tssd/' + nodeId,
    //   (error: string | undefined, response: DecisionsTSSD | undefined) => {
    //     callback?.(error, response);
    //   },
    //   'GET'
    // );
  }

  public makeDecisionTSSD(
    nodeId: number,
    decisionId: number,
    callback: (
      error: string | undefined,
      nodes: NodeDataTSSD[] | undefined
    ) => void
  ): void {
    callback(undefined, [
      {
        id: 0,
        variableValues: {
          A: undefined,
          B: undefined,
          C: undefined,
        },
        cardinality: 8,
        childNodeIds: [1, 2, 4],
        type: 'decision',
      },
      {
        id: 1,
        variableValues: {
          A: 0,
          B: undefined,
          C: undefined,
        },
        cardinality: 4,
        childNodeIds: [3],
        type: 'decision',
      },
      {
        id: 2,
        variableValues: {
          A: 1,
          B: undefined,
          C: undefined,
        },
        cardinality: 4,
        childNodeIds: [],
        type: 'leaf',
      },
      {
        id: 3,
        variableValues: {
          A: 0,
          B: 0,
          C: undefined,
        },
        cardinality: 2,
        childNodeIds: [],
        type: 'leaf',
      },
      {
        id: 4,
        variableValues: {
          A: 0,
          B: 1,
          C: undefined,
        },
        cardinality: 2,
        childNodeIds: [5],
        type: 'leaf',
      },
      {
        id: 5,
        variableValues: {
          A: 1,
          B: 0,
          C: undefined,
        },
        cardinality: 2,
        childNodeIds: [],
        type: 'leaf',
      },
    ]);

    // TODO - implement this endpoint in the compute engine and uncomment the backend request.
    // this.backendRequest(
    //   '/make_decision_tssd/' + nodeId + '/' + decisionId,
    //   (
    //     error: string | undefined,
    //     response: NodeDataTSSD[] | undefined
    //   ) => {
    //     if (callback !== undefined) {
    //       callback(error, response);
    //     }
    //   },
    //   'POST'
    // );
  }

  public deleteDecisionTSSD(
    nodeId: number,
    callback: (
      error: string | undefined,
      node: NodeDataTSSD | undefined,
      removedNodes: number[]
    ) => void
  ): void {
    callback(undefined, undefined, []);
    // TODO - implement this endpoint in the compute engine and uncomment the backend request.
    // this.backendRequest(
    //   '/revert_decision_tssd/' + nodeId,
    //   (
    //     error: string | undefined,
    //     response: DeleteBifDecisionResponse | undefined
    //   ) => {
    //     if (callback !== undefined) {
    //       callback(error, response?.node ?? undefined, response?.removed ?? []);
    //     }
    //   },
    //   'POST'
    // );
  }

  // #endregion

  // #region --- Results ---

  private getResultsCallback(
    error: string | undefined,
    response: AttractorResults | ControlResults | undefined,
    mode: ComputationModes
  ) {
    if (error !== undefined || !response) {
      this.setResults(
        undefined,
        error ?? 'Internal Compute Engine Error',
        undefined,
        undefined
      );
      return;
    }
    this.setResults(undefined, undefined, mode, response);
    ``;
  }

  private getAttractorResults() {
    this.loadingServ.startLoading();
    this.backendRequest(
      '/get_results',
      (error: string | undefined, response: AttractorResults) => {
        this.getResultsCallback(error, response, 'Attractor Analysis');
        this.loadingServ.endLoading();
      },
      'GET'
    );
  }

  /** Get control computation statistics. */
  private getControlComputationStats(results: ControlResult[]) {
    this.backendRequest(
      '/get_control_stats',
      (
        error: string | undefined,
        response: ControlComputationStats | undefined
      ) => {
        if (error !== undefined || !response || !this.lastComputationData) {
          error =
            'Cannot get Control computation statistics: Internal Compute Engine Error';
        }

        this.getResultsCallback(
          error,
          !response || !this.lastComputationData
            ? undefined
            : {
                perturbations: results,
                stats: response,
                preComputationInfo: this.lastComputationData,
              },
          'Control'
        );
        this.loadingServ.endLoading();
      },
      'GET'
    );
  }

  /** Adds IDs to each perturbation in the control results. */
  private addIdsToControlResults(results: ControlResultNoId[]) {
    const idPerturbations = [];
    for (let i = 0; i < results.length; i++) {
      idPerturbations.push({ id: i + 1, ...results[i] });
    }
    return idPerturbations;
  }

  /** Get control computation results and statistics. */
  private getControlResults() {
    this.loadingServ.startLoading();
    this.backendRequest(
      '/get_control_results',
      (
        error: string | undefined,
        response: ControlResultNoId[] | undefined
      ) => {
        if (error !== undefined || !response || !this.lastComputationData) {
          if (error === undefined && (!response || !this.lastComputationData)) {
            error = 'Cannot get Control results: Internal Compute Engine Error';
          }

          this.getResultsCallback(error, undefined, 'Control');
          this.loadingServ.endLoading();
          return;
        }

        const perturbationsWithIds = this.addIdsToControlResults(response);
        this.getControlComputationStats(perturbationsWithIds);
      },
      'GET'
    );
  }

  private getResults() {
    switch (this.lastComputationType) {
      case 'Attractor Analysis':
        this.getAttractorResults();
        break;
      case 'Control':
        this.getControlResults();
        break;
    }
  }

  // #endregion

  /** Build and return an asynchronous request with given parameters. */
  private backendRequest(
    url: string,
    callback: Function | undefined = undefined,
    method = 'GET',
    postData: any | undefined = undefined
  ) {
    var req = new XMLHttpRequest();

    req.onload = function () {
      if (callback !== undefined) {
        let response = undefined;

        try {
          response = JSON.parse(req.response);
        } catch (e) {
          response = req.response;
        }

        if (response.status) {
          callback(undefined, response.result);
        } else {
          // server returned an error
          callback(response.message, undefined);
        }
      }
    };

    req.onerror = function () {
      if (callback !== undefined) {
        callback('Connection error', undefined);
      }
    };

    req.onabort = function () {
      console.log('abort: ', req);
    };

    req.open(method, this.address + url);
    if (TAB_ID !== null) {
      req.setRequestHeader('x-session-key', TAB_ID);
    }

    if (method == 'POST' && postData !== undefined) {
      req.send(postData);
    } else {
      req.send();
    }

    return req;
  }
}

export default ComputeEngine;
