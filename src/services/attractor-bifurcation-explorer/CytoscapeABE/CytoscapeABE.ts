import { type CytoscapeOptions, type EventObject } from 'cytoscape';
import type {
  CytoscapeNodeDataBE,
  DecisionMixedNode,
  NodeDataBE,
} from '../../../types';
import { Message } from '../../../components/lit-components/message-wrapper';
import AttractorBifurcationExplorer from '../AttractorBifurcationExplorer./AttractorBifurcationExplorer';
import { use } from 'react';
import useBifurcationExplorerStatus from '../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';

const _remove_svg =
  '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M4 6h14v14H6z"/><path fill="#d05d5d" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

declare const cytoscape: any;

class CytoscapeABEClass {
  // #region --- Properties ---

  private _cytoscape: any = undefined;
  private _totalCardinality = 0.0;
  private _showMass = false;

  public layoutSettings = {
    useTidytree: true,
    layered: false,
    extraVerticalSpacings: {} as Record<string, number>,
    positiveOnLeft: false,
    switchChildren: new Set<string>(),
    horizontalSpacing: 20,
    verticalSpacing: 40,
    animate: true,
    fitPadding: 20,
    layerHeight: 120,
  };

  private container: HTMLElement | null = null;

  // #endregion

  // #region --- Initialization ---
  public init(container: HTMLElement) {
    // Avoid re-initialization
    if (this.container === container) {
      return;
    }

    this.container = container;
    this._cytoscape = cytoscape(this.initOptions());
    this._cytoscape.on('select', (e: EventObject) => this._onSelect(e));
    this._cytoscape.on('unselect', (e: EventObject) => this._onUnselect(e));
    this._cytoscape.on('grabon', this._handleDragStart.bind(this));
    this._cytoscape.on('dragfreeon', this._handleDragEnd.bind(this));

    AttractorBifurcationExplorer.loadBifurcationTree();
  }

