import { type CytoscapeOptions, type EventObject } from 'cytoscape';
import type {
  CytoscapeNodeDataBE,
  DecisionMixedNode,
  LeafNode,
  NodeDataBE,
  NodeNecessaryConditions,
  VisualOptionsSwitchableABE,
} from '../../../types';
import { Message } from '../../../components/lit-components/message-wrapper';
import AttractorBifurcationExplorer from '../AttractorBifurcationExplorer./AttractorBifurcationExplorer';
import useBifurcationExplorerStatus from '../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';
import BehaviorClassOperations from '../../utilities/BehaviorClassOperations';

const remove_svg =
  '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M4 6h14v14H6z"/><path fill="#d05d5d" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

declare const cytoscape: any;

class CytoscapeABE {
  // #region --- Properties ---

  private cytoscape: any = undefined;
  private totalCardinality = 0.0;
  private showMass = false;

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
    this.cytoscape = cytoscape(this.initOptions());
    this.cytoscape.on('select', (e: EventObject) => this.onSelect(e));
    this.cytoscape.on('unselect', (e: EventObject) => this._onUnselect(e));
    this.cytoscape.on('grabon', this.handleDragStart.bind(this));
    this.cytoscape.on('dragfreeon', this.handleDragEnd.bind(this));
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
            'background-image': function () {
              return (
                'data:image/svg+xml;utf8,' + encodeURIComponent(remove_svg)
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

  // #region --- Cardinality ---

  /** Returns total cardinality of the graph or -1 if not available */
  public getTotalCardinality() {
    return this.totalCardinality ?? -1;
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
    const node = this.cytoscape.add(closeButton);
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
    this.scratch(e.target).removeBtnHandler = handler; // save handler to remove later
    e.target.on('position', handler);
  }

  /** Function to handle node selection */
  private onSelect(e: EventObject) {
    // Todo - add quick help for tree explorer - document.getElementById('quick-help-tree-explorer').classList.add('gone');

    console.log(e.target.data());
    const data: CytoscapeNodeDataBE = e.target.data();
    if (data.action == 'remove') {
      if (!data.targetId) return;
      // This is a remove button for a specifc tree node.
      AttractorBifurcationExplorer.removeNode(Number(data.targetId));
      return;
    }

    const newNode: LeafNode | DecisionMixedNode | null =
      data.type === 'leaf'
        ? {
            id: Number(data.id),
            label: data.label ?? 'Unknown Node',
            type: 'leaf',
            cardinality: data.treeData?.cardinality ?? 0,
            class: data.treeData?.class ?? 'Unknown Class',
            classes: data.treeData?.all_classes ?? undefined,
          }
        : data.type === 'unprocessed' || data.type === 'decision'
        ? {
            id: Number(data.id),
            label: data.label ?? 'Unknown Node',
            type: data.type,
            cardinality: data.treeData?.cardinality ?? 0,
            classes: data.treeData?.classes ?? [],
          }
        : null;

    // If node has unknown type then return
    if (!newNode) return null;

    useBifurcationExplorerStatus.getState().changeSelectedNode(newNode);
    if (data.type === 'decision') this.selectedDecisionNode(e);
  }

  /** Function to handle node unselection */
  private _onUnselect(e: any) {
    useBifurcationExplorerStatus.getState().clear();
    // Clear remove button
    this.cytoscape.$('.remove-button').remove();

    // Remove the listener upading its position
    const scratch = this.scratch(e.target);
    e.target.removeListener('position', scratch.removeBtnHandler);
    scratch.removeBtnHandler = undefined;
  }

  public selectNode(nodeId: string) {
    let current = this.cytoscape.nodes(':selected');
    current.unselect();
    this.cytoscape.getElementById(nodeId).select();
  }

  /** Triggers all necessary events to update UI after graph update.
   * Selects/Unselects nodes as needed.
   * If targetId is provided, it will be selected. */
  public refreshSelection(targetId?: string) {
    let selected = this.cytoscape.$(':selected'); // node or edge that are selected
    if (selected.length > 0) {
      selected.unselect();
    }

    // If there was an error and useBifurcationExplorerStatus has selected node, unselect it
    if (
      selected <= 0 &&
      useBifurcationExplorerStatus.getState().selectedNode != null
    ) {
      useBifurcationExplorerStatus.getState().changeSelectedNode(null);
    }

    if (targetId === undefined) {
      if (selected.length > 0) {
        selected.select();
      }
    } else {
      this.cytoscape.getElementById(targetId).select();
    }
  }

  // #endregion

  // #region --- Node Getters ---

  public getParentNode(targetId: string) {
    let parentEdge = this.cytoscape.edges("edge[target='" + targetId + "']");
    if (parentEdge.length == 0) {
      return undefined;
    }
    return parentEdge.data().source;
  }

  public getChildNode(sourceId: string, positive: boolean) {
    let childEdge = this.cytoscape.edges(
      "edge[source='" + sourceId + "'][positive='" + positive + "']"
    );
    if (childEdge.length == 0) {
      return undefined;
    }
    return childEdge.data().target;
  }

  public getSiblingNode(targetId: string) {
    let parentEdge = this.cytoscape.edges("edge[target='" + targetId + "']");
    if (parentEdge.length == 0) {
      return undefined;
    }
    let sourceId = parentEdge.data().source;
    let positive = !(parentEdge.data().positive == 'true');
    let childEdge = this.cytoscape.edges(
      "edge[source='" + sourceId + "'][positive='" + positive + "']"
    );
    if (childEdge.length == 0) {
      return undefined;
    }
    return childEdge.data().target;
  }

  public getSelectedNodeId() {
    const node = this.cytoscape.nodes(':selected');
    if (node.length == 0) return undefined;
    return node.data().id;
  }

  public getSelectedNodeTreeData() {
    const node = this.cytoscape.nodes(':selected');
    if (node.length == 0) return undefined;
    return node.data().treeData;
  }

  public getNodeType(nodeId: string) {
    return this.cytoscape.getElementById(nodeId).data().type;
  }

  /** Returns necessary conditions to reach a node. */
  public getNodeNecessaryConditions(nodeId: number): NodeNecessaryConditions {
    const conditions: NodeNecessaryConditions = [];
    let pathId = nodeId;
    let source = this.cytoscape.edges('[target = "' + pathId + '"]');
    while (source.length != 0) {
      const data = source.data();
      const is_positive = data.positive === 'true';
      pathId = data.source;
      const name = this.cytoscape.getElementById(pathId).data()
        .treeData.attribute_name;
      conditions.push({
        name: name,
        positive: is_positive,
      });
      source = this.cytoscape.edges('[target = "' + pathId + '"]');
    }

    conditions.reverse(); // Reverse to have the root condition first
    return conditions;
  }

  // #endregion

  // #region --- Ensure/Remove Nodes/Edges ---

  private applyTreeData(data: any, treeData: NodeDataBE): CytoscapeNodeDataBE {
    if (data.id != treeData.id) {
      Message.showError(
        'Bifurcation Error: Internal Error - Updating wrong node.'
      );
    }
    if (treeData.id == 0) {
      this.totalCardinality = treeData.cardinality;
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
      let normalizedClass =
        BehaviorClassOperations.normalizeClasses(
          undefined,
          treeData.class ?? '[]'
        ) ?? 'unknown';
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
    if (this.showMass) {
      opacity = this._computeMassOpacity(treeData.cardinality);
    }
    data.opacity = opacity;
    return data;
  }

  /** Checks if node exists, if it doesn't, creates it, else updates its data. */
  public ensureNode(treeData: NodeDataBE) {
    let node = this.cytoscape.getElementById(treeData.id);
    if (node !== undefined && node.length > 0) {
      const data = node.data();
      this.applyTreeData(data, treeData);
      this.cytoscape.style().update(); //redraw graph
      return node;
    } else {
      const data = this.applyTreeData({ id: treeData.id }, treeData);

      return this.cytoscape.add({
        id: data.id,
        data: data,
        grabbable: treeData.id != 0,
        position: { x: 0.0, y: 0.0 },
      });
    }
  }

  /** Ensures that an edge exists between two nodes. */
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

    const edge = this.cytoscape.edges(
      '[source = "' + sourceId + '"][target = "' + targetId + '"]'
    );
    if (edge.length >= 1) {
      // Edge exists
      this.cytoscape.style().update(); //redraw graph
    } else {
      // Make new edge
      this.cytoscape.add({
        group: 'edges',
        data: {
          source: sourceId,
          target: targetId,
          positive: positive.toString(),
        },
      });
    }
  }

  /** Removes all nodes from the CytoscapeABE. */
  public removeAll() {
    this.cytoscape.nodes(':selected').unselect(); // Triggers reset of other UI.
    this.cytoscape.elements().remove();
  }

  /** Removes node from CytoscapeABE. */
  public removeNode(nodeId: string) {
    let e = this.cytoscape.getElementById(nodeId);
    if (e.length > 0) {
      e.remove();
    }
  }

  // #endregion

  // #region --- Mass Management ---

  public setMassEnabled() {
    this.showMass = true;
    for (const node of this.cytoscape.nodes()) {
      let data = node.data();
      if (data.treeData !== undefined) {
        data.opacity = this._computeMassOpacity(data.treeData.cardinality);
      }
    }
    this.cytoscape.style().update(); //redraw graph
  }

  public setMassDisabled() {
    this.showMass = false;
    for (const node of this.cytoscape.nodes()) {
      const data = node.data();
      data.opacity = 1.0;
    }
    this.cytoscape.style().update(); //redraw graph
  }

  private _computeMassOpacity(cardinality: number) {
    if (cardinality === undefined) {
      return 1.0;
    }
    let percent = AttractorBifurcationExplorer.mathDimPercent(
      cardinality,
      this.totalCardinality
    );
    return (percent / 100.0) * (percent / 100.0);
  }

  // #endregion

  // #region --- Tree Layout Management ---

  /** Fit the whole Bifurcation Tree into view */
  public fit() {
    this.cytoscape.fit(undefined, this.layoutSettings.fitPadding);
    //this._cytoscape.zoom(this._cytoscape.zoom() * 0.8);	// zoom out a bit to have some padding
  }

  /**  Applies the tree layout to the Cytoscape instance */
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
    this.cytoscape
      .elements()
      .difference(this.cytoscape.$('.remove-button'))
      .layout(options)
      .run();
  }

  /** Resets the tree layout to the initial state */
  public resetTreeLayout() {
    this.layoutSettings.extraVerticalSpacings = {};
    this.layoutSettings.switchChildren.clear();
    this.applyTreeLayout();
  }

  /**  Gets the current layout options for the switchable options in CytoscapeABE. */
  public getSwitchLayoutOptions(): VisualOptionsSwitchableABE {
    return {
      animate: this.layoutSettings.animate ?? false,
      snapLayers: this.layoutSettings.layered ?? false,
      positiveOnLeft: this.layoutSettings.positiveOnLeft ?? false,
    };
  }

  /** Sets the nodes to snap to their respective layers.
   *  @param snap - (boolean) Whether to snap nodes to layers or un-snap them.
   */
  public toggleSnapNodesToLayers(): void {
    this.layoutSettings.layered = !this.layoutSettings.layered;
    this.applyTreeLayout();
  }

  /** Animates layout changes in the Cytoscape instance.
   *  @param animate - (boolean) Whether to animate layout changes or not.
   */
  public toggleAnimateLayoutChanges(): void {
    this.layoutSettings.animate = !this.layoutSettings.animate;
  }

  /** Toggles the positive class on the left side of the bifurcation tree. */
  public togglePositiveOnLeft(): void {
    this.layoutSettings.positiveOnLeft = !this.layoutSettings.positiveOnLeft;
    this.applyTreeLayout();
  }

  // #endregion

  // #region --- Node/Edge moving ---

  public moveNode(nodeId: string, steps: number) {
    const settings = this.layoutSettings;
    const spacing = settings.extraVerticalSpacings;
    const change = (settings.layered ? settings.layerHeight : 50) * steps;
    if (spacing[nodeId] === undefined) {
      spacing[nodeId] = 0;
    }
    spacing[nodeId] += change;
    if (spacing[nodeId] <= 0) {
      delete spacing[nodeId];
    }
    this.applyTreeLayout();
  }

  private handleDragStart(e: any) {
    const dragged = e.target;
    const draggedPos = dragged.position();

    // Save the position at the start of the drag to use in _handleDragEnd
    this.scratch(dragged).dragOrigPos = { ...draggedPos };

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
    this.scratch(dragged).moveChildrenHandler = handler; // save handler to remove later
    dragged.on('position', handler);
  }

  private handleDragEnd(e: any) {
    const dragged = e.target;
    const origPos = this.scratch(e.target).dragOrigPos;
    const draggedPos = dragged.position();

    dragged.removeListener(
      'position',
      this.scratch(dragged).moveChildrenHandler
    );
    this.scratch(dragged).moveChildrenHandler = undefined;

    const parentId = this.getParentNode(dragged.id());
    // Do not do anything for the parent node
    // (shouldn't be possible due to grabbable = false anyway)
    if (parentId === undefined) {
      return;
    }

    // If node dragged past its sibling, switch their order
    const siblingId = this.getSiblingNode(dragged.id());
    if (siblingId !== undefined) {
      const siblingPos = this.cytoscape.getElementById(siblingId).position();
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
    const parent = this.cytoscape.getElementById(parentId);
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

  private scratch(node: any) {
    if (node.scratch('_aeon') === undefined) {
      node.scratch('_aeon', {});
    }
    return node.scratch('_aeon');
  }

  // #endregion
}

export default CytoscapeABE;
