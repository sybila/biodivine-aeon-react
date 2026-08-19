import type { BifurcationExplorerStatusState } from '../../../stores/AttractorBifurcationExplorer/BifurcationExplorerStatusState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import { err, ok } from '../../../types/result';
import type {
  Decisions,
  NodeDataBE,
  StabilityAnalysisModes,
  VisualizationStatus,
  VisualOptionsSwitchableABE,
} from '../../../types/types';
import type { AttractorVisualizerInt } from '../../attractor-visualizer/AttractorVisualizerInt';
import type { ComputationManagerInt } from '../../global/ComputationManager/ComputationManagerInt';
import type { MessageInt } from '../../global/Message/MessageInt';
import type { AttractorBifurcationTreeVisualizationInt } from '../AttractorBifurcationTreeVisualization/AttractorBifurcationTreeVisualizationInt';
import type { AttractorBifurcationExplorerInt } from './AttractorBifurcationExplorerInt';

// Sorting constants
const SORT_INFORMATION_GAIN = 'sort-information-gain';
const SORT_TOTAL_CLASSES = 'sort-total-classes';
const SORT_POSITIVE = 'sort-positive';
const SORT_POSITIVE_MAJORITY = 'sort-positive-majority';
const SORT_NEGATIVE = 'sort-negative';
const SORT_NEGATIVE_MAJORITY = 'sort-negative-majority';
const SORT_ALPHABETICAL = 'sort-alphabetical';

const SORTS = [
  SORT_INFORMATION_GAIN,
  SORT_TOTAL_CLASSES,
  SORT_POSITIVE,
  SORT_POSITIVE_MAJORITY,
  SORT_NEGATIVE,
  SORT_NEGATIVE_MAJORITY,
  SORT_ALPHABETICAL,
];

class AttractorBifurcationExplorer implements AttractorBifurcationExplorerInt {
  // #region --- Properties + Constructor ---

  /** Last set precision in the VisualOptions of AttractorExplorer.
   *  Default precision is 100%
   */
  private precision: number = 100;

  /** Indicates whether the bifurcation tree is empty (not loaded). */
  private isEmpty = true;

  private computationManagerServ: ComputationManagerInt;
  private cytoscape: AttractorBifurcationTreeVisualizationInt;
  private attractorVisualizerServ: AttractorVisualizerInt;
  private messageServ: MessageInt;

  private bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>;

  constructor(
    computationManagerServ: ComputationManagerInt,
    attractorVisualizerServ: AttractorVisualizerInt,
    messageServ: MessageInt,
    attractorBifurcationTreeVisualization: AttractorBifurcationTreeVisualizationInt,
    bifurcationExplorerStatusStore: ZustandStore<BifurcationExplorerStatusState>
  ) {
    this.cytoscape = attractorBifurcationTreeVisualization;
    this.computationManagerServ = computationManagerServ;
    this.messageServ = messageServ;
    this.attractorVisualizerServ = attractorVisualizerServ;

    this.bifurcationExplorerStatusStore = bifurcationExplorerStatusStore;

    this.cytoscape.setMathDimPercentFunction(
      (subsetSize: number, totalSize: number) => {
        return this.mathDimPercent(subsetSize, totalSize);
      }
    );
    this.cytoscape.setRemoveNodeFunction((nodeId: number) => {
      return this.removeNode(nodeId);
    });
    this.cytoscape.setSaveVisualizationStatusFunction(() =>
      this.saveVisualizationStatus()
    );
  }

  // #endregion

  // #region --- Initialization ---

  public init(container: HTMLElement) {
    this.cytoscape.init(container);
    this.isEmpty = true;
  }

  // #endregion

  // #region --- Math helpers ---

  public mathDimPercent(subsetSize: number, total: number) {
    return Math.round(
      ((Math.log2(subsetSize) + 1) / (Math.log2(total) + 1)) * 100
    );
  }

  public mathPercent(subsetSize: number, total: number) {
    return Math.round((subsetSize / total) * 100);
  }

