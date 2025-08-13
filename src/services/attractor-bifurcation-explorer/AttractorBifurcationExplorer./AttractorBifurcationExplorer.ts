import { Message } from '../../../components/lit-components/message-wrapper';
import useBifurcationExplorerStatus from '../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';
import type { NodeDataBE } from '../../../types';
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
  // --- UI Initialization ---
  public openNewTreeExplorer(): void {
    // Todo - Fix/Remove
    // CytoscapeTreeEditor.init();
    // const checkbox = document.getElementById("mass-distribution") as HTMLInputElement;
    // const label = document.getElementById("mass-distribution-label") as HTMLElement;
    // checkbox.addEventListener("change", (event: Event) => {
    //   const target = event.target as HTMLInputElement;
    //   if (target.checked) {
    //     CytoscapeTreeEditor.setMassEnabled();
    //     label.classList.add("primary", "bold");
    //   } else {
    //     CytoscapeTreeEditor.setMassDisabled();
    //     label.classList.remove("primary", "bold");
    //   }
    // });
    // document.fonts.load('1rem "symbols"').then(() => {
    //   document.fonts.load('1rem "FiraMono"').then(() => {
    //     this.loadBifurcationTree();
    //   });
    // });
    // const slider = document.getElementById("precision-slider") as HTMLInputElement;
    // const output = document.getElementById("precision-value") as HTMLElement;
    // output.innerHTML = (Number(slider.value) / 100.0) + "%";
    // slider.oninput = function () {
    //   output.innerHTML = (Number(this.value) / 100.0) + "%";
    // };
    // slider.onmouseup = () => {
    //   this.setPrecision(Number(slider.value));
    // };
    // // @ts-ignore
    // ComputeEngine.AttractorTree.getTreePrecision((e: any, r: number) => {
    //   slider.value = String(r);
    //   output.innerHTML = (r / 100.0) + "%";
    // });
    // const depth = document.getElementById("auto-expand-slider") as HTMLInputElement;
    // const autoExpand = document.getElementById("button-auto-expand") as HTMLElement;
    // depth.oninput = function () {
    //   const value = Number(depth.value);
    //   if (value === 1) {
    //     autoExpand.innerHTML = "Auto expand (1 level)  <img src='img/graph-24px.svg'>";
    //   } else {
    //     autoExpand.innerHTML = `Auto expand (${value} levels)  <img src='img/graph-24px.svg'>`;
    //   }
    // };
    // autoExpand.onclick = () => {
    //   CytoscapeTreeEditor.getSelectedNodeId() &&
    //     this.autoExpandBifurcationTree(CytoscapeTreeEditor.getSelectedNodeId()!, Number(depth.value));
    // };
    // // Setup mutually exclusive sort checkboxes.
    // for (const sort of SORTS) {
    //   const checkbox = document.getElementById(sort) as HTMLInputElement;
    //   checkbox.onclick = () => {
    //     for (const sortInner of SORTS) {
    //       (document.getElementById(sortInner) as HTMLInputElement).checked = false;
    //     }
    //     checkbox.checked = true;
    //     this.setSort(checkbox.id);
    //   };
    // }
    // document.getElementById("toggle-animate")?.addEventListener("change", (e: any) => {
    //   CytoscapeTreeEditor.layoutSettings.animate = e.target.checked;
    // });
    // document.getElementById("toggle-layered")?.addEventListener("change", (e: any) => {
    //   CytoscapeTreeEditor.layoutSettings.layered = e.target.checked;
    //   CytoscapeTreeEditor.applyTreeLayout();
    // });
    // document.getElementById("toggle-posonleft")?.addEventListener("change", (e: any) => {
    //   CytoscapeTreeEditor.layoutSettings.positiveOnLeft = e.target.checked;
    //   CytoscapeTreeEditor.applyTreeLayout();
    // });
    // document.getElementById("button-fit")?.addEventListener("click", () => {
    //   CytoscapeTreeEditor.fit();
    // });
    // document.getElementById("button-resetlayout")?.addEventListener("click", () => {
    //   CytoscapeTreeEditor.layoutSettings.extraVerticalSpacings = {};
    //   CytoscapeTreeEditor.layoutSettings.switchChildren.clear();
    //   CytoscapeTreeEditor.applyTreeLayout();
    // });
  }

  // #region --- Math helpers ---

  public mathDimPercent(cardinality: number, total: number): number {
    return Math.round(
      ((Math.log2(cardinality) + 1) / (Math.log2(total) + 1)) * 100
    );
  }

  public mathPercent(cardinality: number, total: number): number {
    return Math.round((cardinality / total) * 100);
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
      this.renderAttributeTable(
        selected.id,
        selected.attributes,
        selected.cardinality
      );
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

  // --- Attribute Table Rendering ---
  public renderAttributeTable(
    id: any,
    attributes: any[],
    totalCardinality: number
  ): void {
    // Todo - Fix/Remove
    // const mixedAttributes = document.getElementById('mixed-attributes');
    // const mixedAttributesTitle = document.getElementById(
    //   'mixed-attributes-title'
    // );
    // const template = document.getElementById(
    //   'mixed-attributes-list-item-template'
    // ) as HTMLElement;
    // const list = document.getElementById(
    //   'mixed-attributes-list'
    // ) as HTMLElement;
    // if (!mixedAttributes || !mixedAttributesTitle || !template || !list) return;
    // mixedAttributes.classList.remove('gone');
    // mixedAttributesTitle.innerHTML = `Attributes (${attributes.length}):`;
    // list.innerHTML = '';
    // let cut_off = 100;
    // this.sortAttributes(attributes);
    // for (const attr of attributes) {
    //   if (cut_off < 0) break;
    //   const attrNode = template.cloneNode(true) as HTMLElement;
    //   attrNode.id = '';
    //   attrNode.classList.remove('gone');
    //   const nameText = attrNode.getElementsByClassName(
    //     'attribute-name'
    //   )[0] as HTMLElement;
    //   nameText.innerHTML = "<small class='grey'>SELECT:</small>" + attr.name;
    //   nameText.onclick = () => this.selectAttribute(id, attr.id);
    //   const igText = attrNode.getElementsByClassName(
    //     'information-gain'
    //   )[0] as HTMLElement;
    //   igText.innerHTML = `${attr.gain.toFixed(2)} ɪɢ / ${
    //     attr.left.length + attr.right.length
    //   } ᴛᴄ`;
    //   if (attr.gain <= 0.0) {
    //     igText.classList.add('red');
    //   } else if (attr.gain >= 0.99) {
    //     igText.classList.add('green');
    //   } else {
    //     igText.classList.add('primary');
    //   }
    //   list.appendChild(attrNode);
    //   const leftNode = attrNode.getElementsByClassName(
    //     'negative'
    //   )[0] as HTMLElement;
    //   const rightNode = attrNode.getElementsByClassName(
    //     'positive'
    //   )[0] as HTMLElement;
    //   const leftTotal = attr.left.reduce(
    //     (a: number, b: any) => a + b.cardinality,
    //     0.0
    //   );
    //   const rightTotal = attr.right.reduce(
    //     (a: number, b: any) => a + b.cardinality,
    //     0.0
    //   );
    //   leftNode.getElementsByClassName('title')[0].innerHTML = `Negative (${
    //     attr.left.length
    //   }|<small>${this.mathPercent(leftTotal, totalCardinality)}%</small>)`;
    //   rightNode.getElementsByClassName('title')[0].innerHTML = `Positive (${
    //     attr.right.length
    //   }|<small>${this.mathPercent(rightTotal, totalCardinality)}%</small>)`;
    //   const leftTable = leftNode.getElementsByClassName(
    //     'table'
    //   )[0] as HTMLElement;
    //   leftTable.innerHTML = attr.left.reduce((html: string, cls: any) => {
    //     const style = html.length > 0 ? "class='extra'" : '';
    //     const row = `
    //       <tr ${style}>
    //         <td class="distribution">${this.mathPercent(
    //           cls.cardinality,
    //           leftTotal
    //         )}%</td>
    //         <td class="symbols phenotype">${CytoscapeABE.normalizeClass(
    //           cls.class
    //         )}</td>
    //       </tr>
    //     `;
    //     return html + row;
    //   }, '');
    //   const rightTable = rightNode.getElementsByClassName(
    //     'table'
    //   )[0] as HTMLElement;
    //   rightTable.innerHTML = attr.right.reduce((html: string, cls: any) => {
    //     const style = html.length > 0 ? "class='extra'" : '';
    //     const row = `
    //       <tr ${style}>
    //         <td class="symbols phenotype">${CytoscapeTreeEditor.normalizeClass(
    //           cls.class
    //         )}</td>
    //         <td class="distribution">${this.mathPercent(
    //           cls.cardinality,
    //           rightTotal
    //         )}%</td>
    //       </tr>
    //     `;
    //     return html + row;
    //  }, '');
    //   const expandButton = attrNode.getElementsByClassName(
    //     'expand-button'
    //   )[0] as HTMLElement;
    //   if (attr.left.length === 1 && attr.right.length === 1) {
    //     expandButton.parentNode?.removeChild(expandButton);
    //   } else {
    //     expandButton.onclick = () => {
    //       if (expandButton.innerHTML === 'more...') {
    //         expandButton.innerHTML = '...less';
    //         leftTable.classList.remove('collapsed');
    //         rightTable.classList.remove('collapsed');
    //       } else if (expandButton.innerHTML === '...less') {
    //         expandButton.innerHTML = 'more...';
    //         leftTable.classList.add('collapsed');
    //         rightTable.classList.add('collapsed');
    //       }
    //     };
    //   }
    // }
  }

  // #region --- Bifurcation Tree Management ---

  /** Inserts a bifurcation tree into CytoscapeABE.
   *  @param nodeList - () List of nodes to insert.
   *  @param fit - (boolean) Whether to fit the view after insertion. Default is true.
   */
  public insertBifurcationTree(
    nodeList: NodeDataBE[],
    fit: boolean = true
  ): void {
    if (nodeList !== undefined && nodeList.length > 0) {
      CytoscapeABE.removeAll();
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

  // #endregion

  // #region --- Visual Options ---

  /** Set precision for the bifurcation tree. */
  public setPrecision(precision: number): void {
    ComputationManager.setBifurcationTreePrecision(precision);
  }

  // #endregion

  public removeNode(nodeId: string): void {
    // @ts-ignore
    ComputeEngine.AttractorTree.deleteDecision(nodeId, (e: any, r: any) => {
      if (r.removed.length > 0) {
        for (const removed of r.removed) {
          CytoscapeTreeEditor.removeNode(removed);
        }
      }
      if (r.node !== undefined) {
        CytoscapeTreeEditor.ensureNode(r.node);
        CytoscapeTreeEditor.refreshSelection(r.node.id);
      }
    });
  }

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

  public initStabilityButton(
    id: string,
    button: HTMLElement,
    dropdown: HTMLSelectElement,
    container: HTMLElement
  ): void {
    const loading = document.getElementById('loading-indicator') as HTMLElement;
    button.onclick = () => {
      // @ts-ignore
      if (!UI.testResultsAvailable()) return;

      loading.classList.remove('invisible');
      const behaviour = dropdown.value;
      // @ts-ignore
      ComputeEngine.AttractorTree.getStabilityData(
        id,
        behaviour,
        (e: any, r: any[]) => {
          loading.classList.add('invisible');
          if (e !== undefined) {
            // @ts-ignore
            Warning.displayWarning('Cannot load stability data: ' + e);
          } else {
            let content = '<h4>Stability analysis:</h4>';
            for (const item of r) {
              const variableName = item.variable;
              if (item.data.length === 1) {
                content += `<div><b>${variableName}</b>: always ${this.vectorToString(
                  item.data[0].vector
                )}</div>`;
              } else {
                content += `<div><b>${variableName}</b>:</br>`;
                for (const data of item.data) {
                  content += ` - ${this.vectorToString(data.vector)}: ${
                    data.colors
                  } ${this.getWitnessPanelForVariable(
                    variableName,
                    behaviour,
                    data.vector
                  )}</br>`;
                }
                content += '</div>';
              }
            }
            container.innerHTML = content;
          }
        }
      );
    };
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
