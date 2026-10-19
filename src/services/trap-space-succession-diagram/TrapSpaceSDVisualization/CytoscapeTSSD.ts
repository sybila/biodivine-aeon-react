import cytoscape, {
  type Core,
  type CytoscapeOptions,
  type EventObject,
  type NodeSingular,
} from 'cytoscape';
import tidytree from 'cytoscape-tidytree';
import type { TrapSpaceSDStatusState } from '../../../stores/TrapSpaceSuccessionDiagram/TrapSpaceSDStatusState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import { err, ok, type Result } from '../../../types/result';
import type {
  NodeDataTSSD,
  NodesWithParentInfoTSSD,
  NodeTypeTSSD,
  NodeWithType,
  StableMotifInfo,
  VisualizationEdgeDataTSSD,
  VisualizationNodeDataTSSD,
  VisualizationStatus,
} from '../../../types/types';
import type { MessageInt } from '../../global/Message/MessageInt';
import type { DataFormatersInt } from '../../utilities/DataFormaters/DataFormatersInt';
import type { TrapSpaceSDVisualizationInt } from './TrapSpaceSDVisualizationInt';

const remove_svg =
  '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M4 6h14v14H6z"/><path fill="#d05d5d" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

class CytoscapeTSSD implements TrapSpaceSDVisualizationInt {
  // #region --- Properties + Constructor ---

  private cytoscape: Core | undefined;
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

  private rootNodeId: string | null = null;

  private messageServ: MessageInt;
  private dataFormatersServ: DataFormatersInt;

  private trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>;

  private removeNodeFunction: (
    removedNodeId: number,
    removedNodeType: NodeTypeTSSD
  ) => void;

  constructor(
    messageServ: MessageInt,
    dataFormatersServ: DataFormatersInt,

    trapSpaceSDStatusStore: ZustandStore<TrapSpaceSDStatusState>
  ) {
    this.messageServ = messageServ;
    this.dataFormatersServ = dataFormatersServ;

    this.trapSpaceSDStatusStore = trapSpaceSDStatusStore;

    this.removeNodeFunction = (_: number, __: NodeTypeTSSD) => {
      console.warn('CytoscapeABE: RemoveNodeFunction not set');
    };
  }

  // #endregion

  // #region --- Initialization ---
  public init(container: HTMLElement) {
    // Avoid re-initialization
    if (this.container === container) {
      return;
    }

    this.container = container;
    this.cytoscape = cytoscape(this.initOptions());

    cytoscape.use(tidytree);

    this.cytoscape!.on('select', (e: EventObject) => this.onSelect(e));
    this.cytoscape!.on('unselect', (e: EventObject) => this._onUnselect(e));
    this.cytoscape!.on('grabon', this.handleDragStart.bind(this));
    this.cytoscape!.on('dragfreeon', this.handleDragEnd.bind(this));
  }

