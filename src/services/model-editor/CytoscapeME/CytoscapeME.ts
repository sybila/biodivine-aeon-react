import { type CytoscapeOptions } from 'cytoscape';
import {
  EdgeMonotonicity,
  type ControlInfo,
  type RegulationVariables,
} from '../../../types';
import { LiveModel } from '../../global/LiveModel/LiveModel';
import ModelEditor from '../ModelEditor/ModelEditor';
import ControlEditor from '../ControlEditor/ControlEditor';
import useControlStore from '../../../stores/LiveModel/useControlStore';
import { Message } from '../../../components/lit-components/message-wrapper';
import useModelEditorStatus from '../../../stores/ModelEditor/useModelEditorStatus';

const DOUBLE_CLICK_DELAY = 400;

declare const cytoscape: any;

// Modified version of the add_box-24px.svg with color explicitly set to blue and an additional background element which makes sure the plus sign is filled.
const _add_box_svg =
  '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M4 4h16v16H4z"/><path fill="#6a7ea5" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

/** Responsible for managing the cytoscape editor object. It has its own representation of the graph,
 * but it should never be updated directly. Instead, always use LiveModel to specify updates.
 */
class CytoscapeMEClass {
  // #region --- Properties ---

  // Reference to the cytoscape library "god object"
  private cytoscape: any = undefined;
  // Reference to the edgehandles library "god object"
  private edgehandles: any = undefined;
  // Used to implement the double click feature
  private lastClickTimestamp: number | undefined = undefined;

  // True if show control-enabled button is in effect.
  private controlEnabledShown: boolean | undefined = undefined;
  // True if show phenotype button is in effect.
  private phenotypeShown: boolean | undefined = undefined;
  /** Reference to the container element, where the cytoscape graph is rendered. */
  private container: HTMLElement | null = null;

  // #endregion

  // #region --- Initialization ---

  init(container: HTMLElement) {
    // Avoid re-initialization
    if (this.container === container) {
      return;
    }

    this.container = container;

    this.cytoscape = cytoscape(this.initOptions());
    this.edgehandles = this.cytoscape.edgehandles(this.edgeOptions());

    // When the user moves or zooms the graph, position of menu must update as well.
    this.cytoscape.on('zoom', (e: any) => {
      this.renderMenuForSelectedNode();
      this.renderMenuForSelectedEdge();
    });
    this.cytoscape.on('pan', (e: any) => {
      this.renderMenuForSelectedNode();
      this.renderMenuForSelectedEdge();
    });
    this.cytoscape.on('click', (e: any) => {
      if (e.target !== this.cytoscape) return;

      let now = new Date().getTime();

      if (
        this.lastClickTimestamp &&
        now - this.lastClickTimestamp < DOUBLE_CLICK_DELAY
      ) {
        LiveModel.Variables.addVariable(false, [
          e.position['x'],
          e.position['y'],
        ]);
      }
      this.lastClickTimestamp = now;
    });

    this.controlEnabledShown = false;
    this.phenotypeShown = false;
  }

