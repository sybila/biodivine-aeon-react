import type { TrapSpaceSDStatusState } from '../../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type { DecisionsTSSD, NodeDataTSSD } from '../../../types/types';
import type { ComputationManagerInt } from '../../global/ComputationManager/ComputationManagerInt';
import type { MessageInt } from '../../global/Message/MessageInt';
import type { DataFormatersInt } from '../../utilities/DataFormaters/DataFormatersInt';
import CytoscapeTSSD from '../TrapSpaceSDVisualization/CytoscapeTSSD';
import type { TrapSpaceSuccessionDiagramInt } from './TrapSpaceSuccessionDiagramInt';

class TrapSpaceSuccessionDiagram implements TrapSpaceSuccessionDiagramInt {
  private isEmpty: boolean;

  private visualization: CytoscapeTSSD;

  private computationManagerServ: ComputationManagerInt;

  private trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;

  constructor(
    messageServ: MessageInt,
    dataFormatersServ: DataFormatersInt,
    computationManagerServ: ComputationManagerInt,

    trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>
  ) {
    this.isEmpty = true;
    this.visualization = new CytoscapeTSSD(
      messageServ,
      dataFormatersServ,
      trapSpaceSDStatusStore
    );

    this.computationManagerServ = computationManagerServ;

    this.trapSpaceSDStatusStore = trapSpaceSDStatusStore;
  }

  public init(container: HTMLDivElement) {
    this.visualization.init(container);
  }

  // #region --- Succession diagram management ---

  public openSuccessionDiagram() {
    if (this.isEmpty) {
      const hasSavedVisualizationStatus =
        this.trapSpaceSDStatusStore.getState().visualizationStatus !== null;
      this.computationManagerServ.getTrapSpaceSuccessionDiagram(
        (nodeList: NodeDataTSSD[]) => {
          this.insertSuccessionDiagram(
            nodeList,
            !hasSavedVisualizationStatus,
            !hasSavedVisualizationStatus
          );
        }
      );
    }
  }

  public insertSuccessionDiagram(
    nodeList: NodeDataTSSD[],
    fit: boolean = true,
    animate: boolean = true,
    clearCytoscape: boolean = true
  ): void {
    if (nodeList !== undefined && nodeList.length > 0) {
      if (clearCytoscape) this.visualization.removeAll();
      for (const n of nodeList) {
        this.visualization.ensureNode(n);
      }
      for (const n of nodeList) {
        for (const childId of n.childNodeIds) {
          this.visualization.ensureEdge(n.id, childId);
        }
      }
      // Do not auto-fit when restoring a previously saved pan/zoom state.
      this.visualization.applyTreeLayout(fit, animate);
    }
  }

  // #endregion

  // #region --- Node Operations ---

  public refreshSelection() {
    this.visualization.refreshSelection();
  }

  /** Removes nodes from visualization.
   *  @param node - (NodeDataTSSD | undefined) The node which will be selected after the removal. If undefined, no node will be selected.
   *  @param removedNodes - (number[]) List of IDs of removed nodes. These nodes will be removed from the visualization.
   */
  private removeFromVisualization(
    node: NodeDataTSSD | undefined,
    removedNodes: number[]
  ) {
    if (removedNodes.length > 0) {
      for (const removed of removedNodes) {
        this.visualization.removeNode(removed.toString());
      }
    }
    if (node !== undefined) {
      this.visualization.ensureNode(node);
      this.visualization.refreshSelection(node.id.toString());
    } else {
      this.visualization.refreshSelection();
    }
  }

  public removeNode(nodeId: number) {
    this.computationManagerServ.deleteDecisionTSSD(nodeId, (node, removed) => {
      this.removeFromVisualization(node, removed);
    });
  }

  // #endregion

  // #region --- Make Decision ---

  public getDecisions(nodeId: number) {
    this.computationManagerServ.getDecisionsTSSD(
      nodeId,
      (decisions: DecisionsTSSD) => {
        this.trapSpaceSDStatusStore.getState().setAvailableDecisions(decisions);
      }
    );
  }

  public makeDecision(nodeId: number, decisionId: number) {
    this.computationManagerServ.makeDecisionTSSD(
      nodeId,
      decisionId,
      (nodes) => {
        this.insertSuccessionDiagram(nodes, true, false);
      }
    );
  }

  // #endregion
}

export default TrapSpaceSuccessionDiagram;
