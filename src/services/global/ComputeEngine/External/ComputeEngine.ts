import config from '../../../../config';
import type { ComputationModes, ComputationStatus } from '../../../../types';
import type {
  AttractorResponse,
  ComputationInfo,
  ControlResponse,
} from './ComputeEngineTypes';

class ComputeEngine {
  // #region --- Properties ---

  private address: string =
    config.computeEngine.defaultURL ?? 'http://localhost:8000';

  private connected: boolean = false;

  private pingRepeatToken: NodeJS.Timeout | undefined = undefined;

  private waitingForResults: boolean = false;

  private lastComputationType: ComputationModes | undefined = undefined;

  // #endregion

  // #region --- Adress Setters/Getters ---

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
    if (this.connected) {
      this.closeConnection(callback);
    } else {
      this.openConnection(callback);
    }
  }

  /** Open connection, taking up to date address from user input.
		Callback is called upon first ping. */
  private openConnection(
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
    if (!this.address) {
      if (callback)
        callback(
          undefined,
          'Compute Engine Adress not set',
          'Disconnected',
          { status: 'No computation' },
          'red'
        );

      return;
    }

    this.ping(true, 2000, callback);
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
        { status: 'No computation' },
        'red'
      );
    }
  }

  /** Check if the connection is open. */
  private pingCallback = (
    keepAlive: boolean,
    interval: number,
    error: string | undefined,
    response: AttractorResponse | ControlResponse | undefined,
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
          { status: `Error: ${error ?? 'Connection error'}` },
          'red'
        );
      this.closeConnection(undefined);
      return;
    }

    if (keepAlive && error === undefined) {
      this.pingRepeatToken = setTimeout(() => {
        this.ping(true, interval, callback);
      }, interval);
    }

    // If is the first ping with the compute (!this.connected) set version warning
    const versionWarning: string | undefined =
      !this.connected && response['version'] != config.version
        ? `Your AEON client version is ${config.version}, but your compute engine version is ${response['version']}. You may encounter compatibility issues. For best experience, please download recommended engine binary from the 'Compute Engine' panel.`
        : undefined;

    this.connected = true;

    const statusInfo: ComputationInfo = this.createComputationStatus(response);

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
          this.pingCallback(keepAlive, interval, error, response, callback),
        'GET'
      );
    } else {
      this.backendRequest(
        '/ping',
        (error: string | undefined, response: AttractorResponse | undefined) =>
          this.pingCallback(keepAlive, interval, error, response, callback),
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
      computationStatus: { status: 'No computation' },
      statusColor: 'green',
    };

    if (response.error) {
      compStatus.computationStatus.status = `Error: ${response.error}`;
      compStatus.statusColor = 'red';
      return compStatus;
    }

    if (response.isRunning) {
      compStatus.computationStatus.status = 'Running';
      compStatus.statusColor = 'orange';
    } else {
      compStatus.computationStatus.status = response.computationCancelled
        ? 'Cancelled'
        : 'Done';
      compStatus.statusColor = 'green';
    }

    if (response.computationStarted && response.eplapsed) {
      compStatus.computationStatus.timestamp =
        response.computationStarted + response.eplapsed;
    } else {
      compStatus.computationStatus.timestamp = undefined;
    }

    return compStatus;
  }

  /** Create a ComputationInfo object based on the response of attractor analysis computation. **/
  private proccessAttractorStatus(
    response: AttractorResponse
  ): ComputationInfo {
    const compStatus: ComputationInfo = {
      computeEngineStatus: 'Connected',
      computationStatus: { status: 'No computation' },
      statusColor: 'green',
    };

    if (response.error) {
      compStatus.computationStatus.status = `Error: ${response.error}`;
      compStatus.statusColor = 'red';
      return compStatus;
    }

    if (response.is_running) {
      compStatus.computationStatus.status = 'Running';
      compStatus.statusColor = 'orange';
    } else {
      compStatus.computationStatus.status = response.is_canceled
        ? 'Cancelled'
        : 'Done';
      compStatus.statusColor = 'green';
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
        statusColor: 'red',
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
      computationStatus: { status: 'No computation' },
      statusColor: 'green',
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

    return;
  }

  // #endregion

  // #region --- Attractor Analysis Computation ---

  private startAnalysisCallback(
    error: string | undefined,
    response: AttractorResponse | undefined,
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
            computationMode: 'Attractor Analysis',
          },
          'green'
        );
      }
      return;
    }

    this.lastComputationType = 'Attractor Analysis';
    const statusInfo = this.createComputationStatus(response);

    callback?.(
      undefined,
      undefined,
      undefined,
      statusInfo.computationStatus,
      statusInfo.statusColor
    );

    this.ping();
  }

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
      (error: string | undefined, response: AttractorResponse | undefined) =>
        this.startAnalysisCallback(error, response, callback),
      'POST',
      model
    );
  }

  private cancelAnalysisCallback(error: string | undefined) {
    if (error !== undefined) {
      console.log(error);
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
    if (method == 'POST' && postData !== undefined) {
      req.send(postData);
    } else {
      req.send();
    }

    return req;
  }
}

export default ComputeEngine;