  private initOptions(): CytoscapeOptions {
    return {
      container: this.container,
      // Some sensible default auto-layout algorithm
      layout: {
        animate: true,
        animationDuration: 300,
        animationThreshold: 250,
        refresh: 20,
        fit: true,
        name: 'cose',
        padding: 250,
        nodeRepulsion: function (node: any) {
          return 100000;
        },
        nodeDimensionsIncludeLabels: true,
      },
      boxSelectionEnabled: false,
      selectionType: 'single',
      style: [
        {
          // Style of the graph nodes
          selector: 'node[name]',
          style: {
            //
            label: 'data(name)',
            // put label in the middle of the node (vertically)
            'text-valign': 'center',
            width: 'label',
            height: 'label',
            // a rectangle with slightly sloped edges
            shape: 'roundrectangle',
            // when selecting, do not display any overlay
            'overlay-opacity': 0,
            // other visual styles
            padding: '12',
            'background-color': '#dddddd',
            'font-family': 'FiraMono',
            'font-size': '12pt',
            'border-width': '1px',
            'border-color': '#bbbbbb',
            'border-style': 'solid',
          },
        },
        {
          // When a node is highlighted by mouse, show it with a dashed blue border.
          selector: 'node.hover',
          style: {
            'border-width': '2.0px',
            'border-color': '#6a7ea5',
            'border-style': 'dashed',
          },
        },
        {
          // When a node is selected, show it with a thick blue border.
          selector: 'node:selected',
          style: {
            'border-width': '2.0px',
            'border-color': '#6a7ea5',
            'border-style': 'solid',
          },
        },
        {
          // General style of the graph edge
          selector: 'edge',
          style: {
            width: 3.0,
            'curve-style': 'bezier',
            'loop-direction': '-15deg',
            'loop-sweep': '30deg',
            'text-outline-width': 2.3,
            'text-outline-color': '#cacaca',
            'font-family': 'FiraMono',
          },
        },
        {
          selector: 'edge.hover',
          style: { 'overlay-opacity': 0.1 },
        },
        {
          // Show non-observable edges as dashed
          selector: 'edge[observable]',
          style: {
            'line-style': (edge: any) => {
              if (edge.data().observable) {
                return 'solid';
              } else {
                return 'dashed';
              }
            },
            'line-dash-pattern': [8, 3],
          },
        },
        {
          // When the edge is an activation, show it as green with normal arrow
          selector: 'edge[monotonicity="activation"]',
          style: {
            'line-color': '#4abd73',
            'target-arrow-color': '#4abd73',
            'target-arrow-shape': 'triangle',
          },
        },
        {
          // When the edge is an inhibition, show it as red with a `tee` arrow
          selector: 'edge[monotonicity="inhibition"]',
          style: {
            'line-color': '#d05d5d',
            'target-arrow-color': '#d05d5d',
            'target-arrow-shape': 'tee',
          },
        },
        {
          // When the edge has unspecified monotonicity, show it as grey with normal arrow
          selector: 'edge[monotonicity="unspecified"]',
          style: {
            'line-color': '#797979',
            'target-arrow-color': '#797979',
            'target-arrow-shape': 'triangle',
          },
        },
        {
          // A selected edge should be drawn with an overlay
          selector: 'edge:selected',
          style: {
            'overlay-opacity': 0.1,
          },
        },
        {
          // Edge handles pseudo-node for adding
          selector: '.eh-handle',
          style: {
            width: '32px',
            height: '32px',
            shape: 'rectangle',
            'background-opacity': 0,
            'background-image': function (e: any) {
              return (
                'data:image/svg+xml;utf8,' + encodeURIComponent(_add_box_svg)
              );
            },
            'background-width': '32px',
            'background-height': '32px',
            padding: '0%',
            'overlay-opacity': 0,
            'border-width': 0,
            'border-opacity': 0,
          },
        },
        {
          // Change ghost edge preview colors
          selector: '.eh-preview, .eh-ghost-edge',
          style: {
            'background-color': '#797979',
            'line-color': '#797979',
            'target-arrow-color': '#797979',
            'target-arrow-shape': 'triangle',
          },
        },
        {
          // Hide ghost edge when a snapped preview is visible
          selector: '.eh-ghost-edge.eh-preview-active',
          style: { opacity: 0 },
        },
      ],
    };
  }

