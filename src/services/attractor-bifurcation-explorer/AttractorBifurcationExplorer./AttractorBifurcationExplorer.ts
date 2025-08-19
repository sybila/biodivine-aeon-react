import { Message } from '../../../components/lit-components/message-wrapper';
import useBifurcationExplorerStatus from '../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';
import type {
  Decisions,
  NodeDataBE,
  NodeNecessaryConditions,
  StabilityAnalysisModes,
  VisualOptionsSwitchableABE,
} from '../../../types';
import ComputationManager from '../../global/ComputationManager/ComputationManager';
import CytoscapeABE from '../CytoscapeABE/CytoscapeABE';
import CytoscapeTreeEditor from '../CytoscapeABE/CytoscapeABE';

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

class AttractorBifurcationExplorerClass {
  // #region --- Properties ---

  /** Last set precision in the VisualOptions of AttractorExplorer.
   *  Default precision is 100%
   */
  private precision: number = 100;

  // #endregion

  // #region --- Math helpers ---

  /** Calculates the logarithmic dimension percentage of a subset relative to the total set.
   * <p>
   * The result is computed as:
   * <pre>
   *   percent = Math.round(((Math.log2(cardinality) + 1) / (Math.log2(total) + 1)) * 100)
   * </pre>
   * This reflects the relative "dimension" (logarithmic scale) of the subset compared to the whole,
   * which is useful for visualizing exponential growth or combinatorial complexity.
   * </p>
   *
   * @param subsetSize The size of the subset.
   * @param total The size of the total set.
   * @return The dimension percentage (0-100) of the subset relative to the total.
   */
  public mathDimPercent(subsetSize: number, total: number): number {
    return Math.round(
      ((Math.log2(subsetSize) + 1) / (Math.log2(total) + 1)) * 100
    );
  }

  /** Calculates the linear percentage of a subset relative to the total set.
   * <p>
   * The result is computed as:
   * <pre>
   *   percent = Math.round((cardinality / total) * 100)
   * </pre>
   * This reflects the direct ratio of the subset size to the total size,
   * expressed as a percentage (0-100).
   * </p>
   *
   * @param subsetSize The size of the subset.
   * @param total The size of the total set.
   * @return The percentage (0-100) of the subset relative to the total.
   */
  public mathPercent(subsetSize: number, total: number): number {
    return Math.round((subsetSize / total) * 100);
  }

  // #endregion

  // #region --- Sorting helpers ---
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

    const selected = CytoscapeTreeEditor.getSelectedNodeTreeData();
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

  /** Returns total cardinality of the graph or -1 if not available */
  public getTotalCardinality(): number {
    return CytoscapeABE.getTotalCardinality();
  }

  // #endregion

  // #region --- Bifurcation Tree Management ---

  /** Inserts a bifurcation tree into CytoscapeABE.
   *  @param nodeList - () List of nodes to insert.
   *  @param fit - (boolean) Whether to fit the view after insertion. Default is true.
   */
  public insertBifurcationTree(
    nodeList: NodeDataBE[],
    fit: boolean = true,
    clearCytoscape: boolean = true
  ): void {
    if (nodeList !== undefined && nodeList.length > 0) {
      if (clearCytoscape) CytoscapeABE.removeAll();
      for (const n of nodeList) {
        CytoscapeABE.ensureNode(n);
      }
      for (const n of nodeList) {
        if (n.type === 'decision') {
          CytoscapeABE.ensureEdge(n.id, n.left, false);
          CytoscapeABE.ensureEdge(n.id, n.right, true);
        }
      }
      CytoscapeABE.applyTreeLayout(fit);
    }
  }

  /** Loads the bifurcation tree from the compute engine and inserts it into the CytoscapeABE. */
  public loadBifurcationTree(fit: boolean = true): void {
    ComputationManager.getBifurcationTree(fit);
  }

