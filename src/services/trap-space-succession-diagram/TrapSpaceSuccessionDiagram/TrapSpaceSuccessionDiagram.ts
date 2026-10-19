import type { TrapSpaceSDStatusState } from '../../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import { isErr } from '../../../types/result';
import type {
  DecisionNodeTypeTSSD,
  NodeDataTSSD,
  NodeDataTSSDWithMotifs,
  NodesWithParentInfoTSSD,
  NodeTypeTSSD,
  NodeWithChildrenAndTypeTSSD,
  StableMotifInfo,
  VisualizationStatus,
} from '../../../types/types';
import type { ComputationManagerInt } from '../../global/ComputationManager/ComputationManagerInt';
import type { MessageInt } from '../../global/Message/MessageInt';
import type { TrapSpaceSDPageStringsInt } from '../../global/StringProvider/TrapSpaceSDPageStrings/TrapSpaceSDPageStringsInt';
import type { TrapSpaceSuccessionDiagramWarningsInt } from '../../global/Warning/TrapSpaceSuccessionDiagramWarnings/TrapSpaceSuccessionDiagramWarningsInt';
import type { DataFormatersInt } from '../../utilities/DataFormaters/DataFormatersInt';
import CytoscapeTSSD from '../TrapSpaceSDVisualization/CytoscapeTSSD';
import type { TrapSpaceSDVisualizationInt } from '../TrapSpaceSDVisualization/TrapSpaceSDVisualizationInt';
import type { TrapSpaceSuccessionDiagramInt } from './TrapSpaceSuccessionDiagramInt';

class TrapSpaceSuccessionDiagram implements TrapSpaceSuccessionDiagramInt {
  private isEmpty: boolean;

  private visualization: TrapSpaceSDVisualizationInt;

  private computationManagerServ: ComputationManagerInt;
  private pageWarningServ: TrapSpaceSuccessionDiagramWarningsInt;
  private pageStringProviderServ: TrapSpaceSDPageStringsInt;
  private messageServ: MessageInt;

  private trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;

