import type { TrapSpaceSDStatusState } from '../../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type { DecisionsTSSD, NodeDataTSSD } from '../../../types';
import type { ComputationManagerInt } from '../../global/ComputationManager/ComputationManagerInt';
import type { MessageInt } from '../../global/Message/MessageInt';
import CytoscapeTSSD from '../TrapSpaceSDVisualization/CytoscapeTSSD';
import type { TrapSpaceSuccessionDiagramInt } from './TrapSpaceSuccessionDiagramInt';

class TrapSpaceSuccessionDiagram implements TrapSpaceSuccessionDiagramInt {
  private isEmpty: boolean;

  private visualization: CytoscapeTSSD;

  private computationManagerServ: ComputationManagerInt;

  private trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;

  constructor(
    messageServ: MessageInt,
    computationManagerServ: ComputationManagerInt,

    trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>
  ) {
    this.isEmpty = true;
    this.visualization = new CytoscapeTSSD(messageServ, trapSpaceSDStatusStore);

    this.computationManagerServ = computationManagerServ;

    this.trapSpaceSDStatusStore = trapSpaceSDStatusStore;
  }

  public init(container: HTMLDivElement): void {
    this.visualization.init(container);
  }

  // #region --- Succession diagram management ---

  /** Opens the succession diagram, loading it if necessary. */
  public openSuccessionDiagram(): void {
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

  public refreshSelection(): void {
    this.visualization.refreshSelection();
  }

  // #endregion

  // #region --- Make Decision ---

  /** Gets decisions for a specific node. Decisions */
  public getDecisions(nodeId: number): void {
    this.computationManagerServ.getDecisionsTSSD(
      nodeId,
      (decisions: DecisionsTSSD) => {
        this.trapSpaceSDStatusStore.getState().setAvailableDecisions(decisions);
      }
    );
  }

  /** Make decision for a specific node. */
  public makeDecision(nodeId: number, decisionId: number): void {
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