  private edgeOptions() {
    return {
      preview: true, // whether to show added edges preview before releasing selection
      hoverDelay: 150, // time spent hovering over a target node before it is considered selected
      handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
      snap: false,
      snapThreshold: 50,
      snapFrequency: 15,
      noEdgeEventsInDraw: false,
      disableBrowserGestures: true,
      nodeLoopOffset: -50,
      // The `+` button should be drawn on top of each node
      handlePosition: function (node: any) {
        return 'middle top';
      },
      handleInDrawMode: false,
      edgeType: function (sourceNode: any, targetNode: any) {
        return 'flat';
      },
      // Loops are always allowed
      loopAllowed: function (node: any) {
        return true;
      },
      // Initialize edge with default parameters
      edgeParams: function (sourceNode: any, targetNode: any, i: any) {
        return {
          data: {
            observable: true,
            monotonicity: EdgeMonotonicity.unspecified,
          },
        };
      },
      // Add the edge to the live model
      complete: (sourceNode: any, targetNode: any, addedEles: any) => {
        if (
          !LiveModel.Regulations.addRegulation(
            false,
            Number(sourceNode.id()),
            Number(targetNode.id()),
            true,
            EdgeMonotonicity.unspecified
          )
        ) {
          addedEles.remove(); // if we can't create the regulation, remove new edge
        } else {
          this.initEdge(addedEles[0]);
        }
      },
    };
  }

  // #endregion

  // #region --- Node Management ---

  /** Add a new node to the graph at the given position. */
  public addNode(
    id: number,
    name: string,
    position: [number, number] = [0, 0]
  ) {
    let node = this.cytoscape.add({
      data: { id: id, name: name },
      position: { x: position[0], y: position[1] },
    });

    this.highlightControlEnabled([
      [
        id,
        useControlStore.getState().getVariableControlInfo(id) ?? {
          controlEnabled: true,
          phenotype: null,
        },
      ],
    ]);

    node.on('mouseover', (e: any) => {
      node.addClass('hover');
      ModelEditor.hoverVariable(id, true);
      ControlEditor.hoverVariable(id, true);
    });
    node.on('mouseout', (e: any) => {
      node.removeClass('hover');
      ModelEditor.hoverVariable(id, false);
      ControlEditor.hoverVariable(id, false);
    });
    node.on('select', (e: any) => {
      // deselect any previous selection - we don't support multiselection yet
      for (let selected of this.cytoscape.$(':selected')) {
        if (selected.data().id != id) {
          selected.unselect();
        }
      }
      useModelEditorStatus
        .getState()
        .setSelectedItemInfo({ type: 'variable', id: id });
      this.renderMenuForSelectedNode(node);
    });
    node.on('unselect', (e: any) => {
      useModelEditorStatus.getState().setSelectedItemInfo(null);
      useModelEditorStatus.getState().setFloatingMenuInfo(null); // hide menu
    });
    node.on('click', (e: any) => {
      this.lastClickTimestamp = undefined; // ensure that we cannot double-click inside the node
    });
    node.on('drag', (e: any) => {
      if (node.selected()) this.renderMenuForSelectedNode(node);
      this.renderMenuForSelectedEdge();
    });
  }

  /** Remove the node with the given ID from the graph. */
  public removeNode(id: number) {
    let node = this.cytoscape.getElementById(id);
    if (node !== undefined) {
      if (node.selected()) node.unselect(); // ensure menu is hidden, etc.
      this.cytoscape.remove(node);
    } else {
      Message.showError(
        'Cannot remove node from editor canvas: Internal Error (' +
          id +
          ' - node not found)'
      );
    }
  }

  /** Change name of the node to the given value. */
  public renameNode(id: number, newName: string) {
    let node = this.cytoscape.getElementById(id);
    if (node !== undefined) {
      let data = node.data();
      data['name'] = newName;
      this.cytoscape.style().update(); //redraw graph
    }
  }

  /** Set the given node as selected. */
  public selectNode(id: number) {
    let selected = this.cytoscape.$(':selected'); // node or edge that are selected
    if (selected.length == 1) {
      selected.unselect();
    }
    let node = this.cytoscape.getElementById(id);
    if (node !== undefined) {
      node.select();
    }
  }

  /** Return an id of the selected node, or undefined if nothing is selected. */
  public getSelectedNodeId(): string | undefined {
    let node = this.cytoscape.nodes(':selected');
    if (node.length == 0) return undefined; // nothing selected
    return node.id();
  }