  constructor(
    dataFormatersServ: DataFormatersInt,
    computationManagerServ: ComputationManagerInt,
    pageWarningServ: TrapSpaceSuccessionDiagramWarningsInt,
    pageStringProviderServ: TrapSpaceSDPageStringsInt,
    messageServ: MessageInt,

    trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>
  ) {
    this.isEmpty = true;
    this.visualization = new CytoscapeTSSD(
      messageServ,
      dataFormatersServ,
      trapSpaceSDStatusStore
    );

    this.visualization.setRemoveNodeFunction((nodeId, nodeType) =>
      this.removeNode(nodeId, nodeType)
    );

    this.computationManagerServ = computationManagerServ;
    this.pageWarningServ = pageWarningServ;
    this.pageStringProviderServ = pageStringProviderServ;
    this.messageServ = messageServ;

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
        (rootNode: NodeDataTSSDWithMotifs) => {
          this.insertSuccessionDiagram(
            rootNode,
            !hasSavedVisualizationStatus,
            !hasSavedVisualizationStatus
          );
        }
      );
    }
  }

  private insertSuccessionDiagramRec(currentNode: NodeWithChildrenAndTypeTSSD) {
    this.visualization.ensureNode(currentNode);

    if (currentNode.type == 'stable-motif') {
      currentNode.nodeInfo.targetTrapSpaces.forEach((trapSpace) => {
        this.insertSuccessionDiagramRec({
          type: trapSpace.type,
          nodeInfo: trapSpace,
        });
        this.visualization.ensureEdge(currentNode.nodeInfo.id, trapSpace.id);
      });
    } else {
      currentNode.nodeInfo.stableMotifs.forEach((stableMotif) => {
        this.insertSuccessionDiagramRec({
          type: 'stable-motif',
          nodeInfo: stableMotif,
        });
        this.visualization.ensureEdge(currentNode.nodeInfo.id, stableMotif.id);
      });
    }
  }

  public insertSuccessionDiagram(
    rootNode: NodeDataTSSDWithMotifs,
    fit: boolean = true,
    animate: boolean = true,
    clearCytoscape: boolean = true
  ): void {
    if (clearCytoscape) this.visualization.removeAll();

    this.insertSuccessionDiagramRec({
      type: rootNode.type,
      nodeInfo: rootNode,
    });
    // Do not auto-fit when restoring a previously saved pan/zoom state.
    this.visualization.applyTreeLayout(fit, animate);
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
      this.visualization.refreshSelection(selectedItem);
    } else if (selectRootNodeFallback) {
      this.visualization.selectRootNode();
    }
  }

  // #endregion

  // #region --- Node Operations ---

  public refreshSelection() {
    this.visualization.refreshSelection();
  }

  /** Removes node from visualization and check if there was an error.
   *  If error occured shows error message.
   */
  private removeNodeWithError(
    removedNodeId: number,
    removedNodeType: NodeTypeTSSD
  ): boolean {
    const removeRes = this.visualization.removeNode(
      removedNodeId,
      removedNodeType
    );

    if (isErr(removeRes)) {
      this.messageServ.showError(
        'Error when removing node: ' + removeRes.error + ' (Internal Error)'
      );
      return false;
    }

    return true;
  }

  /** Recursively removes node and its children. */
  private removeNodeRecursive(
    removedNodeId: number,
    removedNodeType: NodeTypeTSSD
  ): void {
    const childResult = this.visualization.getChildNodes(
      removedNodeId,
      removedNodeType
    );

    this.removeNodeWithError(removedNodeId, removedNodeType);

    if (isErr(childResult)) {
      this.messageServ.showError(
        'Error when removing node: ' + childResult.error + ' (Internal Error)'
      );
      return;
    }

    const children = childResult.value;

    if (children.nodes.length == 0) {
      return;
    }

    if (children.parentType == 'trap-space-decision') {
      children.nodes.forEach((node) =>
        this.removeNodeRecursive(node.id, 'stable-motif')
      );
    } else {
      children.nodes.forEach((node) =>
        this.removeNodeRecursive(node.id, node.type)
      );
    }
  }

  /** Removes nodes from visualization.
   *  @param removedNodeId - (number) Id of the node, which was removed.
   *  @param removedNodeType - (NodeTypeTSSD) type of the removed node
   */
  private removeFromVisualization(
    removedNodeId: number,
    removedNodeType: NodeTypeTSSD
  ) {
    this.removeNodeRecursive(removedNodeId, removedNodeType);
    this.visualization.refreshSelection();
  }

  public removeNode(nodeId: number, nodeType: NodeTypeTSSD) {
    this.computationManagerServ.TrapSpaceSuccessionDiagram.deleteNode(
      nodeId,
      nodeType,
      (removedNodeId, removedNodeType) => {
        this.removeFromVisualization(removedNodeId, removedNodeType);
      }
    );
  }

  // #endregion

  // #region --- Make Decision ---

  private withoutSelected(
    decisions: NodesWithParentInfoTSSD,
    selectedIdSet: Set<number>
  ): NodesWithParentInfoTSSD {
    if (decisions.parentType === 'stable-motif') {
      return {
        ...decisions,
        nodes: decisions.nodes.filter((node) => !selectedIdSet.has(node.id)),
      };
    }
    return {
      ...decisions,
      nodes: decisions.nodes.filter((node) => !selectedIdSet.has(node.id)),
    };
  }

  private filterOutAlreadySelectedDecisions(
    decisions: NodesWithParentInfoTSSD
  ): NodesWithParentInfoTSSD | undefined {
    const childrenNodesRes = this.visualization.getChildNodes(
      decisions.parentId,
      decisions.parentType
    );

    if (isErr(childrenNodesRes)) {
      this.messageServ.showError(
        'Failed to filter opened decisions: Available decisions list may contain already selected ones.'
      );
      return undefined;
    }

    const childrenIdSet = new Set(
      childrenNodesRes.value.nodes.map((node) => node.id)
    );

    return this.withoutSelected(decisions, childrenIdSet);
  }

  public getDecisions(nodeId: number, nodeType: DecisionNodeTypeTSSD) {
    this.computationManagerServ.TrapSpaceSuccessionDiagram.getDecisions(
      nodeId,
      nodeType,
      (decisions: NodesWithParentInfoTSSD) => {
        const filteredDecisions =
          this.filterOutAlreadySelectedDecisions(decisions);

        this.trapSpaceSDStatusStore
          .getState()
          .setAvailableDecisions(filteredDecisions ?? decisions);
      }
    );
  }

  public makeDecision(
    sourceNodeId: number,
    sourceNodeType: DecisionNodeTypeTSSD,
    selectedNodeIds: Array<number>
  ) {
    const currentDecisions =
      this.trapSpaceSDStatusStore.getState().availableDecisions;

    const selectedIdSet = new Set(selectedNodeIds);

    if (currentDecisions != null) {
      this.trapSpaceSDStatusStore
        .getState()
        .setAvailableDecisions(
          this.withoutSelected(currentDecisions, selectedIdSet)
        );
    }

    this.computationManagerServ.TrapSpaceSuccessionDiagram.makeDecision(
      sourceNodeId,
      sourceNodeType,
      selectedNodeIds,
      (nodesToAdd) => {
        nodesToAdd.nodes.forEach((node) => {
          if (nodesToAdd.parentType == 'stable-motif') {
            const trapSpaceNode = node as NodeDataTSSD;

            this.visualization.ensureNode({
              type: trapSpaceNode.type,
              nodeInfo: trapSpaceNode,
            });
          } else {
            const stableMotifNode = node as StableMotifInfo;

            this.visualization.ensureNode({
              type: 'stable-motif',
              nodeInfo: stableMotifNode,
            });
          }

          this.visualization.ensureEdge(nodesToAdd.parentId, node.id);
        });

        this.visualization.applyTreeLayout(true, false);
      }
    );
  }

  // #endregion

  // #region --- Attractor Classes --

  public getAttractorClasses(nodeId: number, nodeType: NodeTypeTSSD) {
    // TODO - change into computation manager call
    this.trapSpaceSDStatusStore.getState().setComputedAttractorClasses([
      {
        numberOfInterpretations: 42,
        classBehavior: ['Disorder'],
      },
      {
        numberOfInterpretations: 15,
        classBehavior: ['Stability'],
      },
      {
        numberOfInterpretations: 89,
        classBehavior: ['Oscillation'],
      },
      {
        numberOfInterpretations: 23,
        classBehavior: ['Stability', 'Stability'],
      },
      {
        numberOfInterpretations: 67,
        classBehavior: ['Stability', 'Oscillation'],
      },
      {
        numberOfInterpretations: 11,
        classBehavior: ['Stability', 'Disorder'],
      },
      {
        numberOfInterpretations: 45,
        classBehavior: ['Oscillation', 'Disorder'],
      },
      {
        numberOfInterpretations: 32,
        classBehavior: ['Oscillation', 'Oscillation'],
      },
      {
        numberOfInterpretations: 98,
        classBehavior: ['Disorder', 'Disorder'],
      },
      {
        numberOfInterpretations: 56,
        classBehavior: ['Stability', 'Stability', 'Oscillation'],
      },
      {
        numberOfInterpretations: 19,
        classBehavior: ['Stability', 'Stability', 'Disorder'],
      },
    ]);
  }

  public openAttractorVisualization(classBehavior: string) {}

  public openWitness(classBehavior: string) {}

  // #endregion

  // #region --- Visual Options ---

  public getSwitchableOptionsState() {
    return this.visualization.getSetVisualOptions();
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