  /** Automatically expands the bifurcation tree from the selected node.
   *  If nodeId is not provided, it uses the currently selected node.
   * @param nodeId - (number?) The ID of the node to expand from.
   * @param depth - (number) The depth to expand to.
   */
  public autoExpandBifurcationTreeFromSelected(depth: number, nodeId?: number) {
    if (!nodeId) {
      const newNodeID = useBifurcationExplorerStatus.getState().selectedNode;

      if (!newNodeID) {
        Message.showError(
          'Error Auto-Expanding Bifurcation Tree: No node selected'
        );
        return;
      }

      ComputationManager.autoExpandBifurcationTree(newNodeID.id, depth ?? 1);
    } else {
      ComputationManager.autoExpandBifurcationTree(nodeId, depth ?? 1);
    }
  }

  // #endregion

  // #region --- Node Operations ---

  /** Refreshes the selection in the AttractorBifurcationExplorer. */
  public refreshSelection(): void {
    CytoscapeABE.refreshSelection();
  }

  /** Removes a node from Cytoscape. Should be used only after calling of the removeNode function.*/
  public removeFromCytoscape(
    node: NodeDataBE | undefined,
    removedNodes: number[]
  ) {
    if (removedNodes.length > 0) {
      for (const removed of removedNodes) {
        CytoscapeABE.removeNode(removed.toString());
      }
    }
    if (node !== undefined) {
      CytoscapeABE.ensureNode(node);
      CytoscapeABE.refreshSelection(node.id.toString());
    } else {
      CytoscapeABE.refreshSelection();
    }
  }

  /** Removes a node and its child nodes from the AttractorBifurcationExplorer. */
  public removeNode(nodeId: number): void {
    ComputationManager.deleteBifurcationDecision(nodeId);
  }

  /** Gets the necessary conditions for a specific node. */
  public getNodeNecessaryConditions(nodeId: number): NodeNecessaryConditions {
    return CytoscapeABE.getNodeNecessaryConditions(nodeId);
  }

  // #endregion

  // #region --- Stability Analysis ---

  /** Gets the stability data for a specific node.
   * @param nodeId - (number) The ID of the node to get stability data for.
   */
  public getStabilityData(
    nodeId: number,
    behaviour: StabilityAnalysisModes
  ): void {
    ComputationManager.getStabilityData(nodeId, behaviour);
  }

  // #endregion

  // #region --- Make Decision ---