  private initOptions(): CytoscapeOptions {
    return {
      container: this.container,
      boxSelectionEnabled: false,
      selectionType: 'single',
      style: [
        {
          // Style of the graph nodes
          selector: 'node[label]',
          style: {
            //
            label: 'data(label)',
            // put label in the middle of the node (vertically)
            'text-valign': 'center',
            width: 'label',
            height: 'label',
            shape: 'round-rectangle',
            // when selecting, do not display any overlay
            'overlay-opacity': 0,
            opacity: (ele: any) => ele.data('opacity'),
            // other visual styles
            padding: '12',
            'background-color': '#dddddd',
            //'background-opacity': '0',
            'font-family': 'FiraMono',
            'font-size': '12pt',
            'border-width': '1px',
            'border-color': '#bbbbbb',
            'border-style': 'solid',
            'text-max-width': '150',
            'text-wrap': 'wrap',
          },
        },
        {
          selector: '.remove-button',
          style: {
            'text-valign': 'top',
            'text-halign': 'right',
            shape: 'round-rectangle',
            'background-opacity': 0,
            'background-image': function (e) {
              return (
                'data:image/svg+xml;utf8,' + encodeURIComponent(_remove_svg)
              );
            },
            'background-width': '24px',
            'background-height': '24px',
            width: '32px',
            height: '32px',
          },
        },
        {
          selector: '.remove-button.hover',
          style: {
            'background-width': '32px',
            'background-height': '32px',
          },
        },
        {
          // When a node is selected, show it with a thick blue border.
          selector: 'node:selected',
          style: {
            'border-width': '4.0px',
            'border-color': '#6a7ea5',
            'border-style': 'solid',
          },
        },
        {
          selector: 'node[type = "unprocessed"]',
          style: {
            'background-color': '#EFEFEF',
            'border-color': '#616161',
          },
        },
        {
          selector: 'node[type = "leaf"]',
          style: {
            'border-color': '#546E7A',
            'font-family': 'symbols',
            'font-size': '16pt',
          },
        },
        {
          selector: 'node[subtype = "disorder"]',
          style: {
            'background-color': '#FFE0B2',
          },
        },
        {
          selector: 'node[subtype = "oscillation"]',
          style: {
            'background-color': '#F0F4C3',
          },
        },
        {
          selector: 'node[subtype = "stability"]',
          style: {
            'background-color': '#B2DFDB',
          },
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'taxi',
            'taxi-direction': 'vertical',
            'target-arrow-shape': 'triangle',
            'taxi-turn': '20px',
          },
        },
        {
          selector: 'edge[positive = "true"]',
          style: {
            'line-color': '#4abd73',
            'target-arrow-color': '#4abd73',
          },
        },
        {
          selector: 'edge[positive = "false"]',
          style: {
            'line-color': '#d05d5d',
            'target-arrow-color': '#d05d5d',
          },
        },
        /*{
          'selector': 'node[type="decision"]'
        } */
      ],
    };
  }

  // #endregion

  // #region --- Node/Edge Selection ---

  private selectedDecisionNode(e: EventObject) {
    const currentPosition = e.target.position();
    // Show close button
    const closeButton = {
      classes: ['remove-button'],
      grabbable: false,
      data: {
        action: 'remove',
        targetId: e.target.data().id,
      },
      position: {
        // 12 is half the radius of the close icon
        x: currentPosition.x + e.target.width() / 2 + 12,
        y: currentPosition.y - e.target.height() / 2 - 12,
      },
    };
    const node = this._cytoscape.add(closeButton);
    node.on('mouseover', () => {
      node.addClass('hover');
    });
    node.on('mouseout', () => {
      node.removeClass('hover');
    });

    // Update position of the close button when the target is moved
    const handler = (e: EventObject) => {
      const targetPos = e.target.position();
      node.position({
        x: targetPos.x + e.target.width() / 2 + 12,
        y: targetPos.y - e.target.height() / 2 - 12,
      });
    };
    this._scratch(e.target).removeBtnHandler = handler; // save handler to remove later
    e.target.on('position', handler);
  }

  private _onSelect(e: EventObject) {
    // Todo - add quick help for tree explorer - document.getElementById('quick-help-tree-explorer').classList.add('gone');

    console.log(e.target.data());
    const data: CytoscapeNodeDataBE = e.target.data();
    if (data.action == 'remove') {
      // This is a remove button for a specifc tree node. Todo- Fix-Remove
      //TreeExplorer.removeNode(data.targetId);
      return;
    }

    if (data.type == 'leaf') {
      this._showLeafPanel(data);
    } else if (data.type == 'decision' || data.type == 'unprocessed') {
      const decisionMixedNode: DecisionMixedNode = {
        id: Number(data.id),
        label: data.label ?? 'Unknown Node',
        type: data.type,
        cardinality: data.treeData?.cardinality ?? 0,
        classes: data.treeData?.classes ?? [],
      };

      useBifurcationExplorerStatus
        .getState()
        .changeSelectedNode(decisionMixedNode);
      if (data.type === 'decision') this.selectedDecisionNode(e);
    }
  }

  private _onUnselect(e: any) {
    useBifurcationExplorerStatus.getState().changeSelectedNode(null);
    // toto -fix
    // // Clear remove button
    // this._cytoscape.$('.remove-button').remove();
    // // Remove the listener upading its position
    // const scratch = this._scratch(e.target);
    // e.target.removeListener('position', scratch.removeBtnHandler);
    // scratch.removeBtnHandler = undefined;
    // // Close panels
    // let leafInfo = document.getElementById('leaf-info');
    // leafInfo.classList.add('gone');
    // let decisionInfo = document.getElementById('decision-info');
    // decisionInfo.classList.add('gone');
    // let mixedInfo = document.getElementById('mixed-info');
    // mixedInfo.classList.add('gone');
    // // Clear decision attribute list:
    // document.getElementById('make-decision-button').classList.remove('gone');
    // document.getElementById('mixed-attributes').classList.add('gone');
    // document.getElementById('mixed-attributes-list').innerHTML = '';
    // // Reset stability analysis buttons:
    // document
    //   .getElementById('mixed-stability-analysis-button')
    //   .classList.remove('gone');
    // document
    //   .getElementById('leaf-stability-analysis-button')
    //   .classList.remove('gone');
    // document
    //   .getElementById('decision-stability-analysis-button')
    //   .classList.remove('gone');
    // document.getElementById('mixed-stability-analysis').innerHTML = '';
    // document.getElementById('leaf-stability-analysis').innerHTML = '';
    // document.getElementById('decision-stability-analysis').innerHTML = '';
  }

  public selectNode(nodeId: string) {
    let current = this._cytoscape.nodes(':selected');
    current.unselect();
    this._cytoscape.getElementById(nodeId).select();
  }

  /** Triggers all necessary events to update UI after graph update.
   * Selects/Unselects nodes as needed.
   * If targetId is provided, it will be selected. */
  public refreshSelection(targetId?: string) {
    let selected = this._cytoscape.$(':selected'); // node or edge that are selected
    if (selected.length > 0) {
      selected.unselect();
    }
    if (targetId === undefined) {
      if (selected.length > 0) {
        selected.select();
      }
    } else {
      this._cytoscape.getElementById(targetId).select();
    }
  }

  // #endregion

  // #region --- Remove Nodes/Edges ---

  public removeAll() {
    // Todo - Fix
    // document.getElementById('decision-info').classList.add('gone');
    // document.getElementById('mixed-info').classList.add('gone');
    // document.getElementById('leaf-info').classList.add('gone');
    this._cytoscape.nodes(':selected').unselect(); // Triggers reset of other UI.
    this._cytoscape.elements().remove();
  }

  public removeNode(nodeId: string) {
    let e = this._cytoscape.getElementById(nodeId);
    if (e.length > 0) {
      e.remove();
    }
  }

  // #endregion

  // #region --- Node Getters ---

  public getParentNode(targetId: string) {
    let parentEdge = this._cytoscape.edges("edge[target='" + targetId + "']");
    if (parentEdge.length == 0) {
      return undefined;
    }
    return parentEdge.data().source;
  }

  public getChildNode(sourceId: string, positive: boolean) {
    let childEdge = this._cytoscape.edges(
      "edge[source='" + sourceId + "'][positive='" + positive + "']"
    );
    if (childEdge.length == 0) {
      return undefined;
    }
    return childEdge.data().target;
  }

  public getSiblingNode(targetId: string) {
    let parentEdge = this._cytoscape.edges("edge[target='" + targetId + "']");
    if (parentEdge.length == 0) {
      return undefined;
    }
    let sourceId = parentEdge.data().source;
    let positive = !(parentEdge.data().positive == 'true');
    let childEdge = this._cytoscape.edges(
      "edge[source='" + sourceId + "'][positive='" + positive + "']"
    );
    if (childEdge.length == 0) {
      return undefined;
    }
    return childEdge.data().target;
  }

  public getSelectedNodeId() {
    const node = this._cytoscape.nodes(':selected');
    if (node.length == 0) return undefined;
    return node.data().id;
  }

  public getSelectedNodeTreeData() {
    const node = this._cytoscape.nodes(':selected');
    if (node.length == 0) return undefined;
    return node.data().treeData;
  }

  public getNodeType(nodeId: string) {
    return this._cytoscape.getElementById(nodeId).data().type;
  }

  // #endregion

  // #region --- Ensure Nodes/Edges ---

  public ensureNode(treeData: NodeDataBE) {
    let node = this._cytoscape.getElementById(treeData.id);
    if (node !== undefined && node.length > 0) {
      const data = node.data();
      this._applyTreeData(data, treeData);
      this._cytoscape.style().update(); //redraw graph
      return node;
    } else {
      const data = this._applyTreeData({ id: treeData.id }, treeData);

      return this._cytoscape.add({
        id: data.id,
        data: data,
        grabbable: treeData.id != 0,
        position: { x: 0.0, y: 0.0 },
      });
    }
  }

  public ensureEdge(
    sourceId: number | undefined,
    targetId: number | undefined,
    positive: boolean
  ) {
    if (sourceId === undefined || targetId === undefined) {
      Message.showError(
        'Error inserting edge: Source or target ID is undefined.'
      );
      return;
    }

    let edge = this._cytoscape.edges(
      '[source = "' + sourceId + '"][target = "' + targetId + '"]'
    );
    if (edge.length >= 1) {
      // Edge exists
      this._cytoscape.style().update(); //redraw graph
    } else {
      // Make new edge
      this._cytoscape.add({
        group: 'edges',
        data: {
          source: sourceId,
          target: targetId,
          positive: positive.toString(),
        },
      });
    }
  }

  // #endregion

  // #region --- Render Functions - Todo - analyze and delete

  private _showDecisionPanel(data: any) {
    // Todo
    // document.getElementById('decision-info').classList.remove('gone');
    // document.getElementById('decision-attribute').innerHTML =
    //   data.treeData.attribute_name;
    // document.getElementById('decision-phenotype-label').innerHTML =
    //   'Behavior Classes (' + data.treeData.classes.length + '):';
    // let behaviorTable = document.getElementById('decision-behavior-table');
    // this._renderBehaviorTable(
    //   data.treeData.classes,
    //   data.treeData.cardinality,
    //   behaviorTable
    // );
    // let stabilityButton = document.getElementById(
    //   'decision-stability-analysis-button'
    // );
    // let stabilityDropdown = document.getElementById(
    //   'decision-stability-dropdown'
    // );
    // let stabilityContainer = document.getElementById(
    //   'decision-stability-analysis'
    // );
    // TreeExplorer.initStabilityButton(
    //   data.treeData.id,
    //   stabilityButton,
    //   stabilityDropdown,
    //   stabilityContainer
    // );
  }

  //Functionality for the make-decision-button.
  private _makeDecisionFunction(
    addButton: HTMLElement,
    loading: HTMLElement,
    data: any
  ) {
    // Todo Fix
    // if (!UI.testResultsAvailable()) {
    //   return;
    // }
    // if (data.treeData['attributes'] === undefined) {
    //   loading.classList.remove('invisible');
    //   ComputeEngine.AttractorTree.getDecisionAttributes(data.id, (e, r) => {
    //     loading.classList.add('invisible');
    //     addButton.classList.add('gone');
    //     for (attr of r) {
    //       // Prepare data:
    //       attr.left.sort(function (a, b) {
    //         return b.cardinality - a.cardinality;
    //       });
    //       attr.right.sort(function (a, b) {
    //         return b.cardinality - a.cardinality;
    //       });
    //       let leftTotal = attr.left.reduce((a, b) => a + b.cardinality, 0.0);
    //       let rightTotal = attr.right.reduce((a, b) => a + b.cardinality, 0.0);
    //       attr['leftTotal'] = leftTotal;
    //       attr['rightTotal'] = rightTotal;
    //       for (lElement of attr.left) {
    //         lElement['fraction'] = lElement.cardinality / leftTotal;
    //       }
    //       for (rElement of attr.right) {
    //         rElement['fraction'] = rElement.cardinality / rightTotal;
    //       }
    //     }
    //     data.treeData['attributes'] = r;
    //     TreeExplorer.renderAttributeTable(
    //       data.id,
    //       r,
    //       data.treeData.cardinality
    //     );
    //   });
    // } else {
    //   TreeExplorer.renderAttributeTable(
    //     data.id,
    //     data.treeData['attributes'],
    //     data.treeData.cardinality
    //   );
    // }
  }

  private _showMixedPanel(data: any) {
    // Todo
    // document.getElementById('mixed-info').classList.remove('gone');
    // document.getElementById('mixed-type-label').innerHTML =
    //   data.treeData.classes.length + ' Behavior Classes';
    // let table = document.getElementById('mixed-behavior-table');
    // this._renderBehaviorTable(
    //   data.treeData.classes,
    //   data.treeData.cardinality,
    //   table
    // );
    // let loading = document.getElementById('loading-indicator');
    // let addButton = document.getElementById('make-decision-button');
    // addButton.onclick = () => {
    //   this._makeDecisionFunction(addButton, loading, data);
    // };
    // let stabilityButton = document.getElementById(
    //   'mixed-stability-analysis-button'
    // );
    // let stabilityDropdown = document.getElementById('mixed-stability-dropdown');
    // let stabilityContainer = document.getElementById(
    //   'mixed-stability-analysis'
    // );
    // TreeExplorer.initStabilityButton(
    //   data.treeData.id,
    //   stabilityButton,
    //   stabilityDropdown,
    //   stabilityContainer
    // );
  }

  private _renderBehaviorTable(
    classes: any[],
    totalCardinality: number,
    table: HTMLElement
  ) {
    // Todo
    // let rowTemplate = document.getElementById('behavior-table-row-template');
    // // Remove all old rows
    // var oldRow = undefined;
    // do {
    //   oldRow = table.getElementsByClassName('behavior-table-row')[0];
    //   if (oldRow !== undefined) {
    //     oldRow.parentNode.removeChild(oldRow);
    //   }
    // } while (oldRow !== undefined);
    // // Add new rows
    // for (cls of classes) {
    //   let row = rowTemplate.cloneNode(true);
    //   row.id = '';
    //   let behavior = row.getElementsByClassName('cell-behavior')[0];
    //   let witnessCount = row.getElementsByClassName('cell-witness-count')[0];
    //   let distribution = row.getElementsByClassName('cell-distribution')[0];
    //   behavior.innerHTML = this._normalizeClass(cls.class);
    //   if (cls.cardinality > 1000.0) {
    //     witnessCount.innerHTML = cls.cardinality.toExponential();
    //   } else {
    //     witnessCount.innerHTML = cls.cardinality.toString();
    //   }
    //   let percent = TreeExplorer.Math_percent(
    //     cls.cardinality,
    //     totalCardinality
    //   );
    //   let dimPercent = TreeExplorer.Math_dimPercent(
    //     cls.cardinality,
    //     totalCardinality
    //   );
    //   distribution.innerHTML = percent + '% / ' + dimPercent + '٪';
    //   row.classList.remove('gone');
    //   row.classList.add('behavior-table-row');
    //   table.appendChild(row);
    // }
  }

  private _showLeafPanel(data: any) {
    /* Todo - 
    document.getElementById('leaf-info').classList.remove('gone');
    document.getElementById('leaf-phenotype').innerHTML = data.label;
    let percent = TreeExplorer.Math_percent(
      data.treeData.cardinality,
      this._totalCardinality
    );
    let dimPercent = TreeExplorer.Math_dimPercent(
      data.treeData.cardinality,
      this._totalCardinality
    );
    document.getElementById('leaf-witness-count').innerHTML =
      data.treeData.cardinality + ' (' + percent + '% / ' + dimPercent + '٪)';
    let conditions = '';
    let pathId = data.id;
    let source = this._cytoscape.edges('[target = "' + pathId + '"]');
    while (source.length != 0) {
      let data = source.data();
      let is_positive = data.positive === 'true';
      let color = is_positive ? 'green' : 'red';
      let pathId = data.source;
      let attribute = this._cytoscape.getElementById(pathId).data()
        .treeData.attribute_name;
      conditions +=
        "<span class='" + color + "'> ‣ " + attribute + '</span><br>';
      source = this._cytoscape.edges('[target = "' + pathId + '"]');
    }
    document.getElementById('leaf-necessary-conditions').innerHTML = conditions;
    let stabilityButton = document.getElementById(
      'leaf-stability-analysis-button'
    );
    let stabilityDropdown = document.getElementById('leaf-stability-dropdown');
    let stabilityContainer = document.getElementById('leaf-stability-analysis');
    TreeExplorer.initStabilityButton(
      data.treeData.id,
      stabilityButton,
      stabilityDropdown,
      stabilityContainer
    );

    // Show additional phenotypes if this is a leaf that was created due to precision.
    let table = document.getElementById('leaf-behavior-table');
    if (data.treeData['all_classes'] !== undefined) {
      table.classList.remove('gone');
      this._renderBehaviorTable(
        data.treeData['all_classes'],
        data.treeData.cardinality,
        table
      );
    } else {
      table.classList.add('gone');
    } */
  }

  // #endregion

  // #region --- Mass Management ---

  public setMassEnabled() {
    this._showMass = true;
    for (const node of this._cytoscape.nodes()) {
      let data = node.data();
      if (data.treeData !== undefined) {
        data.opacity = this._computeMassOpacity(data.treeData.cardinality);
      }
    }
    this._cytoscape.style().update(); //redraw graph
  }

  public setMassDisabled() {
    this._showMass = false;
    for (const node of this._cytoscape.nodes()) {
      const data = node.data();
      data.opacity = 1.0;
    }
    this._cytoscape.style().update(); //redraw graph
  }

  private _computeMassOpacity(cardinality: number) {
    if (cardinality === undefined) {
      return 1.0;
    }
    let percent = AttractorBifurcationExplorer.mathDimPercent(
      cardinality,
      this._totalCardinality
    );
    return (percent / 100.0) * (percent / 100.0);
  }

  // #endregion

  public fit() {
    this._cytoscape.fit(undefined, this.layoutSettings.fitPadding);
    //this._cytoscape.zoom(this._cytoscape.zoom() * 0.8);	// zoom out a bit to have some padding
  }

  private _applyTreeData(data: any, treeData: NodeDataBE): CytoscapeNodeDataBE {
    if (data.id != treeData.id) {
      Message.showError(
        'Bifurcation Error: Internal Error - Updating wrong node.'
      );
    }
    if (treeData.id == 0) {
      this._totalCardinality = treeData.cardinality;
    }
    if (treeData.classes !== undefined) {
      treeData.classes.sort((a, b) => {
        if (a.cardinality == b.cardinality) {
          return a.class.localeCompare(b.class);
        } else if (a.cardinality < b.cardinality) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    data.treeData = treeData;
    data.type = treeData.type;
    if (treeData.type == 'leaf') {
      let normalizedClass = this._normalizeClass(treeData.class ?? '[]');
      if (normalizedClass.includes('D')) {
        data.subtype = 'disorder';
      } else if (normalizedClass.includes('O')) {
        data.subtype = 'oscillation';
      } else {
        data.subtype = 'stability';
      }
      data.label = normalizedClass;
      //data.label += "\n(" + treeData.cardinality + ")";
    } else if (treeData.type == 'decision') {
      data.label = treeData.attribute_name;
    } else if (treeData.type == 'unprocessed') {
      data.label =
        'Mixed Classes\n' + '(' + (treeData.classes?.length ?? 0) + ' types)';
    } else {
      data.label = treeData.type + '(' + treeData.id + ')';
    }
    let opacity = 1.0;
    if (this._showMass) {
      opacity = this._computeMassOpacity(treeData.cardinality);
    }
    data.opacity = opacity;
    return data;
  }

  public _normalizeClass(cls: string): string {
    return JSON.parse(cls)
      .map((x: string) => x[0])
      .sort()
      .join('');
  }

  public applyTreeLayout(fit = false) {
    const settings = this.layoutSettings;
    const options = settings.useTidytree
      ? {
          name: 'tidytree',
          animate: settings.animate,
          horizontalSpacing: settings.horizontalSpacing,
          verticalSpacing: settings.verticalSpacing,
          extraVerticalSpacings: settings.extraVerticalSpacings,
          layerHeight: settings.layered ? settings.layerHeight : undefined,
          lineWidth: 50,
          // comparator for the order of children, assumes one positive and one negative edge
          edgeComparator: (e1: any, e2: any) => {
            const order =
              (e1.data().positive === 'true' ? 1 : 0) -
              (e2.data().positive === 'true' ? 1 : 0);
            return settings.positiveOnLeft !=
              settings.switchChildren.has(e1.source().id())
              ? -order
              : order;
          },
          fit: fit,
          padding: settings.fitPadding,
        }
      : {
          name: 'dagre',
          spacingFactor: 1.0,
          roots: [0],
          directed: true,
          avoidOverlap: true,
          nodeDimensionsIncludeLabels: true,
          //animate: true,
          fit: fit,
          padding: settings.fitPadding,
        };
    this._cytoscape
      .elements()
      .difference(this._cytoscape.$('.remove-button'))
      .layout(options)
      .run();
  }

  private _handleDragStart(e: any) {
    const dragged = e.target;
    const draggedPos = dragged.position();

    // Save the position at the start of the drag to use in _handleDragEnd
    this._scratch(dragged).dragOrigPos = { ...draggedPos };

    // Update the position of children when the node is moved
    // get descendants and their current positions relative to parent
    const children = dragged.successors('node');
    const relPositions = new Map();
    let limit = 300; // the limit of descendants to move to avoid lag
    children.forEach((child: any) => {
      const childPos = child.position();
      relPositions.set(child, {
        x: childPos.x - draggedPos.x,
        y: childPos.y - draggedPos.y,
      });
      limit--;
      if (limit < 0) {
        return false; // stop iterating (https://js.cytoscape.org/#eles.forEach)
      }
    });

    // apply the saved relative positions
    const handler = (e: EventObject) => {
      const targetPos = e.target.position();
      for (const [child, relPos] of relPositions) {
        child.position({
          x: targetPos.x + relPos.x,
          y: targetPos.y + relPos.y,
        });
      }
    };
    this._scratch(dragged).moveChildrenHandler = handler; // save handler to remove later
    dragged.on('position', handler);
  }

  private _handleDragEnd(e: any) {
    const dragged = e.target;
    const origPos = this._scratch(e.target).dragOrigPos;
    const draggedPos = dragged.position();

    dragged.removeListener(
      'position',
      this._scratch(dragged).moveChildrenHandler
    );
    this._scratch(dragged).moveChildrenHandler = undefined;

    const parentId = this.getParentNode(dragged.id());
    // Do not do anything for the parent node
    // (shouldn't be possible due to grabbable = false anyway)
    if (parentId === undefined) {
      return;
    }

    // If node dragged past its sibling, switch their order
    const siblingId = this.getSiblingNode(dragged.id());
    if (siblingId !== undefined) {
      const siblingPos = this._cytoscape.getElementById(siblingId).position();
      if (
        Math.min(origPos.x, draggedPos.x) < siblingPos.x &&
        Math.max(origPos.x, draggedPos.x) > siblingPos.x
      ) {
        if (!this.layoutSettings.switchChildren.delete(parentId)) {
          this.layoutSettings.switchChildren.add(parentId);
        }
        this.applyTreeLayout();
        return;
      }
    }

    // Else, set node's extra spacing based on the drag final position
    const parent = this._cytoscape.getElementById(parentId);
    const newSpacing =
      draggedPos.y -
      (parent.position().y +
        parent.outerHeight() +
        this.layoutSettings.verticalSpacing);
    if (newSpacing <= 0) {
      delete this.layoutSettings.extraVerticalSpacings[dragged.id()];
      this.applyTreeLayout();
      return;
    }

    this.layoutSettings.extraVerticalSpacings[dragged.id()] = newSpacing;
    this.applyTreeLayout();
  }

  private _scratch(node: any) {
    if (node.scratch('_aeon') === undefined) {
      node.scratch('_aeon', {});
    }
    return node.scratch('_aeon');
  }
}

const CytoscapeABE = new CytoscapeABEClass();
export default CytoscapeABE;
