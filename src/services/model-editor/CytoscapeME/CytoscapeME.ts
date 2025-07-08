// import cytoscape, { type CytoscapeOptions } from "cytoscape";
// import edgehandles from "cytoscape-edgehandles";
import { type CytoscapeOptions } from "cytoscape";
import { EdgeMonotonicity } from "../../../types";
import { LiveModel } from "../../global/LiveModel/LiveModel";

//import { //ModelEditor, //UI } from "./Todo-imports";

const DOUBLE_CLICK_DELAY = 400;

declare const cytoscape: any;

// Modified version of the add_box-24px.svg with color explicitly set to blue and an additional background element which makes sure the plus sign is filled.
const _add_box_svg =
  '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M4 4h16v16H4z"/><path fill="#6a7ea5" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

/*
    Responsible for managing the cytoscape editor object. It has its own representation of the graph,
    but it should never be updated directly. Instead, always use LiveModel to specify updates.
*/
class CytoscapeMEClass {
  // Reference to the cytoscape library "god object"
  private _cytoscape: any = undefined;
  // Reference to the edgehandles library "god object"
  private _edgehandles: any = undefined;
  // Used to implement the double click feature
  private _lastClickTimestamp: number | undefined = undefined;

  // True if show controllable button is in effect.
  private _controllableShown: boolean | undefined = undefined;
  // True if show phenotype button is in effect.
  private _phenotypeShown: boolean | undefined = undefined;

  private _container: HTMLElement | null = null;

  init(container: HTMLElement) {
    if (this._cytoscape) {
      return;
    }

    this._container = container;

    this._cytoscape = cytoscape(this._initOptions());
    this._edgehandles = this._cytoscape.edgehandles(this._edgeOptions());

    console.log("Edgehandles loaded:", this._edgehandles);

    // When the user moves or zooms the graph, position of menu must update as well.
    this._cytoscape.on("zoom", (e: any) => {
      this._renderMenuForSelectedNode();
      this._renderMenuForSelectedEdge();
    });
    this._cytoscape.on("pan", (e: any) => {
      this._renderMenuForSelectedNode();
      this._renderMenuForSelectedEdge();
    });
    this._cytoscape.on("click", (e: any) => {
      let now = new Date().getTime();
      if (
        this._lastClickTimestamp &&
        now - this._lastClickTimestamp < DOUBLE_CLICK_DELAY
      ) {
        LiveModel.Variables.addVariable(false, [
          e.position["x"],
          e.position["y"],
        ]);
      }
      this._lastClickTimestamp = now;
    });

    this._controllableShown = false;
    this._phenotypeShown = false;
  }