  // #endregion

  // #region --- Sorting helpers ---

  // Todo - add sorting to Attractor Bifurcation Explorer

  private compareInformationGain(a: any, b: any): number {
    return b.gain - a.gain;
  }

  private compareTotalClasses(a: any, b: any): number {
    const r = a.right.length + a.left.length - (b.right.length + b.left.length);
    return r === 0 ? this.compareInformationGain(a, b) : r;
  }

  private comparePositiveMajority(a: any, b: any): number {
    const r = b.right[0]['fraction'] - a.right[0]['fraction'];
    return r === 0 ? this.compareInformationGain(a, b) : r;
  }

  private compareNegativeMajority(a: any, b: any): number {
    const r = b.left[0]['fraction'] - a.left[0]['fraction'];
    return r === 0 ? this.compareInformationGain(a, b) : r;
  }

  private compareAttrName(a: any, b: any): number {
    return a.name.localeCompare(b.name);
  }

  private comparePositive(a: any, b: any): number {
    const r = b.rightTotal - a.rightTotal;
    return r === 0 ? this.compareInformationGain(a, b) : r;
  }

  private compareNegative(a: any, b: any): number {
    const r = b.leftTotal - a.leftTotal;
    return r === 0 ? this.compareInformationGain(a, b) : r;
  }

  private getCurrentSort(): string {
    for (const sort of SORTS) {
      const checkbox = document.getElementById(sort) as HTMLInputElement;
      if (checkbox && checkbox.checked) {
        return sort;
      }
    }
    return SORT_INFORMATION_GAIN;
  }

  private setSort(sort: string): void {
    for (const sortId of SORTS) {
      const checkbox = document.getElementById(sortId) as HTMLInputElement;
      if (checkbox) checkbox.checked = false;
    }
    const sortCheckbox = document.getElementById(sort) as HTMLInputElement;
    if (sortCheckbox) sortCheckbox.checked = true;

    const selected = this.cytoscape.getSelectedNodeTreeData();
    if (selected) {
      // Todo - fix
      // this.renderAttributeTable(
      //   selected.id,
      //   selected.attributes,
      //   selected.cardinality
      // );
    }
  }

  private sortAttributes(attributes: any[]): void {
    const sort = this.getCurrentSort();
    if (sort === SORT_TOTAL_CLASSES) {
      attributes.sort(this.compareTotalClasses.bind(this));
    } else if (sort === SORT_POSITIVE_MAJORITY) {
      attributes.sort(this.comparePositiveMajority.bind(this));
    } else if (sort === SORT_NEGATIVE_MAJORITY) {
      attributes.sort(this.compareNegativeMajority.bind(this));
    } else if (sort === SORT_ALPHABETICAL) {
      attributes.sort(this.compareAttrName.bind(this));
    } else if (sort === SORT_POSITIVE) {
      attributes.sort(this.comparePositive.bind(this));
    } else if (sort === SORT_NEGATIVE) {
      attributes.sort(this.compareNegative.bind(this));
    } else {
      attributes.sort(this.compareInformationGain.bind(this));
    }
  }

  // #endregion

  // #region --- Cardinality ---

  public getTotalCardinality() {
    return this.cytoscape.getTotalCardinality();
  }

  // #endregion

  // #region --- Bifurcation Tree Management ---

  public openBifurcationTree() {
    if (this.isEmpty) {
      const hasSavedVisualizationStatus =
        this.bifurcationExplorerStatusStore.getState().visualizationStatus !==
        null;
      this.loadBifurcationTree(
        !hasSavedVisualizationStatus,
        !hasSavedVisualizationStatus
      );
    }
  }

