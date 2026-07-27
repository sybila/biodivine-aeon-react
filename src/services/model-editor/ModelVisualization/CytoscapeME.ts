import cytoscape, {
  type Collection,
  type CytoscapeOptions,
  type NodeCollection,
} from 'cytoscape';
import dagre from 'cytoscape-dagre';
import edgehandles from 'cytoscape-edgehandles';
import type { ControlStatus } from '../../../stores/LiveModel/ControlStore/ControlStatus';
import type { VariablePositionsState } from '../../../stores/LiveModel/VariablePositions/VariablePostionsState';
import type { ModelEditorStatus } from '../../../stores/ModelEditor/ModelEditorStatus';
import type { UndoRedoState } from '../../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import {
  EdgeMonotonicity,
  PHENOTYPE_STATUS,
  type ModelEditorRegulation,
  type ModelEditorVariable,
  type PhenotypeStatus,
  type Position,
  type Regulation,
  type RegulationVariables,
  type Variable,
} from '../../../types';
import type { LiveModelInt } from '../../global/LiveModel/LiveModelInt';
import type { MessageInt } from '../../global/Message/MessageInt';
import type { ModelVisualizationInt } from './ModelVisualizationInt';

const DOUBLE_CLICK_DELAY = 400;

// Modified version of the add_box-24px.svg with color explicitly set to blue and an additional background element which makes sure the plus sign is filled.
const addBoxSvg = (boxColor: string, iconColor: string) =>
  `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="${iconColor}" d="M4 4h16v16H4z"/>
    <path fill="${boxColor}" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>`;

/** Responsible for managing the cytoscape editor object. It has its own representation of the graph,
 * but it should never be updated directly. Instead, always use LiveModel to specify updates.
 */
class CytoscapeME implements ModelVisualizationInt {
  // #region --- Properties + constructor ---

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

  /** Reference to LiveModel object which is responsible for managing currently loaded model */
  private liveModel: LiveModelInt;
  private messageServ: MessageInt;

  private controlStore: ZustandStore<ControlStatus>;
  private modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
  private modelUndoRedoStore: ZustandStore<UndoRedoState>;
  private variablePositionsStore: ZustandStore<VariablePositionsState>;

  constructor(
    liveModel: LiveModelInt,
    messageServ: MessageInt,
    controlStore: ZustandStore<ControlStatus>,
    modelEditorStatusStore: ZustandStore<ModelEditorStatus>,
    modelUndoRedoStore: ZustandStore<UndoRedoState>,
    variablePositionsStore: ZustandStore<VariablePositionsState>
  ) {
    this.liveModel = liveModel;
    this.messageServ = messageServ;

    this.controlStore = controlStore;
    this.modelEditorStatusStore = modelEditorStatusStore;
    this.modelUndoRedoStore = modelUndoRedoStore;
    this.variablePositionsStore = variablePositionsStore;
  }

  // #endregion

  // #region --- Initialization ---