  /** Formats behavior classes inside decisions for display.
   * @param decisions - The decisions to format.
   * @returns The formatted decisions.
   */
  public formatClassesDecisions(decisions: Decisions): Decisions {
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

  /** Gets the decisions for the selected node. */
  public getDecisions(nodeId: number): void {
    ComputationManager.getDecisions(nodeId);
  }

  /** Make decision for a specific node. */
  public makeDecision(nodeId: number, decisionId: number): void {
    ComputationManager.makeDecision(nodeId, decisionId);
  }

  // #endregion

  // #region --- Visual Options ---

  /** Gets last precision set in the VisualOptions of AttractorExplorer */
  public getLastPrecision(): number {
    return this.precision;
  }

  /** Gets the current state of the switchable options in the visual options tab */
  public getSwitchableOptionsState(): VisualOptionsSwitchableABE {
    return CytoscapeABE.getSwitchLayoutOptions();
  }

  /** Set precision for the bifurcation tree. */
  public setPrecision(precision: number): void {
    this.precision = precision;
    ComputationManager.setBifurcationTreePrecision(precision);
  }

  /** Fits the bifurcation tree to the viewport. */
  public fitTree(): void {
    CytoscapeABE.fit();
  }

  /** Resets the layout of the bifurcation tree. */
  public resetTreeLayout(): void {
    CytoscapeABE.resetTreeLayout();
  }

  /** Sets the nodes to snap to their respective layers. */
  public toggleSnapNodesToLayers(): void {
    CytoscapeABE.toggleSnapNodesToLayers();
  }

  /** Animates layout changes in the Cytoscape instance. */
  public toggleAnimateLayoutChanges(): void {
    CytoscapeABE.toggleAnimateLayoutChanges();
  }

  /** Toggles the positive class on the left side of the bifurcation tree. */
  public togglePositiveOnLeft(): void {
    CytoscapeABE.togglePositiveOnLeft();
  }

  // #endregion

  public selectAttribute(node: string, attr: string): void {
    // @ts-ignore
    if (!UI.testResultsAvailable()) return;

    // @ts-ignore
    ComputeEngine.AttractorTree.selectDecisionAttribute(
      node,
      attr,
      (e: any, r: any[]) => {
        for (const n of r) {
          CytoscapeTreeEditor.ensureNode(n);
        }
        for (const n of r) {
          if (n.type === 'decision') {
            CytoscapeTreeEditor.ensureEdge(n.id, n.left, false);
            CytoscapeTreeEditor.ensureEdge(n.id, n.right, true);
          }
        }
        CytoscapeTreeEditor.applyTreeLayout();
        CytoscapeTreeEditor.refreshSelection();
      }
    );
  }

  // --- Witness and Attractor Opening ---
  public openTreeWitness(): void {
    const node = CytoscapeTreeEditor.getSelectedNodeId();
    if (node === undefined) return;
    // @ts-ignore
    UI.Open.openWitness(null, '&tree_witness=' + encodeURI(node));
  }

  public openStabilityWitness(
    variable: string,
    behaviour: string,
    vector: string
  ): void {
    const node = CytoscapeTreeEditor.getSelectedNodeId();
    if (node === undefined) return;
    // @ts-ignore
    UI.Open.openWitness(
      null,
      '&tree_witness=' +
        encodeURI(node) +
        '&variable=' +
        encodeURI(variable) +
        '&behaviour=' +
        encodeURI(behaviour) +
        '&vector=' +
        encodeURI(vector)
    );
  }

  public openTreeAttractor(): void {
    const node = CytoscapeTreeEditor.getSelectedNodeId();
    if (node === undefined) return;
    // @ts-ignore
    UI.Open.openExplorer('&tree_witness=' + encodeURI(node));
  }

  public openStabilityAttractor(
    variable: string,
    behaviour: string,
    vector: string
  ): void {
    const node = CytoscapeTreeEditor.getSelectedNodeId();
    if (node === undefined) return;
    // @ts-ignore
    UI.Open.openExplorer(
      '&tree_witness=' +
        encodeURI(node) +
        '&variable=' +
        encodeURI(variable) +
        '&behaviour=' +
        encodeURI(behaviour) +
        '&vector=' +
        encodeURI(vector)
    );
  }

  // --- Utility ---
  public vectorToString(vector: string[]): string {
    let result = '[';
    let first = true;
    for (const item of vector) {
      if (first) {
        first = false;
      } else {
        result += ',';
      }
      if (item === 'true') {
        result += "<span class='green'><b>true</b></span>";
      } else if (item === 'false') {
        result += "<span class='red'><b>false</b></span>";
      } else {
        result += '<b>' + item + '</b>';
      }
    }
    result += ']';
    return result;
  }

  public getWitnessPanelForVariable(
    variable: string,
    behaviour: string,
    vector: string
  ): string {
    return `<span class='witness-panel'><span class='inline-button' onclick='AttractorBifurcationExplorer.openStabilityWitness("${variable}","${behaviour}","${vector}");'>Witness</span> | <span class='inline-button' onclick='AttractorBifurcationExplorer.openStabilityAttractor("${variable}","${behaviour}","${vector}");'>Attractor</span></span>`;
  }

  public moveNode(nodeId: string, steps: number): void {
    const settings = CytoscapeTreeEditor.layoutSettings;
    const spacing = settings.extraVerticalSpacings;
    const change = (settings.layered ? settings.layerHeight : 50) * steps;
    if (spacing[nodeId] === undefined) {
      spacing[nodeId] = 0;
    }
    spacing[nodeId] += change;
    if (spacing[nodeId] <= 0) {
      delete spacing[nodeId];
    }
    CytoscapeTreeEditor.applyTreeLayout();
  }
}

export default new AttractorBifurcationExplorerClass();