  /** Allow to externally set which node is hovered - make sure to unset it as well. */
  public hoverNode(id: number, isHover: boolean) {
    let node = this.cytoscape.getElementById(id);
    if (isHover) {
      node.addClass('hover');
    } else {
      node.removeClass('hover');
    }
  }

  /** Get the position of the node with the given id, or undefined if the node does not exist. */
  public getNodePosition(id: number): [number, number] | undefined {
    let node = this.cytoscape.getElementById(id);
    if (node !== undefined) {
      let position = node.position();
      return [position.x, position.y];
    }
    return undefined;
  }

  // #endregion

  // #region --- Edge Management ---

  /** Helper function to initialize new edge object, since edges can appear explicitly
   * or from the edgehandles plugin. */
  private initEdge(edge: any) {
    const edgeVars: RegulationVariables = {
      regulator: Number(edge.data().source),
      target: Number(edge.data().target),
    };

    edge.on('select', (e: any) => {
      useModelEditorStatus
        .getState()
        .setSelectedItemInfo({ type: 'regulation', regulationIds: edgeVars });
      ModelEditor.selectRegulation(edgeVars, true); // Todo - move regulation select to useModelEditorStatus
      this.renderMenuForSelectedEdge(edge);
    });
    edge.on('unselect', (e: any) => {
      ModelEditor.selectRegulation(edgeVars, false); // Todo - move regulation select to useModelEditorStatus
      useModelEditorStatus.getState().setSelectedItemInfo(null);
      useModelEditorStatus.getState().setFloatingMenuInfo(null);
    });
    edge.on('mouseover', (e: any) => {
      edge.addClass('hover');
      ModelEditor.hoverRegulation(edgeVars, true);
    });
    edge.on('mouseout', (e: any) => {
      edge.removeClass('hover');
      ModelEditor.hoverRegulation(edgeVars, false);
    });
  }

  /** Allow to externally set which edge is hovered - just make sure to unset it later. */
  public hoverEdge(regulatorId: number, targetId: number, isHover: boolean) {
    let edge = this.findRegulationEdge(regulatorId, targetId);
    if (edge !== undefined) {
      if (isHover) {
        edge.addClass('hover');
      } else {
        edge.removeClass('hover');
      }
    }
  }

  /** Return the edge which represents regulation between the given pair of variables or undefined
   * if such edge does not exist.
   */
  private findRegulationEdge(regulatorId: number, targetId: number): any {
    let edge = this.cytoscape.edges(
      '[source = "' + regulatorId + '"][target = "' + targetId + '"]'
    );
    if (edge.length == 1) {
      return edge[0];
    } else {
      return undefined;
    }
  }

  // #endregion

  // #region --- Regulation Management ---

  /** Remove regulation between the two specified nodes. */
  public removeRegulation(regulatorId: number, targetId: number) {
    let edge = this.findRegulationEdge(regulatorId, targetId);
    if (edge !== undefined) {
      if (edge.selected()) edge.unselect();
      this.cytoscape.remove(edge);
    }
  }

  /** Ensure that the graph contains edge which corresponds to the provided regulation. */
  public ensureRegulation(regulation: any) {
    const currentEdge = this.findRegulationEdge(
      regulation.regulator,
      regulation.target
    );
    if (currentEdge !== undefined) {
      // Edge exists - just make sure to update data
      const data = currentEdge.data();
      data.observable = regulation.observable;
      data.monotonicity = regulation.monotonicity;
      this.cytoscape.style().update(); //redraw graph
      if (currentEdge.selected()) {
        // if the edge is selected, we also redraw the edge menu
        this.renderMenuForSelectedEdge(currentEdge);
      }
    } else {
      // Edge does not exist - create a new one
      const edge = this.cytoscape.add({
        group: 'edges',
        data: {
          source: regulation.regulator,
          target: regulation.target,
          observable: regulation.observable,
          monotonicity: regulation.monotonicity,
        },
      });
      this.initEdge(edge);
    }
  }

