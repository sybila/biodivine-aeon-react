import type {
  AttractorResults,
  ComputationModes,
  ComputationStatus,
  ControlComputationParams,
  ControlResults,
  Decisions,
  NodeDataBE,
  StabilityAnalysisModes,
  StabilityAnalysisVariable,
} from '../../../types';
import ComputeEngine from '../ComputeEngine/External/ComputeEngine';
import { LiveModel } from '../LiveModel/LiveModel';
import useComputeEngineStatus from '../../../stores/ComputationManager/useComputeEngineStatus';
import { Message } from '../../../components/lit-components/message-wrapper';
import useResultsStatus from '../../../stores/ComputationManager/useResultsStatus';
import AttractorBifurcationExplorer from '../../attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorer';
import { Loading } from '../../../components/lit-components/loading-wrapper';
import useBifurcationExplorerStatus from '../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';

/**
	Responsible for managing computation inside AEON. (start computation, stop computation, computation parameters...)
*/
class ComputationManagerClass {
  // #region --- Properties ---

  /** Currently used compute engine comunicator */
  private computeEngine = new ComputeEngine(this.setResults);

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
    const numberOfEnabled = LiveModel.Control.getNumberOfSetControl()[0];

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
        LiveModel.Control.getNumberOfSetControl()[0];
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