  async init(container: HTMLElement) {
    // Avoid re-initialization
    if (this.container === container) {
      return;
    }

    await document.fonts.load('12px FiraMono');

    this.container = container;

    cytoscape.use(edgehandles);
    cytoscape.use(dagre);

    this.cytoscape = cytoscape(this.initOptions());
    this.edgehandles = this.cytoscape.edgehandles(this.edgeOptions());

    // When the user moves or zooms the graph, position of menu must update as well.
    this.cytoscape.on('zoom', (e: any) => {
      if (e.target !== this.cytoscape) return;

      this.modelEditorStatusStore.getState().setVisualizationZoomStatus({
        minZoom: this.cytoscape.minZoom(),
        maxZoom: this.cytoscape.maxZoom(),
        currentZoom: this.cytoscape.zoom(),
      });

      this.hideMenu();
    });
    this.cytoscape.on('pan', (e: any) => {
      if (e.target !== this.cytoscape) return;

      this.hideMenu();
    });
    this.cytoscape.on('click', (e: any) => {
      if (e.target !== this.cytoscape) return;

      let now = new Date().getTime();

      this.hideMenu();

      if (
        this.lastClickTimestamp &&
        now - this.lastClickTimestamp < DOUBLE_CLICK_DELAY
      ) {
        this.liveModel.Variables.addVariable(false, true, [
          e.position['x'],
          e.position['y'],
        ]);
      }
      this.lastClickTimestamp = now;
    });

    this.controlEnabledShown = false;
    this.phenotypeShown = false;

    this.liveModel.Export.setGetNodePositionFunction((variableId: number) => {
      return this.getNodePosition(variableId);
    });

    this.liveModel.Control.addOnControlChangeCallback(
      (inputNodes?: [number, boolean][] | null) => {
        this.highlightControlEnabled(inputNodes);
      }
    );
    this.liveModel.Control.addOnPhenotypeChangeCallback(
      (inputNodes?: [number, PhenotypeStatus][] | null) => {
        this.highlightPhenotype(inputNodes);
      }
    );

    this.liveModel.Import.addOnImportCallback(() => {
      this.fit();
    });

    this.liveModel.Regulations.setRemoveFromModelVisualizationFunction(
      (regulatorId: number, targetId: number) => {
        this.removeRegulation(regulatorId, targetId);
      }
    );

    this.liveModel.Regulations.setEnsureInModelVisualizationFunction(
      (regulation: Regulation) => {
        this.ensureRegulation(regulation);
      }
    );

    this.liveModel.Variables.setAddNodeFromVisualizationFunction(
      (id: number, name: string, position?: Position) => {
        this.addNode(id, name, position);
      }
    );
    this.liveModel.Variables.setRemoveNodeFromVisualizationFunction(
      (id: number) => {
        this.removeNode(id);
      }
    );
    this.liveModel.Variables.setRenameNodeFromVisualizationFunction(
      (id: number, newName: string) => {
        this.renameNode(id, newName);
      }
    );
    this.liveModel.Variables.setGetNodePositionFromVisualizationFunction(
      (id: number) => {
        return this.getNodePosition(id);
      }
    );
  }