  public insertBifurcationTree(
    nodeList: NodeDataBE[],
    fit: boolean = true,
    animate: boolean = true,
    clearCytoscape: boolean = true
  ) {
    if (nodeList !== undefined && nodeList.length > 0) {
      if (clearCytoscape) this.cytoscape.removeAll();
      for (const n of nodeList) {
        this.messageServ.showFromResult(
          this.cytoscape.ensureNode(n),
          'Failed to insert node'
        );
      }
      for (const n of nodeList) {
        if (n.type === 'decision') {
          this.messageServ.showFromResult(
            this.cytoscape.ensureEdge(n.id, n.left, false),
            'Failed to insert edge'
          );
          this.messageServ.showFromResult(
            this.cytoscape.ensureEdge(n.id, n.right, true),
            'Failed to insert edge'
          );
        }
      }
      // Do not auto-fit when restoring a previously saved pan/zoom state.
      this.cytoscape.applyTreeLayout(fit, animate);
      this.isEmpty = false;
    }

    this.restoreVisualizationState(
      nodeList !== undefined && nodeList.length == 1
    );
  }

  public loadBifurcationTree(fit: boolean = true, animate: boolean = true) {
    this.computationManagerServ.getBifurcationTree(fit, animate, this);
  }

  public autoExpandBifurcationTreeFromSelected(depth: number, nodeId?: number) {
    if (!nodeId) {
      const newNodeID =
        this.bifurcationExplorerStatusStore.getState().selectedNode;

      if (!newNodeID) {
        return err('No node selected.');
      }

      this.computationManagerServ.autoExpandBifurcationTree(
        newNodeID.id,
        depth ?? 1,
        this
      );
    } else {
      this.computationManagerServ.autoExpandBifurcationTree(
        nodeId,
        depth ?? 1,
        this
      );
    }

    return ok(true);
  }

  // #endregion

  // #region --- Node Operations ---

  public refreshSelection() {
    this.cytoscape.refreshSelection();
  }

  public removeFromCytoscape(
    node: NodeDataBE | undefined,
    removedNodes: number[]
  ) {
    if (removedNodes.length > 0) {
      for (const removed of removedNodes) {
        this.cytoscape.removeNode(removed.toString());
      }
    }
    if (node !== undefined) {
      this.messageServ.showFromResult(
        this.cytoscape.ensureNode(node),
        'Failed to ensure nodes existence'
      );

      this.cytoscape.refreshSelection(node.id.toString());
    } else {
      this.cytoscape.refreshSelection();
    }
  }

  public removeNode(nodeId: number) {
    this.computationManagerServ.deleteBifurcationDecision(nodeId, this);
  }

  public getNodeNecessaryConditions(nodeId: number) {
    return this.cytoscape.getNodeNecessaryConditions(nodeId);
  }

  public moveNode(nodeId: string, steps: number) {
    this.cytoscape.moveNode(nodeId, steps);
  }

  // #endregion

  // #region --- Stability Analysis ---

  public getStabilityData(nodeId: number, behavior: StabilityAnalysisModes) {
    this.bifurcationExplorerStatusStore.getState().loadStabilityData(null);
    this.computationManagerServ.getStabilityData(nodeId, behavior);
  }

  // #endregion

  // #region --- Make Decision ---

  public formatClassesDecisions(decisions: Decisions) {
    for (const decision of decisions) {
      decision.left.sort(function (a, b) {
        return b.cardinality - a.cardinality;
      });
      decision.right.sort(function (a, b) {
        return b.cardinality - a.cardinality;
      });
      const leftTotal = decision.left.reduce((a, b) => a + b.cardinality, 0.0);
      const rightTotal = decision.right.reduce(
        (a, b) => a + b.cardinality,
        0.0
      );
      decision['leftTotal'] = leftTotal;
      decision['rightTotal'] = rightTotal;

      decision.left.forEach((lElement) => {
        lElement['fraction'] = lElement.cardinality / leftTotal;
      });

      decision.right.forEach((rElement) => {
        rElement['fraction'] = rElement.cardinality / rightTotal;
      });
    }

    return decisions;
  }

  public getDecisions(nodeId: number) {
    this.computationManagerServ.getDecisions(nodeId, this);
  }