  public toggleConnection(): void {
    this.computeEngine.toggleConnection(this.setComputationStatus);
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

    if (this.computationMode === 'Control') {
      const [controlEnabled, inPhenotype] =
        LiveModel.Control.getNumberOfSetControl();

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

  // #endregion

  // #region --- Attractor Analysis Computation ---

  public startAttractorAnalysis(): void {
    const model = LiveModel.Export.exportAeon();

    try {
      this.computationCanStart(model);
    } catch (error: any) {
      console.log('Error starting computation:', error.message);
      Message.showError(error.message);
      return;
    }

    // Todo delete old results
    this.computeEngine.startAttractorAnalysis(model, this.setComputationStatus);
  }

  // #endregion

  // #region --- Attractor Bifurcation Explorer ---

  /** Callback for fetching the bifurcation tree.
   * Sets the bifurcation tree in the AttractorBifurcationExplorer.
   * @param fit - (boolean) Determines whether to fit the tree in the view of AttractorBifurcationExplorer */
  private getBifurcationTreeCallback(
    error: string | undefined,
    nodes: NodeDataBE[] | undefined,
    fit: boolean
  ): void {
    if (error || !nodes) {
      Message.showError(
        `Error fetching bifurcation tree: ${error ?? 'Internal error'}`
      );
    } else {
      AttractorBifurcationExplorer.insertBifurcationTree(nodes, fit);
    }

    Loading.endLoading();
  }

  /** Fetches the bifurcation tree from the compute engine.
   * @param fit - (boolean) Determines whether to fit the tree in the view of AttractorBifurcationExplorer.
   */
  public getBifurcationTree(fit: boolean): void {
    Loading.startLoading();
    this.computeEngine.getBifurcationTree((error, nodes) =>
      this.getBifurcationTreeCallback(error, nodes, fit)
    );
  }

  /** Callback for setting the bifurcation tree precision. Checks for errors and updates the UI accordingly. */
  private setBifurcationTreePrecisionCallback(error: string | undefined): void {
    if (error) {
      Message.showError(`Error setting bifurcation tree precision: ${error}`);
      return;
    }

    this.getBifurcationTree(false);
  }

  /** Sets the precision of the bifurcation tree. */
  public setBifurcationTreePrecision(precision: number): void {
    this.computeEngine.setBifurcationTreePrecision(
      precision,
      this.setBifurcationTreePrecisionCallback.bind(this)
    );
  }

  /** Callback for auto-expanding the bifurcation tree. Sets the expanded nodes in the AttractorBifurcationExplorer and unselects selected node. */
  private autoExpandBifurcationTreeCallback(
    error: string | undefined,
    nodes: NodeDataBE[] | undefined
  ): void {
    if (error || !nodes) {
      Message.showError(
        `Error auto-expanding bifurcation tree: ${error ?? 'Internal error'}`
      );
    } else {
      AttractorBifurcationExplorer.insertBifurcationTree(nodes, true);
    }

    AttractorBifurcationExplorer.refreshSelection();

    Loading.endLoading();
  }

  /** Automatically expands the bifurcation tree at the given node and depth. */
  public autoExpandBifurcationTree(nodeId: number, depth: number): void {
    Loading.startLoading();
    this.computeEngine.autoExpandBifurcationTree(
      nodeId,
      depth,
      this.autoExpandBifurcationTreeCallback.bind(this)
    );
  }

  /** Callback for deleting a bifurcation decision. */
  private deleteBifurcationDecisionCallback(
    error: string | undefined,
    node: NodeDataBE | undefined,
    removed: number[] | undefined
  ): void {
    if (error || !node) {
      Message.showError(
        `Error deleting bifurcation decision: ${error ?? 'Internal error'}`
      );
    } else {
      if (!removed || removed.length === 0) {
        Message.showInfo(
          `Bifurcation decision for node ${node.id} was deleted, but no nodes were removed.`
        );
      }
      AttractorBifurcationExplorer.removeFromCytoscape(node, removed ?? []);
    }

    Loading.endLoading();
  }

  /** Deletes a bifurcation decision by node ID. */
  public deleteBifurcationDecision(nodeId: number): void {
    Loading.startLoading();
    this.computeEngine.deleteBifurcationDecision(
      nodeId,
      this.deleteBifurcationDecisionCallback.bind(this)
    );
  }

  /** Callback for fetching stability data. */
  private getStabilityDataCallback(
    error: string | undefined,
    data: Array<StabilityAnalysisVariable> | undefined
  ): void {
    if (error || !data) {
      Message.showError(
        `Error fetching stability data: ${error ?? 'Internal error'}`
      );
    } else {
      useBifurcationExplorerStatus.getState().loadStabilityData(data);
    }

    Loading.endLoading();
  }

  /** Fetches the stability data for a specific node and behaviour.
   * @param nodeId - (number) The ID of the node to fetch stability data for.
   * @param behaviour - (StabilityAnalysisModes) The behaviour mode to use for fetching stability data.
   */
  public getStabilityData(
    nodeId: number,
    behaviour: StabilityAnalysisModes
  ): void {
    Loading.startLoading();
    this.computeEngine.getStabilityData(
      nodeId,
      behaviour,
      this.getStabilityDataCallback.bind(this)
    );
  }

  /** Callback for fetching decisions. */
  public getDecisionsCallback(
    error: string | undefined,
    decisions: Decisions | undefined
  ) {
    if (error || !decisions) {
      Message.showError(
        `Error fetching decisions: ${error ?? 'Internal error'}`
      );
    } else {
      const formatedDecisions =
        AttractorBifurcationExplorer.formatClassesDecisions(decisions);
      useBifurcationExplorerStatus.getState().loadDecisions(formatedDecisions);
    }

    Loading.endLoading();
  }

  /** Fetches the decisions for a specific node. */
  public getDecisions(nodeId: number): void {
    Loading.startLoading();
    this.computeEngine.getDecisions(
      nodeId,
      this.getDecisionsCallback.bind(this)
    );
  }

  // #endregion

  // #region --- Control Computation ---

  public startControlComputation(): void {
    const model = LiveModel.Export.exportAeon();

    const oscillation = LiveModel.Control.getOscillation() ?? 'Allowed';

    try {
      this.computationCanStart(model);
    } catch (error: any) {
      console.log('Error starting computation:', error.message);
      Message.showError(error.message);
      return;
    }

    // Todo delete old results
    this.computeEngine.startControlComputation(
      model,
      oscillation,
      this.getMinRobustness(),
      this.getMaxSize(),
      this.getMaxNumberOfResults(),
      this.setComputationStatus
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
    if (type) {
      useResultsStatus.getState().setType(type);
    }

    if (results) {
      useResultsStatus.getState().setResults(results);
    }

    if (error) {
      Message.showError(error);
    }

    if (warning) {
      Message.showInfo(warning);
    }
  }

  // #endregion
}

const ComputationManager: ComputationManagerClass =
  new ComputationManagerClass();

export default ComputationManager;
