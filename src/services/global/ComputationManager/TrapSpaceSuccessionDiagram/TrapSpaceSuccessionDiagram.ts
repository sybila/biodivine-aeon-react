import type { DecisionsTSSD, NodeDataTSSD } from '../../../../types/types';
import type { ComputeEngineInt } from '../../ComputeEngine/ComputeEngineInt';
import type { LoadingInt } from '../../Loading/LoadingInt';
import type { MessageInt } from '../../Message/MessageInt';
import type { TrapSpaceSuccessionDiagramInt } from './TrapSpaceSuccessionDiagramInt';

class TrapSpaceSuccessionDiagram implements TrapSpaceSuccessionDiagramInt {
  // #region --- Props + Constructor ---

  private messageServ: MessageInt;
  private loadingServ: LoadingInt;
  private computeEngine: ComputeEngineInt;
  private getModelString: () => string | undefined;

  private computationCanStart: (
    model: string | undefined
  ) => asserts model is string;

  constructor(
    messageServ: MessageInt,
    loadingServ: LoadingInt,
    computeEngine: ComputeEngineInt,
    getModelString: () => string | undefined,
    computationCanStart: (model: string | undefined) => asserts model is string
  ) {
    this.messageServ = messageServ;
    this.loadingServ = loadingServ;
    this.computeEngine = computeEngine;
    this.getModelString = getModelString;

    this.computationCanStart = computationCanStart;
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
    const model = this.getModelString();

    try {
      // Todo - change the mode string to a specific one for TSSD when we have more computations using TSSD
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
}

export default TrapSpaceSuccessionDiagram;
