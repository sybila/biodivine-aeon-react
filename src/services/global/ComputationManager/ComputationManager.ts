import type { ComputationModes, ComputationStatus } from '../../../types';
import ComputeEngine from '../ComputeEngine/External/ComputeEngine';
import { LiveModel } from '../LiveModel/LiveModel';
import useComputeEngineStatus from '../../../stores/ComputationManager/useComputeEngineStatus';
import { Message } from '../../../components/lit-components/message-wrapper';

/**
	Responsible for managing computation inside AEON. (start computation, stop computation, computation parameters...)
*/
class ComputationManagerClass {
  // #region --- Properties ---

  /** Currently used compute engine comunicator */
  private computeEngine = new ComputeEngine();

  /** Timestamp of the last started/ended computation */
  private lastComputationTimestamp: number | undefined = undefined;

  /** Computation type of the last started/ended computation */
  private lastComputationMode: ComputationModes | undefined = undefined;

  /** Saves currently set computation mode */
  private computationMode: ComputationModes = 'Attractor Analysis';

  /** Minimum robustness for perturbations */
  private minRobustness: number = 0.01;

  /** Maximum number of variables in a perturbation */
  private maxSize: number = 1000000;

  /** Maximum number of perturbations */
  private maxNumberOfResults: number = 1000000;

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
    if (!max) this.maxNumberOfResults = 1000000;
    else if (max < 1) this.maxNumberOfResults = 1;
    else this.maxNumberOfResults = max;
  }

  /** Returns maximum number of perturbations */
  public getMaxNumberOfResults() {
    return this.maxNumberOfResults;
  }

  /** Sets maximum size of a perturbation */
  public setMaxSize(max: number | undefined) {
    if (!max) this.maxSize = 1000000;
    else if (max < 1) this.maxSize = 1;
    else this.maxSize = max;
  }

  /** Returns maximum size of a perturbation */
  public getMaxSize() {
    return this.maxSize;
  }

  /** Sets minimum robustness for perturbations */
  public setMinRobustness(min: number | undefined) {
    if (!min || min < 0) this.minRobustness = 0.01;
    else this.minRobustness = min;
  }

  /** Returns minimum robustness for perturbations */
  public getMinRobustness() {
    return this.minRobustness;
  }

  // #endregion

  // #region --- Computation Mode Setters/Getters ---

  /** Retutns currently set computation mode */
  public getComputationMode() {
    return this.computationMode;
  }

  /** Sets computation mode */
  public setComputationMode(mode: ComputationModes) {
    if (mode) this.computationMode = mode;
  }

  // #endregion

  // #region --- Connection Manager ---

  public toggleConnection(): void {
    this.computeEngine.toggleConnection(this.setComputationStatus);
  }

  // #endregion

  // #region --- Computation Status ---

  private computationCanStart(model: string | undefined): void {
    if (!model) {
      throw new Error('Cannot start computation: Model is empty.');
    }

    this.computeEngine.computationCanStart();

    if (this.computationMode === 'Control') {
      // Todo add control computation errors
    }

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
      useComputeEngineStatus
        .getState()
        .setComputeEngineStatus(computeEngineStatus);

    if (computationStatus)
      useComputeEngineStatus.getState().setComputationStatus(computationStatus);

    if (color) useComputeEngineStatus.getState().setStatusColor(color);

    if (error) {
      Message.showError(error);
    }

    if (warning) {
      Message.showInfo(warning);
    }
  };

  // public updateComputeStatus(status: string | void, color: string, data: any): void {
  //     this.setComputeEngineStatus(status);

  // 		if (status == "connected") {
  // 			if (data !== undefined) {
  // 				// data about computation available
  // 				let status = "(none)";
  // 				// If there is a computation, it is probably running...
  // 				if (data["timestamp"] !== null) {
  // 					status = "running";
  // 					// ...but, if it is cancelled, we are awaiting cancellation...
  // 					if (data["is_cancelled"]) {
  // 						status = "awaiting cancellation";
  // 					}
  // 					// ...but, if it is not running and it is not cancelled, then it must be done...
  // 					if (!data["is_running"] && !data["is_cancelled"]) {
  // 						status = "done";
  // 					}
  // 					// ...and, if it is not running and it is cancelled, the it is actualy cancelled.
  // 					if (!data["is_running"] && data["is_cancelled"]) {
  // 						status = "cancelled";
  // 					}
  // 				}
  // 				// Update server status color depending on current computation status.
  // 				if (status == "(none)" || status == "done" || status == "cancelled") {
  // 					statusBar.classList.add("green");
  // 					statusComp.classList.add("green");
  // 					dot.classList.add("green");
  // 				} else {
  // 					statusBar.classList.add("orange");
  // 					statusComp.classList.add("orange");
  // 					dot.classList.add("orange");
  // 				}
  // 				// Make status green/orange depending on state of computation.
  // 				if (status == "done") {
  // 					cmpStatus.classList.add("green");
  // 				} else if (status != "(none)") {
  // 					cmpStatus.classList.add("orange");
  // 				}

  // 				if (data.error !== undefined && data.error !== null) {
  // 					status += ", error: "+ data.error;
  // 				}

  // 				// Progress is only shown when we are running...
  // 				if (data["is_running"] && data.progress != undefined) {
  // 					statusBar.textContent = status + " " + data.progress.slice(0, 6);
  // 					cmpStatus.innerHTML = status;
  // 					cmpProgress.parentElement.classList.remove("gone");
  // 				} else {
  // 					if (status != "(none)") {
  // 						const timeStatus = status + " " + this._getTime(data.timestamp, data["is_running"] == true);
  // 						cmpStatus.innerHTML = timeStatus;
  // 						statusBar.textContent = timeStatus;
  // 					} else {
  // 						cmpStatus.innerHTML = status;
  // 						statusBar.textContent = " ● Connected";
  // 					}

  // 					cmpProgress.parentElement.classList.add("gone");
  // 				}
  // 				cmp.classList.remove("gone");

  // 				if (data.progress != undefined) {
  // 					cmpProgress.textContent = data.progress;
  // 				}

  // 				if (data.num_classes !== null) {
  // 					cmpClasses.textContent = data.num_classes;
  // 				} else {
  // 					cmpClasses.textContent = "-";
  // 				}
  // 				// Show cancel button if job is running and not cancelled
  // 				if (data["is_running"] && !data["is_cancelled"]) {
  // 					cmpCancel.classList.remove("gone");
  // 				} else {
  // 					cmpCancel.classList.add("gone");
  // 				}

  // 				this._toggleResultsDownload(status, data);

  // 				if (data["timestamp"] !== undefined && Results.hasResults()) {
  // 					// show warning if data is out of date
  // 					ComputeEngine.Computation.setActiveComputation(data["timestamp"]);
  // 					if (ComputeEngine.Computation.hasActiveComputation()) {
  // 						document.getElementById("results-expired").classList.add("gone");
  // 					} else {
  // 						document.getElementById("results-expired").classList.remove("gone");
  // 					}
  // 				} else {
  // 					document.getElementById("results-expired").classList.add("gone");
  // 				}

  // 				if (status == "done" && ComputeEngine.Computation.waitingForResult) {
  // 					ComputeEngine.Computation.waitingForResult = false;
  // 					Results.download();
  // 				}
  // 			}
  // 		} else {
  // 			addressInput.removeAttribute("disabled");
  // 			addressInput.parentElement.removeAttribute("disabled");
  // 			statusBar.textContent = " ● Disconnected";
  // 			statusBar.classList.add("red");
  // 			statusComp.textContent = " ● Disconnected";
  // 			statusComp.classList.add("red");
  // 			dot.classList.add("red");
  // 			connectButton.innerHTML = "Connect <img src='img/cloud-24px.svg'>";
  // 			cmp.classList.add("gone");
  // 		}
  // 	},
  // },

  // #endregion

  // #region --- Attractor Analysis Computation ---

  public startAttractorAnalysis(): void {
    const model = LiveModel.Export.exportAeon();

    this.computationCanStart(model);

    // Todo delete old results

    // this.computationCanStart ensures that model is string
    const returnValue = this.computeEngine.startAttractorAnalysis(
      model as string
    );

    this.lastComputationTimestamp = returnValue;

    this.lastComputationMode = 'Attractor Analysis';
  }

  // #endregion
}

const ComputationManager: ComputationManagerClass =
  new ComputationManagerClass();

export default ComputationManager;