  private initOptions(): CytoscapeOptions {
    return {
      container: this.container,
      boxSelectionEnabled: false,
      selectionType: 'single',
      wheelSensitivity: 1,
      maxZoom: 18,
      minZoom: 0.5,
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
          selector: 'node[type = "stable-motif"]',
          style: {
            'background-color': '#EFEFEF',
            'border-color': '#616161',
            'border-width': '3px',
            'border-style': 'solid',

            shape: 'hexagon',

            width: 'label',
            height: 'label',
            padding: '12',

            label: 'data(label)',
            'text-valign': 'center',
            'font-family': 'FiraMono',
            'font-size': '12pt',
            color: '#212121',

            opacity: (ele: any) => ele.data('opacity'),
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
          selector: 'node[type = "trap-space-decision"]',
          style: {
            'background-color': '#EFEFEF',
            'border-color': '#616161',
          },
        },
        {
          selector: 'node[type = "leaf"]',
          style: {
            'border-color': '#546E7A',
            'font-family': 'FiraMono',
            'font-size': '16pt',
          },
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'taxi',
            'taxi-direction': 'vertical',
            'target-arrow-shape': 'triangle',
            'taxi-turn': '30px',
          },
        },

        /*{
              'selector': 'node[type="decision"]'
            } */
      ],
    };
  }

  // #endregion

  // #region --- External Function Setters ---

  public setRemoveNodeFunction(
    func: (removedNodeId: number, removedNodeType: NodeTypeTSSD) => void
  ) {
    if (func != undefined) {
      this.removeNodeFunction = func;
    }
  }

  // #endregion

  // #region --- Node/Edge Selection ---

  private addRemoveButton(e: EventObject) {
    const currentPosition = e.target.position();

    // Show close button
    const removeButton = {
      classes: ['remove-button'],
      grabbable: false,
      data: {
        action: 'remove',
        targetData: e.target.data(),
      },
      position: {
        // 12 is half the radius of the close icon
        x: currentPosition.x + e.target.width() / 2 + 12,
        y: currentPosition.y - e.target.height() / 2 - 12,
      },
    };
    const buttonElement = this.cytoscape!.add(removeButton);
    buttonElement.on('mouseover', () => {
      buttonElement.addClass('hover');
    });
    buttonElement.on('mouseout', () => {
      buttonElement.removeClass('hover');
    });

    // Update position of the close button when the target is moved
    const handler = (e: EventObject) => {
      const targetPos = e.target.position();
      buttonElement.position({
        x: targetPos.x + e.target.width() / 2 + 12,
        y: targetPos.y - e.target.height() / 2 - 12,
      });
    };
    this.scratch(e.target).removeBtnHandler = handler; // save handler to remove later
    e.target.on('position', handler);
  }

  /** Function to handle node selection */
  private onSelect(e: EventObject) {
    // Todo - add quick help for tree explorer

    const selectedElement:
      | VisualizationNodeDataTSSD
      | VisualizationEdgeDataTSSD
      | { action: 'remove'; targetData: VisualizationNodeDataTSSD } =
      e.target.data();

    if (selectedElement.action == 'remove') {
      const removeNode = selectedElement.targetData;

      if (removeNode === null) return;

      // This is a remove button for a specifc tree node.
      this.removeNodeFunction(removeNode.treeData.id, removeNode.type);
      return;
    }

    if (selectedElement.type === 'edge') {
      return;
    }

    const nodeData = {
      ...selectedElement.treeData,
      id: Number(selectedElement.treeData.id),
    };

    if (selectedElement.type == 'stable-motif') {
      this.trapSpaceSDStatusStore.getState().changeSelectedItem({
        type: 'stable-motif',
        nodeInfo: nodeData as StableMotifInfo,
      });
    } else {
      this.trapSpaceSDStatusStore.getState().changeSelectedItem({
        type: selectedElement.type,
        nodeInfo: nodeData as NodeDataTSSD,
      });
    }

    if (this.rootNodeId == null) {
      this.getRootNode();
    }

    if (this.rootNodeId != selectedElement.id) {
      this.addRemoveButton(e);
    }
  }

  /** Function to handle node unselection */
  private _onUnselect(e: any) {
    this.trapSpaceSDStatusStore.getState().clearSelectedItemInfo();
    // Clear remove button
    this.cytoscape!.$('.remove-button').remove();

    // Remove the listener upading its position
    const scratch = this.scratch(e.target);
    e.target.removeListener('position', scratch.removeBtnHandler);
    scratch.removeBtnHandler = undefined;
  }

  public selectNode(nodeId: string) {
    let current = this.cytoscape!.nodes(':selected');
    current.unselect();
    this.cytoscape!.getElementById(nodeId).select();
  }

  public selectRootNode() {
    const root = this.getRootNode();

    if (root) {
      this.selectNode(root.id());
    }
  }

  public refreshSelection(targetInfo?: NodeWithType) {
    const selected = this.cytoscape!.nodes(':selected');

    if (selected.length > 0) {
      selected.unselect();
    }

    // If there was an error and this.trapSpaceSDStatusStore has selected node, unselect it
    if (
      selected.size() <= 0 &&
      this.trapSpaceSDStatusStore.getState().selectedItem != null
    ) {
      this.trapSpaceSDStatusStore.getState().changeSelectedItem(null);
    }

    if (targetInfo === undefined) {
      if (selected.length > 0) {
        selected.select();
      }
    } else {
      this.getNode(targetInfo.nodeInfo.id, targetInfo.type).select();
    }
  }

  // #endregion

  // #region --- Node Getters ---

  private getNode(nodeId: number, nodeType: NodeTypeTSSD) {
    return this.cytoscape!.nodes(`[id="${nodeId}"][type="${nodeType}"]`);
  }

  private getRootNode() {
    const rootNode = this.cytoscape!.nodes()
      .filter((node: NodeSingular) => node.incomers('edge').length === 0)
      .first();

    if (rootNode != undefined) {
      this.rootNodeId = rootNode.data('id');
    }

    return rootNode;
  }

  public getNodeInfo(nodeId: number, nodeType: NodeTypeTSSD) {
    const node = this.getNode(nodeId, nodeType);

    if (node.empty()) {
      return undefined;
    }

    const data = node.data().treeData;

    return {
      type: nodeType,
      nodeInfo: data,
    };
  }

  public getParentNode(targetId: string) {
    let parentEdge = this.cytoscape!.edges("edge[target='" + targetId + "']");
    if (parentEdge.length == 0) {
      return undefined;
    }
    return parentEdge.data().source;
  }

  public getChildNodes(
    parentId: number,
    parentType: NodeTypeTSSD
  ): Result<NodesWithParentInfoTSSD> {
    const parentNode = this.getNode(parentId, parentType);

    if (parentNode.empty()) {
      return err(
        `Unable to retrieve children: no ${parentType} node found with id "${parentId}".`
      );
    }

    const outgoingEdges = parentNode.outgoers('edge');

    const childNodes = outgoingEdges.targets();

    if (parentType === 'trap-space-decision' || parentType === 'leaf') {
      const payload: StableMotifInfo[] = childNodes.map((n) =>
        n.data('treeData')
      );
      return ok({
        parentId,
        parentType: 'trap-space-decision',
        nodes: payload,
      });
    }

    const payload: NodeDataTSSD[] = childNodes.map((n) => n.data('treeData'));
    return ok({
      parentId,
      parentType: 'stable-motif',
      nodes: payload,
    });
  }

  public getSiblingNode(targetId: string) {
    let parentEdge = this.cytoscape!.edges("edge[target='" + targetId + "']");
    if (parentEdge.length == 0) {
      return undefined;
    }
    let sourceId = parentEdge.data().source;
    let childEdge = this.cytoscape!.edges("edge[source='" + sourceId + "']");
    if (childEdge.length == 0) {
      return undefined;
    }
    return childEdge.data().target;
  }

  // #endregion

  // #region --- Ensure/Remove Nodes/Edges ---

  private constructVisualizationNodeData(
    node: NodeWithType
  ): VisualizationNodeDataTSSD {
    if (node.type != 'stable-motif' && node.nodeInfo.id == 0) {
      this.totalCardinality = node.nodeInfo.numberOfInterpretations;
    }

    const data: Partial<VisualizationNodeDataTSSD> = {
      id: node.nodeInfo.id.toString(),
      label: this.dataFormatersServ.convertRecordOfVariableStatesToString(
        node.nodeInfo.variableValues
      ),
      opacity: this.showMass
        ? this._computeMassOpacity(node.nodeInfo.numberOfInterpretations)
        : 1.0,
    };

    if (node.type == 'stable-motif') {
      data.type = 'stable-motif';
      data.treeData = node.nodeInfo as StableMotifInfo;
    } else {
      data.type = node.type;
      data.treeData = node.nodeInfo as NodeDataTSSD;
    }

    return data as VisualizationNodeDataTSSD;
  }

  public ensureNode(node: NodeWithType) {
    const existingNode = this.getNode(node.nodeInfo.id, node.type);

    if (existingNode !== undefined && existingNode.length > 0) {
      this.cytoscape!.style().update();
      return ok(false);
    }
    const data = this.constructVisualizationNodeData(node);

    if (this.cytoscape!.nodes().empty()) {
      this.rootNodeId = node.nodeInfo.id.toString();
    }

    this.cytoscape!.add({
      data: data,
      grabbable: node.type == 'stable-motif' || node.nodeInfo.id != 0,
      position: { x: 0.0, y: 0.0 },
    });

    return ok(true);
  }

  public ensureEdge(sourceId: number, targetId: number) {
    const existingEdge = this.cytoscape!.edges(
      '[source = "' + sourceId + '"][target = "' + targetId + '"]'
    );

    if (existingEdge.length >= 1) {
      // Edge exists
      this.cytoscape!.style().update(); //redraw graph

      return ok(false);
    }

    // Make new edge
    this.cytoscape!.add({
      group: 'edges',
      data: {
        source: sourceId,
        target: targetId,
        selectable: false,
        type: 'edge',
      },
    });

    return ok(true);
  }

  public removeAll() {
    this.cytoscape!.nodes(':selected').unselect(); // Triggers reset of other UI.
    this.cytoscape!.elements().remove();
    this.rootNodeId = null;
  }

  public removeNode(nodeId: number, nodeType: NodeTypeTSSD): Result<undefined> {
    const node = this.getNode(nodeId, nodeType);

    if (node.size() > 0) {
      node.remove();

      if (node.data('id') == this.rootNodeId) {
        this.rootNodeId = null;
      }
    }

    return ok(undefined);
  }

  // #endregion

  // #region --- Mass Management ---

  private _computeMassOpacity(cardinality: number) {
    if (cardinality === undefined) {
      return 1.0;
    }
    // let percent = this.mathDimPercentFunction(
    //   cardinality,
    //   this.totalCardinality
    // );

    const percent = cardinality / this.totalCardinality;
    return (percent / 100.0) * (percent / 100.0);
  }

  // #endregion

  // #region --- Tree Layout Management ---

  public fit() {
    this.cytoscape!.fit(undefined, this.layoutSettings.fitPadding);
    //this._cytoscape.zoom(this._cytoscape.zoom() * 0.8);	// zoom out a bit to have some padding
  }

  public setZoom(zoomLevel: number) {
    const zoom = Math.min(
      this.cytoscape!.maxZoom(),
      Math.max(this.cytoscape!.minZoom(), zoomLevel)
    );

    this.cytoscape!.zoom({
      level: zoom,
      renderedPosition: {
        x: this.cytoscape!.width() / 2,
        y: this.cytoscape!.height() / 2,
      },
    });
  }

  public applyTreeLayout(
    fit: boolean = false,
    animate: boolean = this.layoutSettings.animate
  ) {
    const settings = this.layoutSettings;
    const options = settings.useTidytree
      ? {
          name: 'tidytree',
          animate: animate,
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
    this.cytoscape!.elements()
      .difference(this.cytoscape!.$('.remove-button'))
      .layout(options)
      .run();
  }

  public resetTreeLayout() {
    this.layoutSettings.extraVerticalSpacings = {};
    this.layoutSettings.switchChildren.clear();
    this.applyTreeLayout();
  }

  public getSetVisualOptions() {
    return {
      animate: this.layoutSettings.animate ?? false,
      snapLayers: this.layoutSettings.layered ?? false,
    };
  }

  public toggleSnapNodesToLayers() {
    this.layoutSettings.layered = !this.layoutSettings.layered;
    this.applyTreeLayout();
  }

  public toggleAnimateLayoutChanges() {
    this.layoutSettings.animate = !this.layoutSettings.animate;
    this.applyTreeLayout();
  }

  // #endregion

  // #region --- Node/Edge moving ---

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
      const siblingPos = this.cytoscape!.getElementById(siblingId).position();
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
    const parent = this.cytoscape!.getElementById(parentId);
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

  // #region --- Visualization Status ---

  public getVisualizationStatus() {
    return {
      zoom: {
        minZoom: this.cytoscape!.minZoom(),
        maxZoom: this.cytoscape!.maxZoom(),
        currentZoom: this.cytoscape!.zoom(),
      },
      pan: this.cytoscape!.pan(),
    };
  }

  public loadVisualizationStatus(status: VisualizationStatus) {
    // Apply viewport directly to avoid triggering additional animated relayouts.
    if (status.zoom !== undefined || status.pan !== undefined) {
      this.cytoscape!.viewport({
        zoom: status.zoom.currentZoom ?? this.cytoscape!.zoom(),
        pan: status.pan ?? this.cytoscape!.pan(),
      });
    }
  }

  // #endregion
}

export default CytoscapeTSSD;
