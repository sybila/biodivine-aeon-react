import type {
  DecisionNodeTypeTSSD,
  NodeDataTSSDWithMotifs,
  NodesWithParentInfoTSSD,
  NodeTypeTSSD,
} from '../../../../types/types';
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
    rootNode: NodeDataTSSDWithMotifs | undefined,
    insertSuccessionDiagramFunction: (node: NodeDataTSSDWithMotifs) => void
  ): void {
    if (error || !rootNode) {
      this.messageServ.showError(
        `Error fetching trap space succession diagram: ${error ?? 'Internal error'}`
      );
    } else {
      insertSuccessionDiagramFunction(rootNode);
    }

    this.loadingServ.endLoading();
  }

  public getTrapSpaceSuccessionDiagram(
    insertSuccessionDiagramFunction: (rootNode: NodeDataTSSDWithMotifs) => void
  ): void {
    const model = this.getModelString();

    try {
      // Todo - change the mode string to a specific one for TSSD when we have more computations using TSSD
      this.computationCanStart(model);
    } catch (error: unknown) {
      this.messageServ.showError((error as Error).message);
      return;
    }

    this.computeEngine.TrapSpaceSuccessionDiagram.getTrapSpaceSuccessionDiagram(
      model,
      (
        error: string | undefined,
        rootNode: NodeDataTSSDWithMotifs | undefined
      ) =>
        this.getSuccessionDiagramCallback(
          error,
          rootNode,
          insertSuccessionDiagramFunction
        )
    );
  }

  private getDecisionsCallback(
    error: string | undefined,
    decisions: NodesWithParentInfoTSSD | undefined,
    setDecisionsFunction: (decisions: NodesWithParentInfoTSSD) => void
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

  public getDecisions(
    sourceId: number,
    sourceType: DecisionNodeTypeTSSD,
    setDecisionsFunction: (decisions: NodesWithParentInfoTSSD) => void
  ): void {
    this.loadingServ.startLoading();
    this.computeEngine.TrapSpaceSuccessionDiagram.getDecisionsTSSD(
      sourceId,
      sourceType,
      (error, decisions) =>
        this.getDecisionsCallback(error, decisions, setDecisionsFunction)
    );
  }

  private makeDecisionCallback(
    error: string | undefined,
    nodesToAdd: NodesWithParentInfoTSSD | undefined,
    addNodesIntoSuccessionDiagramFunction: (
      nodesToAdd: NodesWithParentInfoTSSD
    ) => void
  ): void {
    if (error || !nodesToAdd) {
      this.messageServ.showError(
        `Error making decision: ${error ?? 'Internal error'}`
      );
    } else {
      addNodesIntoSuccessionDiagramFunction(nodesToAdd);
    }

    this.loadingServ.endLoading();
  }

  public makeDecision(
    sourceId: number,
    sourceType: DecisionNodeTypeTSSD,
    targetIds: Array<number>,
    addNodesIntoSuccessionDiagramFunction: (
      nodesToAdd: NodesWithParentInfoTSSD
    ) => void
  ): void {
    this.loadingServ.startLoading();
    this.computeEngine.TrapSpaceSuccessionDiagram.makeDecisionTSSD(
      sourceId,
      sourceType,
      targetIds,
      (error, nodesToAdd) =>
        this.makeDecisionCallback(
          error,
          nodesToAdd,
          addNodesIntoSuccessionDiagramFunction
        )
    );
  }

  private deleteNodeCallback(
    error: string | undefined,
    originalNodeId: number | undefined,
    removedNodeType: NodeTypeTSSD | undefined,
    removedNodeId: number | undefined,
    removeNodesFromVisualizationFunction: (
      removedNodeId: number,
      removedNodeType: NodeTypeTSSD
    ) => void
  ): void {
    if (
      error ||
      removedNodeId == undefined ||
      originalNodeId == undefined ||
      removedNodeType == undefined ||
      removedNodeId != originalNodeId
    ) {
      this.messageServ.showError(
        `Error deleting decision: ${error ?? 'Internal error'}`
      );
    } else {
      removeNodesFromVisualizationFunction(removedNodeId, removedNodeType);
    }

    this.loadingServ.endLoading();
  }

  public deleteNode(
    nodeId: number,
    nodeType: NodeTypeTSSD,
    removeNodesFromVisualizationFunction: (
      removedNodeId: number,
      removedNodeType: NodeTypeTSSD
    ) => void
  ): void {
    this.loadingServ.startLoading();
    this.computeEngine.TrapSpaceSuccessionDiagram.deleteNodeTSSD(
      nodeId,
      nodeType,
      (error, originalNodeId, removedNodeType, removedNodeId) => {
        this.deleteNodeCallback(
          error,
          originalNodeId,
          removedNodeType,
          removedNodeId,
          removeNodesFromVisualizationFunction
        );
      }
    );
  }

  // #endregion
}

export default TrapSpaceSuccessionDiagram;