  public makeDecision(nodeId: number, decisionId: number) {
    this.computationManagerServ.makeDecision(nodeId, decisionId, this);
  }

  // #endregion

  // #region --- Visualization Status ---

  public saveVisualizationStatus() {
    const status: VisualizationStatus = this.cytoscape.getVisualizationStatus();

    this.bifurcationExplorerStatusStore
      .getState()
      .setVisualizationStatus(status);
  }

  public restoreVisualizationState(selectRootNodeFallback: boolean = false) {
    const status =
      this.bifurcationExplorerStatusStore.getState().visualizationStatus;
    const selectedNode =
      this.bifurcationExplorerStatusStore.getState().selectedNode;

    if (status) {
      this.cytoscape.loadVisualizationStatus(status);
    }

    if (selectedNode) {
      this.cytoscape.refreshSelection(selectedNode.id.toString());
    } else if (selectRootNodeFallback) {
      this.cytoscape.selectRootNode();
    }
  }

  // #endregion

  // #region --- Visual Options ---

  public getLastPrecision() {
    return this.precision;
  }

  public getSwitchableOptionsState(): VisualOptionsSwitchableABE {
    return this.cytoscape.getSwitchLayoutOptions();
  }

  public setPrecision(precision: number) {
    this.precision = precision;
    this.computationManagerServ.setBifurcationTreePrecision(precision, this);
  }

  public toggleSnapNodesToLayers() {
    this.cytoscape.toggleSnapNodesToLayers();
  }

  public toggleAnimateLayoutChanges() {
    this.cytoscape.toggleAnimateLayoutChanges();
  }

  public togglePositiveOnLeft() {
    this.cytoscape.togglePositiveOnLeft();
  }

  // #endregion

  // #region --- Open witness/attractor ---

  public openLeafNodeWitness(nodeId: number) {
    if (nodeId === undefined || nodeId === null) {
      return err('Internal error (Missing node ID).');
    }

    this.computationManagerServ.openWitnessBifurcationExplorer(nodeId);

    return ok(true);
  }

  public openStabilityWitness(
    nodeId: number | null,
    variable: string,
    behaviour: string,
    vector: Array<string>
  ) {
    if (
      nodeId === null ||
      nodeId === undefined ||
      !variable ||
      !behaviour ||
      !vector
    ) {
      return err('Internal error (Missing parameters).');
    }

    this.computationManagerServ.openWitnessStabilityAnalysis(
      nodeId,
      variable,
      behaviour,
      vector
    );

    return ok(true);
  }

  public openLeafNodeAttractor(nodeId: number) {
    if (!nodeId) {
      return err('No leaf node selected.');
    } else {
      this.attractorVisualizerServ.openVisualizer({ nodeId: nodeId });
    }

    return ok(true);
  }

  public openStabilityAttractor(
    nodeId: number | null,
    variableName: string,
    behavior: StabilityAnalysisModes,
    vector: string[]
  ) {
    if (nodeId === null) {
      return err('Internal error (Missing node ID).');
    }
    if (!variableName) {
      return err('Internal error (Missing variable name).');
    }
    if (!behavior) {
      return err('Internal error (Missing behavior).');
    }
    if (!vector) {
      return err('Internal error (Missing vector).');
    }

    this.attractorVisualizerServ.openVisualizer({
      nodeId,
      variableName,
      behavior,
      vector,
    });

    return ok(true);
  }

  // #endregion

  // #region --- Visualization Operations ---

  public setZoom(zoomLevel: number): void {
    this.cytoscape.setZoom(zoomLevel);

    this.saveVisualizationStatus();
  }

  public fitTree(): void {
    this.cytoscape.fit();
  }

  public resetTreeLayout(): void {
    this.cytoscape.resetTreeLayout();
  }

  // #endregion

  // #region --- Reset ---

  public clear() {
    this.cytoscape.removeAll();
    this.bifurcationExplorerStatusStore.getState().clear();
    this.isEmpty = true;
  }

  // #endregion
}

export default AttractorBifurcationExplorer;