  private initOptions(): CytoscapeOptions {
    const nodeColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-model-node')
      .trim();
    const borderColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-model-node-border')
      .trim();
    const hoverBorderColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-model-node-border-hover')
      .trim();
    const selectedBorderColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-model-node-border-selected')
      .trim();
    const fitBorderColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-model-node-border-fit')
      .trim();
    const textColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-model-node-text')
      .trim();

    const regulationActivationColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-regulation-activation')
      .trim();
    const regulationInhibitionColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-regulation-inhibition')
      .trim();
    const regulationUnspecifiedColor = getComputedStyle(
      document.documentElement
    )
      .getPropertyValue('--color-regulation-unspecified')
      .trim();
    const edgePreviewColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-model-edge-preview')
      .trim();

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
      wheelSensitivity: 1,
      maxZoom: 18,
      minZoom: 0.5,
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
            'text-max-width': '150px',
            'text-wrap': 'ellipsis',
            width: 'label',
            height: 'label',
            // a rectangle with slightly sloped edges
            shape: 'roundrectangle',
            // when selecting, do not display any overlay
            'overlay-opacity': 0,
            // other visual styles
            padding: '12',
            'background-color': nodeColor,
            color: textColor,
            'font-family': 'FiraMono',
            'font-size': '12pt',
            'border-width': '1px',
            'border-color': borderColor,
            'border-style': 'solid',
          },
        },
        {
          // When a node is highlighted by mouse, show it with a dashed blue border.
          selector: 'node.hover',
          style: {
            'border-width': '2.0px',
            'border-color': hoverBorderColor,
            'border-style': 'dashed',
          },
        },
        {
          // When a node is highlighted by "fit" action, show it with a dashed border in a different colour.
          selector: 'node.fit',
          style: {
            'border-width': '2.0px',
            'border-color': fitBorderColor,
            'border-style': 'dashed',
          },
        },
        {
          // When a node is selected, show it with a thick blue border.
          selector: 'node:selected',
          style: {
            'border-width': '2.0px',
            'border-color': selectedBorderColor,
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
            'line-color': regulationActivationColor,
            'target-arrow-color': regulationActivationColor,
            'target-arrow-shape': 'triangle',
          },
        },
        {
          // When the edge is an inhibition, show it as red with a `tee` arrow
          selector: 'edge[monotonicity="inhibition"]',
          style: {
            'line-color': regulationInhibitionColor,
            'target-arrow-color': regulationInhibitionColor,
            'target-arrow-shape': 'tee',
          },
        },
        {
          // When the edge has unspecified monotonicity, show it as grey with normal arrow
          selector: 'edge[monotonicity="unspecified"]',
          style: {
            'line-color': regulationUnspecifiedColor,
            'target-arrow-color': regulationUnspecifiedColor,
            'target-arrow-shape': 'triangle',
          },
        },
        {
          selector: 'edge[monotonicity="activation"]:selected',
          style: {
            'line-color': regulationActivationColor,
            'target-arrow-color': regulationActivationColor,
          },
        },
        {
          selector: 'edge[monotonicity="inhibition"]:selected',
          style: {
            'line-color': regulationInhibitionColor,
            'target-arrow-color': regulationInhibitionColor,
          },
        },
        {
          selector: 'edge[monotonicity="unspecified"]:selected',
          style: {
            'line-color': regulationUnspecifiedColor,
            'target-arrow-color': regulationUnspecifiedColor,
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
              const edgeHandleColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--color-model-edge-handle-box-color')
                .trim();
              const iconColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--color-model-edge-handle-icon-color')
                .trim();

              const icon = addBoxSvg(edgeHandleColor, iconColor);

              return 'data:image/svg+xml;utf8,' + encodeURIComponent(icon);
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
            'background-color': edgePreviewColor,
            'line-color': edgePreviewColor,
            'target-arrow-color': edgePreviewColor,
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
          !this.liveModel.Regulations.addRegulation(
            false,
            true,
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
      [id, this.controlStore.getState().getVariableControlEnabled(id) ?? true],
    ]);

    const variable: ModelEditorVariable = { type: 'variable', id: id };

    node.on('mouseover', (e: any) => {
      node.addClass('hover');
      this.modelEditorStatusStore.getState().setHoverItemInfo(variable);
    });
    node.on('mouseout', (e: any) => {
      node.removeClass('hover');
      this.modelEditorStatusStore.getState().setHoverItemInfo(null);
    });
    node.on('select', (e: any) => {
      this.renderMenuForSelectedNode(node, variable);
      this.modelEditorStatusStore.getState().addSelectedItemInfo(variable);
    });
    node.on('unselect', (e: any) => {
      this.modelEditorStatusStore.getState().removeSelectedItemInfo(variable);
      this.hideMenu();
    });
    node.on('click', (e: any) => {
      this.renderMenuForSelectedNode(node, variable);
      this.lastClickTimestamp = undefined; // ensure that we cannot double-click inside the node
    });
    node.on('drag', (e: any) => {
      if (node.selected()) this.renderMenuForSelectedNode(node, null);
    });
    node.on('dragfree', (_: any) => {
      const position = node.position();
      const newPosition: Position = [position.x, position.y];
      const oldPosition: Position =
        this.variablePositionsStore.getState().variablePositions[id] ??
        newPosition;

      this.modelUndoRedoStore.getState().addOperation({
        undo: () => {
          this.setNodePosition(id, oldPosition);
        },
        redo: () => {
          this.setNodePosition(id, newPosition);
        },
      });

      this.variablePositionsStore
        .getState()
        .setVariablePosition(id, newPosition);
    });

    this.cytoscape.resize();
    this.cytoscape.fit();
  }

  /** Remove the node with the given ID from the graph. */
  public removeNode(id: number) {
    let node = this.cytoscape.getElementById(id);
    if (node !== undefined) {
      if (node.selected()) node.unselect(); // ensure menu is hidden, etc.
      this.cytoscape.remove(node);
    } else {
      this.messageServ.showError(
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
    const node = this.cytoscape.getElementById(id);
    if (node !== undefined) {
      node.select();
    }
  }

  /** Sets the given node as not selected */
  public unselectNode(id: number) {
    const node = this.cytoscape.getElementById(id);
    if (node !== undefined) {
      node.unselect();
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
  public getNodePosition(id: number): Position | undefined {
    let node = this.cytoscape.getElementById(id);
    if (node !== undefined) {
      let position = node.position();
      return [position.x, position.y];
    }
    return undefined;
  }

  /** Function for setting the position of a node with the given id. */
  private setNodePosition(id: number, position: Position): void {
    const currentNode = this.cytoscape.getElementById(id);
    if (currentNode !== undefined && currentNode.length > 0) {
      currentNode.position({ x: position[0], y: position[1] });
      this.variablePositionsStore.getState().setVariablePosition(id, position);
    }
  }

  /** Extracts position of all nodes and saves it into Record<number, Position> (number - node ID, Position - node position [x, y]). */
  private savePositionOfAllNodes(
    saveFunction: (variablePositions: Record<number, Position>) => void
  ) {
    const variablePositions: Record<number, Position> = {};
    this.cytoscape.nodes().forEach((node: any) => {
      const position = node.position();
      variablePositions[Number(node.id())] = [position.x, position.y];
    });
    saveFunction(variablePositions);
  }

  /** Sets position of all nodes from the provided record. */
  private setPositionOfAllNodes(setFrom: Record<number, Position>) {
    this.cytoscape.nodes().forEach((node: any) => {
      const position = setFrom[node.id()];
      if (position !== undefined) {
        node.position({ x: position[0], y: position[1] });
      }
    });
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

    const regulationInfo: ModelEditorRegulation = {
      type: 'regulation',
      regulationIds: edgeVars,
    };

    edge.on('select', (e: any) => {
      this.renderMenuForSelectedEdge(edge, regulationInfo);
      this.modelEditorStatusStore
        .getState()
        .addSelectedItemInfo(regulationInfo);
    });
    edge.on('unselect', (e: any) => {
      this.modelEditorStatusStore
        .getState()
        .removeSelectedItemInfo(regulationInfo);
      this.hideMenu();
    });
    edge.on('click', (e: any) => {
      this.renderMenuForSelectedEdge(edge, regulationInfo);
    });
    edge.on('mouseover', (e: any) => {
      edge.addClass('hover');
      this.modelEditorStatusStore.getState().setHoverItemInfo(regulationInfo);
    });
    edge.on('mouseout', (e: any) => {
      edge.removeClass('hover');
      this.modelEditorStatusStore.getState().setHoverItemInfo(null);
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

  // #region --- Global Select ---

  /** Unselects all items selected in the cytoscape editor. */
  public unselectAll(): void {
    this.cytoscape.elements(':selected').unselect();
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
  public ensureRegulation(regulation: Regulation) {
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
        this.renderMenuForSelectedEdge(currentEdge, {
          type: 'regulation',
          regulationIds: {
            regulator: regulation.regulator,
            target: regulation.target,
          },
        });
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

  /** Pan and zoom the graph to show the whole model.
   *  @param variables (Variable[]) If provided, fit only the given nodes instead of the whole graph.
   */
  public fit(variables?: Variable[]): void {
    if (variables !== undefined && variables.length > 0) {
      const variableSet = new Set(variables.map((variable) => variable.id));
      const nodes = this.cytoscape
        .nodes()
        .filter((node: any) => variableSet.has(Number(node.data().id)));
      this.fitHighlightSubset(nodes);
      this.cytoscape.fit(nodes, 100);
    } else {
      this.cytoscape.fit();
    }

    //this.cytoscape.zoom(this.cytoscape.zoom() * 0.8); // zoom out a bit to have some padding
  }

  /** Highlights a subset of nodes by applying a node fit CSS style class.
   *  Highlight is removed after a short delay -> this is used in the fit function to visually indicate which nodes were fitted.
   */
  private fitHighlightSubset(nodes: any) {
    nodes.addClass('fit');

    setTimeout(() => {
      nodes.removeClass('fit');
    }, 2000);
  }

  public setZoom(zoomLevel: number): void {
    const zoom = Math.min(
      this.cytoscape.maxZoom(),
      Math.max(this.cytoscape.minZoom(), zoomLevel)
    );

    this.cytoscape.zoom({
      level: zoom,
      renderedPosition: {
        x: this.cytoscape.width() / 2,
        y: this.cytoscape.height() / 2,
      },
    });
  }
  // #endregion

  // #region --- Menu Rendering ---

  /** Update the node menu to be shown exactly for this element.
   *  If the node is not provided, do nothing.
   *  If the variable info is not provided, try to find it based on currently shown menu - if it does not match the node, do nothing as well.
   *  Otherwise, show the menu for the node and variable info provided.
   */
  private renderMenuForSelectedNode(
    node: any,
    variableInfo: ModelEditorVariable | null
  ) {
    if (node === undefined || node === null) {
      return;
    }

    if (variableInfo === null) {
      const floatingMenuInfo =
        this.modelEditorStatusStore.getState().floatingMenuInfo;
      console.log(node.data());
      console.log(floatingMenuInfo);
      if (
        floatingMenuInfo?.itemInfo.type !== 'variable' ||
        floatingMenuInfo.itemInfo.id != node.data().id
      ) {
        console.log(
          'Cannot render menu for the node - no variable info provided'
        );
        return;
      }

      variableInfo = floatingMenuInfo.itemInfo;
    }

    let zoom = this.cytoscape.zoom();
    let position = node.renderedPosition();
    //let height = node.height() * zoom;
    this.modelEditorStatusStore.getState().setFloatingMenuInfo({
      position: [position['x'], position['y']],
      zoom,
      itemInfo: variableInfo,
    });
  }

  /** Update the edge menu to be shown exactly for the currently selected edge.
   *  If the edge is not provide, do nothing.
   *  If the regulation info is not provided, try to find it based on currently shown menu - if it does not match the edge, do nothing as well.
   *  Otherwise, show the menu for the edge and regulation info provided.
   */
  private renderMenuForSelectedEdge(
    edge: any,
    regulationInfo: ModelEditorRegulation | null
  ) {
    if (edge === undefined || edge === null) {
      return;
    }

    if (regulationInfo === null) {
      const floatingMenuInfo =
        this.modelEditorStatusStore.getState().floatingMenuInfo;

      if (
        floatingMenuInfo?.itemInfo.type !== 'regulation' ||
        floatingMenuInfo.itemInfo.regulationIds.regulator !=
          edge.data().source ||
        floatingMenuInfo.itemInfo.regulationIds.target != edge.data().target
      ) {
        return;
      }

      regulationInfo = floatingMenuInfo.itemInfo;
    }

    const zoom = this.cytoscape.zoom();
    const boundingBox = edge.renderedBoundingBox();
    const position: [number, number] = [
      (boundingBox.x1 + boundingBox.x2) / 2,
      (boundingBox.y1 + boundingBox.y2) / 2,
    ];
    this.modelEditorStatusStore.getState().setFloatingMenuInfo({
      position: position,
      zoom,
      itemInfo: regulationInfo,
    });
  }

  /** Hide any floating menu. */
  private hideMenu() {
    this.modelEditorStatusStore.getState().setFloatingMenuInfo(null);
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

        stop: () => {
          this.layoutCallback();
        },
      })
      .start();
  }

  /** Layout the nodes in a hierarchical manner, using the `dagre` algorithm.
   *  @param layoutOnlySelected (boolean) = optional parameter which if is set to true runs the layout algorithm only over the subset of the model, else runs it over the whole model.
   *                                        If not specified set to false (layout the whole model).
   */
  layoutDagre(layoutOnlySelected: boolean = false) {
    const layoutOptions: any = {
      name: 'dagre',
      acyclicer: 'greedy',
      ranker: 'network-simplex',
      padding: 50,
      animate: true,
      animationDuration: 300,
      fit: true,
      nodeDimensionsIncludeLabels: true,

      stop: () => {
        this.layoutCallback();
      },
    };

    if (!layoutOnlySelected) {
      this.cytoscape.layout(layoutOptions).start();
      return;
    }

    this.runOnSelectedNodes((modelSubset: Collection) =>
      modelSubset.layout(layoutOptions).start()
    );
  }

  /** Applies concentric layout to sort data by phenotype or by control-enabled values.
   * If phenotype parameter is true, then sorts by phenotype, else by control-enabled. */
  private applyConcentricLayout(
    phenotype: boolean,
    layoutOnlySelected: boolean
  ) {
    const variables: Record<string, number> = {};

    const layoutOptions = {
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

      stop: () => {
        this.layoutCallback();
      },
    };

    if (phenotype == true) {
      this.controlStore
        .getState()
        .getAllCurrentPhenotypeIds()
        .forEach(([id, phenotype]) => {
          variables[id] =
            phenotype == PHENOTYPE_STATUS.NotInPhenotype
              ? 0
              : PHENOTYPE_STATUS.InPhenotypeTrue
                ? 1
                : 2;
        });
    } else {
      this.controlStore
        .getState()
        .getAllControlEnabledIds()
        .forEach(([id, controlEnabled]) => {
          variables[id] = controlEnabled ? 0 : 1;
        });
    }

    if (!layoutOnlySelected) {
      this.cytoscape.nodes().layout(layoutOptions).run();
      return;
    }

    this.runOnSelectedNodes((modelSubset: Collection) =>
      modelSubset.layout(layoutOptions).start()
    );
  }

  /** Layout the nodes in a phenotype-aware manner. */
  public layoutPhenotype(layoutOnlySelected: boolean = false) {
    this.applyConcentricLayout(true, layoutOnlySelected);
  }

  /** Layout the nodes in a control-enabled manner. */
  public layoutControlEnabled(layoutOnlySelected: boolean = false) {
    this.applyConcentricLayout(false, layoutOnlySelected);
  }

  /** Callback function for layout changes.
   *  Saves positions of all nodes after layout change and adds the operation to undo-redo stack.
   */
  private layoutCallback() {
    const oldPositions: Record<number, Position> = {
      ...this.variablePositionsStore.getState().variablePositions,
    };

    this.savePositionOfAllNodes(
      (variablePositions: Record<number, Position>) => {
        this.variablePositionsStore
          .getState()
          .setPositionOfAllVariables(variablePositions);
      }
    );

    const newPositions: Record<number, Position> = {
      ...this.variablePositionsStore.getState().variablePositions,
    };

    this.modelUndoRedoStore.getState().addOperation({
      undo: () => {
        this.setPositionOfAllNodes(oldPositions);
      },
      redo: () => {
        this.setPositionOfAllNodes(newPositions);
      },
    });
  }

  // #endregion

  // #region --- Node Highlighting ---

  /** Changes colour of all nodes which are set as control-enabled. */
  public highlightControlEnabled(
    inputNodes: Array<[number, boolean]> | null = null
  ) {
    var nodes: Array<[number, boolean]> | undefined = undefined;

    if (inputNodes == null) {
      nodes = this.controlStore.getState().getAllControlEnabledIds();
      this.controlEnabledShown = !this.controlEnabledShown;
    } else {
      nodes = inputNodes;
    }

    const color = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-control-enabled')
      .trim();

    nodes.forEach(([id, controlEnabled]) => {
      const node = this.cytoscape.getElementById(id);
      if (this.controlEnabledShown && controlEnabled) {
        node.style('background-color', color);
      } else {
        node.removeStyle('background-color');
      }
    });
  }

  /** Returns true if the control-enabled highlighting is currently active. */
  public isControlEnabledHighlighted(): boolean {
    return this.controlEnabledShown ?? false;
  }

  /** Changes borders of all nodes which are in the phenotype. */
  public highlightPhenotype(
    inputNodes: Array<[number, PhenotypeStatus]> | null = null
  ) {
    var nodes: Array<[number, PhenotypeStatus]> | undefined = undefined;

    if (inputNodes == null) {
      nodes = this.controlStore.getState().getAllCurrentPhenotypeIds();
      this.phenotypeShown = !this.phenotypeShown;
    } else {
      nodes = inputNodes;
    }

    const trueColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-in-phenotype-true')
      .trim();
    const falseColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-in-phenotype-false')
      .trim();
    const notInText = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-model-node-text')
      .trim();
    const notInBorder = getComputedStyle(document.documentElement)
      .getPropertyValue('---color-model-node-border')
      .trim();

    nodes.forEach(([id, variablePhenotype]) => {
      if (
        this.phenotypeShown &&
        variablePhenotype == PHENOTYPE_STATUS.InPhenotypeTrue
      ) {
        this.cytoscape.getElementById(id).style('border-color', trueColor);
        this.cytoscape.getElementById(id).style('color', trueColor);
        this.cytoscape.getElementById(id).style('border-width', '2px');
      } else if (
        this.phenotypeShown &&
        variablePhenotype == PHENOTYPE_STATUS.InPhenotypeFalse
      ) {
        this.cytoscape.getElementById(id).style('border-color', falseColor);
        this.cytoscape.getElementById(id).style('color', falseColor);
        this.cytoscape.getElementById(id).style('border-width', '2px');
      } else {
        this.cytoscape.getElementById(id).style('border-color', notInBorder);
        this.cytoscape.getElementById(id).style('color', notInText);
        this.cytoscape.getElementById(id).style('border-width', '1px');
      }
    });
  }

  /** Returns true if the phenotype highlighting is currently active. */
  public isPhenotypeHighlighted(): boolean {
    return this.phenotypeShown ?? false;
  }

  // #endregion

  // #region --- Utilities ---

  /**
   * Gets selected nodes and edges connected to them and runs function over them.
   * @param fun ((modelSubset: Collection) => void) -> function which runs over the selected nodes and connected edges collection
   * @param minNumberOfSelected (number) -> optional parameter which defines minimal number of selected nodes for which the function should be run.
   *                                        If is less than specified amount, execution of fun function is skipped. If not specified is defaultly set to 1.
   */
  private runOnSelectedNodes(
    fun: (modelSubset: Collection) => void,
    minNumberOfSelected: number = 1
  ) {
    const selectedNodes: NodeCollection = this.cytoscape.nodes(':selected');

    if (selectedNodes.length < minNumberOfSelected) {
      return;
    }

    const connectedEdges = selectedNodes.connectedEdges();

    const neighborhood = selectedNodes.union(connectedEdges);

    fun(neighborhood);
  }

  // #endregion
}

export default CytoscapeME;
