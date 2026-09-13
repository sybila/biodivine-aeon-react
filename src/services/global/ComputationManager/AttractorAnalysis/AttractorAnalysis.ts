import type { BifurcationExplorerStatusState } from '../../../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type {
  AttractorData,
  ComputationStatus,
  Decisions,
  NodeDataBE,
  StabilityAnalysisModes,
  StabilityAnalysisVariable,
} from '../../../../types/types';
import type { AttractorBifurcationExplorerInt } from '../../../attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt';
import type { AttractorVisualizerInt } from '../../../attractor-visualizer/AttractorVisualizerInt';
import type { ComputeEngineInt } from '../../ComputeEngine/ComputeEngineInt';
import type { LoadingInt } from '../../Loading/LoadingInt';
import type { MessageInt } from '../../Message/MessageInt';
import type { AttractorAnalysisInt } from './AttractorAnalysisInt';

class AttractorAnalysis implements AttractorAnalysisInt {
  // #region --- Props + Constructor ---

  private messageServ: MessageInt;
  private loadingServ: LoadingInt;
  private computeEngine: ComputeEngineInt;
  private getModelString: () => string | undefined;

  private bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>;

  private computationCanStart: (
    model: string | undefined
  ) => asserts model is string;
  private setComputationStatus: (
    warning: string | undefined,
    error: string | undefined,
    computeEngineStatus: string | undefined,
    computationStatus: ComputationStatus | undefined,
    color: string | undefined
  ) => void;

  constructor(
    messageServ: MessageInt,
    loadingServ: LoadingInt,
    computeEngine: ComputeEngineInt,
    getModelString: () => string | undefined,
    bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>,
    computationCanStart: (model: string | undefined) => asserts model is string,
    setComputationStatus: (
      warning: string | undefined,
      error: string | undefined,
      computeEngineStatus: string | undefined,
      computationStatus: ComputationStatus | undefined,
      color: string | undefined
    ) => void
  ) {
    this.messageServ = messageServ;
    this.loadingServ = loadingServ;
    this.computeEngine = computeEngine;
    this.getModelString = getModelString;

    this.bifurcationExplorerStatusStore = bifurcationExplorerStatusStore;

    this.computationCanStart = computationCanStart;
    this.setComputationStatus = setComputationStatus;
  }

  // #region --- Attractor Analysis Computation ---

  public startAttractorAnalysis() {
    
    const model = this.getModelString();

    try {
      this.computationCanStart(model);
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
}

export default AttractorAnalysis;