  layoutCose() {
    this._cytoscape
      .layout({
        name: "cose",
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

  layoutDagre() {
    this._cytoscape
      .layout({
        name: "dagre",
        acyclicer: "greedy",
        ranker: "network-simplex",
        padding: 50,
        animate: true,
        animationDuration: 300,
        fit: true,
        nodeDimensionsIncludeLabels: true,
      })
      .start();
  }

  // Applies concentric layout to sort data by phenotype or by controllable values.
  // If phenotype parameter is true, then sorts by phenotype, else by controllable.
  private _applyConcentricLayout(phenotype: boolean) {
    const nodes: any[] = [];
    const variables: Record<string, number> = {};

    LiveModel.Variables.getAllVariables().forEach((variable: any) => {
      nodes.push(this._cytoscape.getElementById(variable.id));

      if (phenotype == true) {
        variables[variable.id] =
          variable.phenotype == null ? 0 : variable.phenotype ? 1 : 2;
      } else {
        variables[variable.id] = variable.controllable ? 0 : 1;
      }
    });

    const nodesCol = this._cytoscape.collection(nodes);

    nodesCol
      .layout({
        name: "concentric",
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

  public layoutPhenotype() {
    this._applyConcentricLayout(true);
  }

  public layoutControllable() {
    this._applyConcentricLayout(false);
  }

  // Return an id of the selected node, or undefined if nothing is selected.
  public getSelectedNodeId(): string | undefined {
    let node = this._cytoscape.nodes(":selected");
    if (node.length == 0) return undefined; // nothing selected
    return node.id();
  }

  // Add a new node to the graph at the given position.
  // (Int, String, [Num, Num])
  public addNode(
    id: number,
    name: string,
    position: [number, number] = [0, 0]
  ) {
    let node = this._cytoscape.add({
      data: { id: id, name: name },
      position: { x: position[0], y: position[1] },
    });

    this.highlightControllable([LiveModel.Variables.variableFromId(id)]);

    node.on("mouseover", (e: any) => {
      node.addClass("hover");
      ////ModelEditor.hoverVariable(id, true);
    });
    node.on("mouseout", (e: any) => {
      node.removeClass("hover");
      ////ModelEditor.hoverVariable(id, false);
    });
    node.on("select", (e: any) => {
      // deselect any previous selection - we don't support multiselection yet
      for (let selected of this._cytoscape.$(":selected")) {
        if (selected.data().id != id) {
          selected.unselect();
        }
      }
      this._renderMenuForSelectedNode(node);
      ////ModelEditor.selectVariable(id, true);
    });
    node.on("unselect", (e: any) => {
      ////UI.Visible.toggleNodeMenu();
      ////ModelEditor.selectVariable(id, false);
    });
    node.on("click", (e: any) => {
      this._lastClickTimestamp = undefined; // ensure that we cannot double-click inside the node
    });
    node.on("drag", (e: any) => {
      if (node.selected()) this._renderMenuForSelectedNode(node);
      this._renderMenuForSelectedEdge();
    });
  }

  // Set the given node as selected.
  public selectNode(id: number) {
    let selected = this._cytoscape.$(":selected"); // node or edge that are selected
    if (selected.length == 1) {
      selected.unselect();
    }
    let node = this._cytoscape.getElementById(id);
    if (node !== undefined) {
      node.select();
    }
  }

  // Remove the node with the given ID from the graph.
  public removeNode(id: number) {
    let node = this._cytoscape.getElementById(id);
    if (node !== undefined) {
      if (node.selected()) node.unselect(); // ensure menu is hidden, etc.
      this._cytoscape.remove(node);
    } else {
      //Todo-error
      console.log("[CytoscapeME] Cannot remove " + id + " - node not found.");
    }
  }

  // Change name of the node to the given value.
  public renameNode(id: number, newName: string) {
    let node = this._cytoscape.getElementById(id);
    if (node !== undefined) {
      let data = node.data();
      data["name"] = newName;
      this._cytoscape.style().update(); //redraw graph
    }
  }

  // Allow to externally set which node is hovered - make sure to unset it as well.
  public hoverNode(id: number, isHover: boolean) {
    let node = this._cytoscape.getElementById(id);
    if (isHover) {
      node.addClass("hover");
    } else {
      node.removeClass("hover");
    }
  }

  // Allow to externally set which edge is hovered - just make sure to unset it later.
  public hoverEdge(regulatorId: number, targetId: number, isHover: boolean) {
    let edge = this._findRegulationEdge(regulatorId, targetId);
    if (edge !== undefined) {
      if (isHover) {
        edge.addClass("hover");
      } else {
        edge.removeClass("hover");
      }
    }
  }

  // Zoom and pan the editor to ensure that given node is visible.
  public showNode(id: number) {
    let node = this._cytoscape.getElementById(id);
    if (node !== undefined) {
      // Taken from https://github.com/cytoscape/cytoscape.js/issues/1691
      let zoom = 1.1;
      let bb = node.boundingBox();
      let w = this._cytoscape.width();
      let h = this._cytoscape.height();
      var pan = {
        // add some random padding so it does not end up under the editor panel
        x: (w - zoom * (bb.x1 + bb.x2)) / 2 + 250,
        y: (h - zoom * (bb.y1 + bb.y2)) / 2,
      };

      this._cytoscape.animate({
        zoom: 1.1,
        pan: pan,
      });
    }
  }

  // Return a { regulator, target } object that describes currently selected regulation,
  // or undefined if nothing is selected.
  public getSelectedRegulationPair():
    | { regulator: string; target: string }
    | undefined {
    let edge = this._cytoscape.edges(":selected");
    if (edge.length == 0) return undefined; // nothing selected
    return { regulator: edge.data().source, target: edge.data().target };
  }

  // Ensure that the graph contains edge which corresponds to the provided regulation.
  public ensureRegulation(regulation: any) {
    let currentEdge = this._findRegulationEdge(
      regulation.regulator,
      regulation.target
    );
    if (currentEdge !== undefined) {
      // Edge exists - just make sure to update data
      let data = currentEdge.data();
      data.observable = regulation.observable;
      data.monotonicity = regulation.monotonicity;
      this._cytoscape.style().update(); //redraw graph
      if (currentEdge.selected()) {
        // if the edge is selected, we also redraw the edge menu
        this._renderMenuForSelectedEdge(currentEdge);
      }
    } else {
      // Edge does not exist - create a new one
      let edge = this._cytoscape.add({
        group: "edges",
        data: {
          source: regulation.regulator,
          target: regulation.target,
          observable: regulation.observable,
          monotonicity: regulation.monotonicity,
        },
      });
      this._initEdge(edge);
    }
  }

  // Remove regulation between the two specified nodes.
  public removeRegulation(regulatorId: number, targetId: number) {
    let edge = this._findRegulationEdge(regulatorId, targetId);
    if (edge !== undefined) {
      if (edge.selected()) edge.unselect();
      this._cytoscape.remove(edge);
    }
  }

  // Pan and zoom the groph to show the whole model.
  public fit() {
    this._cytoscape.fit();
    this._cytoscape.zoom(this._cytoscape.zoom() * 0.8); // zomm out a bit to have some padding
  }

  // Get the position of the node with the given id, or undefined if the node does not exist.
  public getNodePosition(id: number): [number, number] | undefined {
    let node = this._cytoscape.getElementById(id);
    if (node !== undefined) {
      let position = node.position();
      return [position.x, position.y];
    }
    return undefined;
  }

  // Return the edge which represents regulation between the given pair of variables or undefined
  // if such edge does not exist.
  private _findRegulationEdge(regulatorId: number, targetId: number): any {
    let edge = this._cytoscape.edges(
      '[source = "' + regulatorId + '"][target = "' + targetId + '"]'
    );
    if (edge.length == 1) {
      return edge[0];
    } else {
      return undefined;
    }
  }

  // Update the node menu to be shown exactly for this element
  // (including zoom and other node proeprties)
  // If the node is undefined, try to find it
  // (element?)
  private _renderMenuForSelectedNode(node?: any) {
    if (node === undefined) {
      node = this._cytoscape.nodes(":selected");
      if (node.length == 0) return; // nothing selected
    }
    let zoom = this._cytoscape.zoom();
    let position = node.renderedPosition();
    let height = node.height() * zoom;
    //UI.Visible.toggleNodeMenu([position["x"], position["y"]], zoom);
  }

  // Update the edge menu to be shown exactly for the currently selected edge.
  // If edge is undefined, try to obtain the selected edge.
  private _renderMenuForSelectedEdge(edge?: any) {
    if (edge === undefined) {
      edge = this._cytoscape.edges(":selected");
      if (edge.length == 0) return; // nothing selected
    }
    let zoom = this._cytoscape.zoom();
    let boundingBox = edge.renderedBoundingBox();
    let position = [
      (boundingBox.x1 + boundingBox.x2) / 2,
      (boundingBox.y1 + boundingBox.y2) / 2,
    ];
    //UI.Visible.toggleEdgeMenu(edge.data(), position, zoom);
  }

  // Implements functionality of buttons responsible for highlighting of nodes in the graph.
  public highlightButton(button: any, highlightPhenotype: boolean) {
    if (highlightPhenotype) {
      button.style.backgroundColor = this._phenotypeShown
        ? "#ECEFF1"
        : "#B0BEC5";
      this.highlightPhenotype();
    } else {
      button.style.backgroundColor = this._controllableShown
        ? "#ECEFF1"
        : "#B0BEC5";
      this.highlightControllable();
    }
  }

  // Changes borders of all nodes which are in the phenotype.
  public highlightPhenotype(inputNodes: any[] | null = null) {
    var nodes: any[] | undefined = undefined;

    if (inputNodes == null) {
      nodes = LiveModel.Variables.getAllVariables();
      this._phenotypeShown = !this._phenotypeShown;
    } else {
      nodes = inputNodes;
    }

    nodes.forEach((node: any) => {
      if (this._phenotypeShown && node.phenotype == true) {
        this._cytoscape.getElementById(node.id).style("border-color", "green");
        this._cytoscape.getElementById(node.id).style("color", "green");
        this._cytoscape.getElementById(node.id).style("border-width", "2px");
      } else if (this._phenotypeShown && node.phenotype == false) {
        this._cytoscape.getElementById(node.id).style("border-color", "red");
        this._cytoscape.getElementById(node.id).style("color", "red");
        this._cytoscape.getElementById(node.id).style("border-width", "2px");
      } else {
        this._cytoscape.getElementById(node.id).style("border-color", "");
        this._cytoscape.getElementById(node.id).style("color", "black");
        this._cytoscape.getElementById(node.id).style("border-width", "1px");
      }
    });
  }

  // Changes colour of all nodes which are set as controllable.
  public highlightControllable(inputNodes: any[] | null = null) {
    var nodes: any[] | undefined = undefined;

    if (inputNodes == null) {
      nodes = LiveModel.Variables.getAllVariables();
      this._controllableShown = !this._controllableShown;
    } else {
      nodes = inputNodes;
    }

    nodes.forEach((node: any) => {
      if (this._controllableShown && node.controllable) {
        this._cytoscape
          .getElementById(node.id)
          .style("background-color", "#FFFF66");
      } else {
        this._cytoscape.getElementById(node.id).style("background-color", "");
      }
    });
  }

  // Helper function to initialize new edge object, since edges can appear explicitly
  // or from the edgehandles plugin.
  private _initEdge(edge: any) {
    edge.on("select", (e: any) => {
      this._renderMenuForSelectedEdge(edge);
    });
    edge.on("unselect", (e: any) => {
      //UI.Visible.toggleEdgeMenu(); // hide menu
    });
    edge.on("mouseover", (e: any) => {
      edge.addClass("hover");
      //ModelEditor.hoverRegulation(edge.data().source, edge.data().target, true);
    });
    edge.on("mouseout", (e: any) => {
      edge.removeClass("hover");
      /*ModelEditor.hoverRegulation(
        edge.data().source,
        edge.data().target,
        false
      );*/
    });
  }

  private _initOptions(): CytoscapeOptions {
    return {
      container: this._container, //UI.cytoscapeEditor,
      // Some sensible default auto-layout algorithm
      layout: {
        animate: true,
        animationDuration: 300,
        animationThreshold: 250,
        refresh: 20,
        fit: true,
        name: "cose",
        padding: 250,
        nodeRepulsion: function (node: any) {
          return 100000;
        },
        nodeDimensionsIncludeLabels: true,
      },
      boxSelectionEnabled: false,
      selectionType: "single",
      style: [
        {
          // Style of the graph nodes
          selector: "node[name]",
          style: {
            //
            label: "data(name)",
            // put label in the middle of the node (vertically)
            "text-valign": "center",
            width: "label",
            height: "label",
            // a rectangle with slightly sloped edges
            shape: "roundrectangle",
            // when selecting, do not display any overlay
            "overlay-opacity": 0,
            // other visual styles
            padding: "12",
            "background-color": "#dddddd",
            "font-family": "FiraMono",
            "font-size": "12pt",
            "border-width": "1px",
            "border-color": "#bbbbbb",
            "border-style": "solid",
          },
        },
        {
          // When a node is highlighted by mouse, show it with a dashed blue border.
          selector: "node.hover",
          style: {
            "border-width": "2.0px",
            "border-color": "#6a7ea5",
            "border-style": "dashed",
          },
        },
        {
          // When a node is selected, show it with a thick blue border.
          selector: "node:selected",
          style: {
            "border-width": "2.0px",
            "border-color": "#6a7ea5",
            "border-style": "solid",
          },
        },
        {
          // General style of the graph edge
          selector: "edge",
          style: {
            width: 3.0,
            "curve-style": "bezier",
            "loop-direction": "-15deg",
            "loop-sweep": "30deg",
            "text-outline-width": 2.3,
            "text-outline-color": "#cacaca",
            "font-family": "FiraMono",
          },
        },
        {
          selector: "edge.hover",
          style: { "overlay-opacity": 0.1 },
        },
        {
          // Show non-observable edges as dashed
          selector: "edge[observable]",
          style: {
            "line-style": (edge: any) => {
              if (edge.data().observable) {
                return "solid";
              } else {
                return "dashed";
              }
            },
            "line-dash-pattern": [8, 3],
          },
        },
        {
          // When the edge is an activation, show it as green with normal arrow
          selector: 'edge[monotonicity="activation"]',
          style: {
            "line-color": "#4abd73",
            "target-arrow-color": "#4abd73",
            "target-arrow-shape": "triangle",
          },
        },
        {
          // When the edge is an inhibition, show it as red with a `tee` arrow
          selector: 'edge[monotonicity="inhibition"]',
          style: {
            "line-color": "#d05d5d",
            "target-arrow-color": "#d05d5d",
            "target-arrow-shape": "tee",
          },
        },
        {
          // When the edge has unspecified monotonicity, show it as grey with normal arrow
          selector: 'edge[monotonicity="unspecified"]',
          style: {
            "line-color": "#797979",
            "target-arrow-color": "#797979",
            "target-arrow-shape": "triangle",
          },
        },
        {
          // A selected edge should be drawn with an overlay
          selector: "edge:selected",
          style: {
            "overlay-opacity": 0.1,
          },
        },
        {
          // Edge handles pseudo-node for adding
          selector: ".eh-handle",
          style: {
            width: "32px",
            height: "32px",
            shape: "rectangle",
            "background-opacity": 0,
            "background-image": function (e: any) {
              return (
                "data:image/svg+xml;utf8," + encodeURIComponent(_add_box_svg)
              );
            },
            "background-width": "32px",
            "background-height": "32px",
            padding: "0%",
            "overlay-opacity": 0,
            "border-width": 0,
            "border-opacity": 0,
          },
        },
        {
          // Change ghost edge preview colors
          selector: ".eh-preview, .eh-ghost-edge",
          style: {
            "background-color": "#797979",
            "line-color": "#797979",
            "target-arrow-color": "#797979",
            "target-arrow-shape": "triangle",
          },
        },
        {
          // Hide ghost edge when a snapped preview is visible
          selector: ".eh-ghost-edge.eh-preview-active",
          style: { opacity: 0 },
        },
      ],
    };
  }

  private _edgeOptions() {
    return {
      preview: true, // whether to show added edges preview before releasing selection
      hoverDelay: 150, // time spent hovering over a target node before it is considered selected
      handleNodes: "node", // selector/filter function for whether edges can be made from a given node
      snap: false,
      snapThreshold: 50,
      snapFrequency: 15,
      noEdgeEventsInDraw: false,
      disableBrowserGestures: true,
      nodeLoopOffset: -50,
      // The `+` button should be drawn on top of each node
      handlePosition: function (node: any) {
        return "middle top";
      },
      handleInDrawMode: false,
      edgeType: function (sourceNode: any, targetNode: any) {
        return "flat";
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
            sourceNode.id(),
            targetNode.id(),
            true,
            EdgeMonotonicity.unspecified
          )
        ) {
          addedEles.remove(); // if we can't create the regulation, remove new edge
        } else {
          this._initEdge(addedEles[0]);
        }
      },
    };
  }
}

const CytoscapeME: CytoscapeMEClass = new CytoscapeMEClass();

export default CytoscapeME;