  /** Return a { regulator, target } object that describes currently selected regulation,
   * or undefined if nothing is selected. */
  public getSelectedRegulationPair():
    | { regulator: string; target: string }
    | undefined {
    let edge = this.cytoscape.edges(':selected');
    if (edge.length == 0) return undefined; // nothing selected
    return { regulator: edge.data().source, target: edge.data().target };
  }

  // #endregion

  // #region --- Graph Actions ---

  /** Zoom and pan the editor to ensure that given node is visible. */
  public showNode(id: number) {
    let node = this.cytoscape.getElementById(id);
    if (node !== undefined) {
      // Taken from https://github.com/cytoscape/cytoscape.js/issues/1691
      let zoom = 1.1;
      let bb = node.boundingBox();
      let w = this.cytoscape.width();
      let h = this.cytoscape.height();
      var pan = {
        // add some random padding so it does not end up under the editor panel
        x: (w - zoom * (bb.x1 + bb.x2)) / 2 + 250,
        y: (h - zoom * (bb.y1 + bb.y2)) / 2,
      };

      this.cytoscape.animate({
        zoom: 1.1,
        pan: pan,
      });
    }
  }

  /** Pan and zoom the graph to show the whole model. */
  public fit() {
    this.cytoscape.fit();
    this.cytoscape.zoom(this.cytoscape.zoom() * 0.8); // zoom out a bit to have some padding
  }

  // #endregion

  // #region --- Menu Rendering ---

  /** Update the node menu to be shown exactly for this element
   * (including zoom and other node properties)
   * If the node is undefined, try to find it
   */
  private renderMenuForSelectedNode(node?: any) {
    if (node === undefined) {
      node = this.cytoscape.nodes(':selected');
      if (node.length == 0) return; // nothing selected
    }
    let zoom = this.cytoscape.zoom();
    let position = node.renderedPosition();
    //let height = node.height() * zoom;
    useModelEditorStatus
      .getState()
      .setFloatingMenuInfo({ position: [position['x'], position['y']], zoom });
  }

  /** Update the edge menu to be shown exactly for the currently selected edge.
   * If edge is undefined, try to obtain the selected edge.
   */
  private renderMenuForSelectedEdge(edge?: any) {
    if (edge === undefined) {
      edge = this.cytoscape.edges(':selected');
      if (edge.length == 0) return; // nothing selected
    }
    const zoom = this.cytoscape.zoom();
    const boundingBox = edge.renderedBoundingBox();
    const position: [number, number] = [
      (boundingBox.x1 + boundingBox.x2) / 2,
      (boundingBox.y1 + boundingBox.y2) / 2,
    ];
    useModelEditorStatus.getState().setFloatingMenuInfo({
      position: position,
      zoom,
    });
  }

  // #endregion

  // #region --- Node Layouts ---

  /** Layout the nodes in a organic manner, using the `cose` algorithm. */
  layoutCose() {
    this.cytoscape
      .layout({
        name: 'cose',
        padding: 50,
        animate: true,
        animationDuration: 3000,
        nodeOverlap: 20,
        gravity: 0.5,
        fit: true,
        nodeDimensionsIncludeLabels: true,
      })
      .start();
  }

  /** Layout the nodes in a hierarchical manner, using the `dagre` algorithm. */
  layoutDagre() {
    this.cytoscape
      .layout({
        name: 'dagre',
        acyclicer: 'greedy',
        ranker: 'network-simplex',
        padding: 50,
        animate: true,
        animationDuration: 300,
        fit: true,
        nodeDimensionsIncludeLabels: true,
      })
      .start();
  }

