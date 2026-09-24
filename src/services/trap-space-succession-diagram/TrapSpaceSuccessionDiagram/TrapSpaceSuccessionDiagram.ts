import type { TrapSpaceSDStatusState } from '../../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type {
  DecisionsTSSD,
  DecisionTSSD,
  NodeDataTSSDWithMotifs,
  VisualizationStatus,
} from '../../../types/types';
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

    this.visualization.setRemoveNodeFunction((node) =>
      computationManagerServ.TrapSpaceSuccessionDiagram.deleteDecisionTSSD(
        node,
        (node, removed) => {
          this.removeFromVisualization(node, removed);
        }
      )
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
      this.computationManagerServ.TrapSpaceSuccessionDiagram.getTrapSpaceSuccessionDiagram(
        (nodeList: NodeDataTSSDWithMotifs[]) => {
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
    nodeList: NodeDataTSSDWithMotifs[],
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
        for (const motif of n.stableMotifs) {
          this.visualization.ensureEdge(n.id, motif.targetNodeId, motif);
        }
      }
      // Do not auto-fit when restoring a previously saved pan/zoom state.
      this.visualization.applyTreeLayout(fit, animate);
    }
  }

  // #endregion

  // #region --- Visualization Status ---

  public saveVisualizationStatus() {
    const status: VisualizationStatus =
      this.visualization.getVisualizationStatus();

    this.trapSpaceSDStatusStore.getState().setVisualizationStatus(status);
  }

  public restoreVisualizationState(selectRootNodeFallback: boolean = false) {
    const status = this.trapSpaceSDStatusStore.getState().visualizationStatus;
    const selectedItem = this.trapSpaceSDStatusStore.getState().selectedItem;

    if (status) {
      this.visualization.loadVisualizationStatus(status);
    }

    if (selectedItem) {
      this.visualization.refreshSelection({
        targetId: selectedItem.data.id.toString(),
        type: selectedItem.type,
      });
    } else if (selectRootNodeFallback) {
      this.visualization.selectRootNode();
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
    node: NodeDataTSSDWithMotifs | undefined,
    removedNodes: number[]
  ) {
    if (removedNodes.length > 0) {
      for (const removed of removedNodes) {
        this.visualization.removeNode(removed.toString());
      }
    }
    if (node !== undefined) {
      this.visualization.ensureNode(node);
      this.visualization.refreshSelection({
        targetId: node.id.toString(),
        type: 'node',
      });
    } else {
      this.visualization.refreshSelection();
    }
  }

  public removeNode(node: NodeDataTSSDWithMotifs) {
    this.computationManagerServ.TrapSpaceSuccessionDiagram.deleteDecisionTSSD(
      node,
      (node, removed) => {
        this.removeFromVisualization(node, removed);
      }
    );
  }

  // #endregion

  // #region --- Make Decision ---

  public getDecisions(nodeId: number) {
    this.computationManagerServ.TrapSpaceSuccessionDiagram.getDecisionsTSSD(
      nodeId,
      (decisions: DecisionsTSSD) => {
        this.trapSpaceSDStatusStore.getState().setAvailableDecisions(decisions);
      }
    );
  }

  public makeDecision(
    sourceNodeId: number,
    selectedDecision: DecisionTSSD,
    selectedNodeId: number
  ) {
    this.computationManagerServ.TrapSpaceSuccessionDiagram.makeDecisionTSSD(
      selectedNodeId,
      selectedDecision.id,
      (node) => {
        const nodeWithMotifs = { ...node, stableMotifs: [] };

        this.visualization.ensureNode(nodeWithMotifs);
        this.visualization.ensureEdge(sourceNodeId, node.id, selectedDecision);
        this.visualization.applyTreeLayout(true, false);
      }
    );
  }

  // #endregion

  // #region --- Visual Options ---

  public getSwitchableOptionsState() {
    return this.visualization.getSwitchLayoutOptions();
  }

  public toggleSnapNodesToLayers() {
    this.visualization.toggleSnapNodesToLayers();
  }

  public toggleAnimateLayoutChanges() {
    this.visualization.toggleAnimateLayoutChanges();
  }

  // #endregion

  // #region --- Visualization Operations ---

  public setZoom(zoomLevel: number) {
    this.visualization.setZoom(zoomLevel);

    this.saveVisualizationStatus();
  }

  public fitTree() {
    this.visualization.fit();
  }

  public resetTreeLayout() {
    this.visualization.resetTreeLayout();
  }

  // #endregion
}

export default TrapSpaceSuccessionDiagram;