  /** Applies concentric layout to sort data by phenotype or by control-enabled values.
   * If phenotype parameter is true, then sorts by phenotype, else by control-enabled. */
  private applyConcentricLayout(phenotype: boolean) {
    const nodes: Array<[Number, ControlInfo]> = [];
    const variables: Record<string, number> = {};

    useControlStore
      .getState()
      .getAllInfoIds()
      .forEach(([id, info]) => {
        nodes.push(this.cytoscape.getElementById(id));

        if (phenotype == true) {
          variables[id] = info.phenotype == null ? 0 : info.phenotype ? 1 : 2;
        } else {
          variables[id] = info.controlEnabled ? 0 : 1;
        }
      });

    const nodesCol = this.cytoscape.collection(nodes);

    nodesCol
      .layout({
        name: 'concentric',
        concentric: function (node: any) {
          return variables[node.id()];
        },
        levelWidth: function () {
          return 1;
        },
        minNodeSpacing: 5,
        padding: 5,
        startAngle: (3 / 2) * Math.PI,
        clockwise: true,
        animate: true,
        animationDuration: 300,
        nodeDimensionsIncludeLabels: true,
        fit: true,
      })
      .run();
  }

  /** Layout the nodes in a phenotype-aware manner. */
  public layoutPhenotype() {
    this.applyConcentricLayout(true);
  }

  /** Layout the nodes in a control-enabled manner. */
  public layoutControlEnabled() {
    this.applyConcentricLayout(false);
  }

  // #endregion

  // #region --- Node Highlighting ---

  /** Changes colour of all nodes which are set as control-enabled. */
  public highlightControlEnabled(
    inputNodes: Array<[number, ControlInfo]> | null = null
  ) {
    var nodes: Array<[number, ControlInfo]> | undefined = undefined;

    if (inputNodes == null) {
      nodes = useControlStore.getState().getAllInfoIds();
      this.controlEnabledShown = !this.controlEnabledShown;
    } else {
      nodes = inputNodes;
    }

    nodes.forEach(([id, controlInfo]) => {
      if (this.controlEnabledShown && controlInfo.controlEnabled) {
        this.cytoscape.getElementById(id).style('background-color', '#FFFF66');
      } else {
        this.cytoscape.getElementById(id).style('background-color', '');
      }
    });
  }

  /** Returns true if the control-enabled highlighting is currently active. */
  public isControlEnabledHighlighted(): boolean {
    return this.controlEnabledShown ?? false;
  }

  /** Changes borders of all nodes which are in the phenotype. */
  public highlightPhenotype(
    inputNodes: Array<[number, ControlInfo]> | null = null
  ) {
    var nodes: Array<[number, ControlInfo]> | undefined = undefined;

    if (inputNodes == null) {
      nodes = useControlStore.getState().getAllInfoIds();
      this.phenotypeShown = !this.phenotypeShown;
    } else {
      nodes = inputNodes;
    }

    nodes.forEach(([id, controlInfo]) => {
      if (this.phenotypeShown && controlInfo.phenotype == true) {
        this.cytoscape.getElementById(id).style('border-color', 'green');
        this.cytoscape.getElementById(id).style('color', 'green');
        this.cytoscape.getElementById(id).style('border-width', '2px');
      } else if (this.phenotypeShown && controlInfo.phenotype == false) {
        this.cytoscape.getElementById(id).style('border-color', 'red');
        this.cytoscape.getElementById(id).style('color', 'red');
        this.cytoscape.getElementById(id).style('border-width', '2px');
      } else {
        this.cytoscape.getElementById(id).style('border-color', '');
        this.cytoscape.getElementById(id).style('color', 'black');
        this.cytoscape.getElementById(id).style('border-width', '1px');
      }
    });
  }

  /** Returns true if the phenotype highlighting is currently active. */
  public isPhenotypeHighlighted(): boolean {
    return this.phenotypeShown ?? false;
  }

  // #endregion
}

const CytoscapeME: CytoscapeMEClass = new CytoscapeMEClass();

export default CytoscapeME;
