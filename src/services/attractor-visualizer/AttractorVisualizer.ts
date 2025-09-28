import { Message } from '../../components/lit-components/message-wrapper';
import useAttractorVisualizerStatus from '../../stores/AttractorVisualizer/useAttractorVisualizerStatus';
import useTabsStore from '../../stores/Navigation/useTabsStore';
import type {
  AttractorData,
  AttractorVisualizerInput,
  VisEdge,
  VisNode,
} from '../../types';
import ComputationManager from '../global/ComputationManager/ComputationManager';

declare const vis: any;

class AttractorVisualizerClass {
  // #region --- Properties ---

  /** Currently loaded attractor data. */
  private attractorData: AttractorData | undefined = undefined;
  /** Currently active vis network visualization. */
  private network: any = undefined;
  /** Container for the vis graph. */
  private container: HTMLElement | null = null;
  /** Options for the vis graph. */
  private options: any = {
    edges: {
      arrows: {
        to: { enabled: true, type: 'triangle' },
      },
      width: 0.7,
    },
    nodes: {
      color: {
        border: '#3a568c',
        background: '#ffffff',
        highlight: {
          background: '#e5eeff',
          border: '#3a568c',
        },
      },
      font: {
        face: 'Fira Mono',
      },
      shape: 'box',
      labelHighlightBold: false,
      borderWidth: 1,
    },
    layout: {
      improvedLayout: false,
    },
  };

  // #endregion

  // #region --- Initialization ---

  /** Initialize the visualizer with a container element. */
  public init(container: HTMLElement): void {
    if (this.container != container) {
      this.container = container;
      this.reloadVisualizer();
    }
  }

  // #endregion

  // #region --- Show Visualization ---

  /** Open the attractor visualizer with the given input data.
   * inputData depends on the part of the application from which the visualizer is opened.
   * inputData types:
   *  - { behavior: AttractorBehavior } - from the Attractor Analysis results
   *  - { nodeId: number } - from the overview in the Bifurcation Explorer
   *  - { nodeId: number, variableName: string, behavior: AttractorBehavior, vector: string[] } - from the Stability Analysis results in the Bifurcation Explorer
   */
  public openVisualizer(inputData: AttractorVisualizerInput): void {
    // todo - add if there is tab open with the same attractor

    if (inputData.nodeId === undefined || inputData.nodeId === null) {
      if (inputData.behavior) {
        ComputationManager.getAttractorByBehavior(inputData.behavior);
      }
    } else if (!inputData.variableName || !inputData.vector) {
      ComputationManager.getBifurcationExplorerAttractor(inputData.nodeId);
    } else if (inputData.variableName && inputData.vector) {
      ComputationManager.getStabilityAnalysisAttractor(
        inputData.nodeId,
        inputData.variableName,
        inputData.behavior ?? '',
        inputData.vector
      );
    }
  }

  public insertAttractorData(result: any, newTab: boolean): void {
    if (newTab) {
      result = this.processAttractorData(result);
      useTabsStore
        .getState()
        .addTab('/attractor-visualizer', 'Attractor Visualizer', () => {
          this.attractorData = result;
          this.reloadVisualizer();
          this.clear();
        });
    }

    this.attractorData = result;
    this.reloadVisualizer();
  }

  /** Inserts this.loadedResults into the visualizer.
   *  Creates new network visualizer with the currently loaded attractor. */
  private displayAll(): boolean {
    if (!this.attractorData) {
      Message.showError(
        'Unable to render Attractor Visualization: No loaded result available for display.'
      );
      return false;
    }

    if (this.attractorData['has_large_attractors']) {
      Message.showInfo(
        'Some attractors were too large to draw. These will be shown only as two states with the constant and non-constant variables differentiated.'
      );
    }

    let nodes: any[] = [];
    let edges: any[] = [];

    for (let i = 0; i < this.attractorData.attractors.length; i++) {
      nodes = nodes.concat(this.attractorData.attractors[i].vis.nodes);
      edges = edges.concat(this.attractorData.attractors[i].vis.edges);
    }

    if (!this.container) {
      Message.showError(
        'Unable to render Attractor Visualization: Missing container element - Internal Error'
      );
      return false;
    }

    this.network = new vis.Network(
      this.container!,
      { nodes, edges },
      this.options
    );

    return true;
  }

  public displayGraph(index: number): void {
    if (!this.container) {
      Message.showError('Cannot show Attractor Visualization: Internal Error');
      return;
    }

    if (!this.attractorData) {
      Message.showError(
        'Unable to render Attractor Visualization: No loaded result available for display.'
      );
      return;
    }

    if (this.attractorData?.has_large_attractors) {
      Message.showInfo(
        'Some attractors were too large to draw. These will be shown only as two states with the constant and non-constant variables differentiated.'
      );
    }

    this.network = new vis.Network(
      this.container!,
      this.attractorData.attractors[index].vis,
      this.options
    );
  }

  /** Reload the visualizer and display currently set attractor. */
  private reloadVisualizer(): void {
    if (this.container) {
      this.displayAll();

      if (this.network) {
        this.network.on('click', this.nodeClick.bind(this));
      }
    }
  }

  // #endregion

  // #region --- Node Click ---

  /** Function for handling node clicks.
   * Changes selected node state in the useAttractorVisualizerStatus store. */
  private nodeClick(e: any): void {
    if (e) {
      useAttractorVisualizerStatus
        .getState()
        .changeSelectedState(
          e.nodes.length !== 1 || e.nodes[0][0] === 'l'
            ? null
            : (e.nodes[0] as string)
        );
    }
  }

  // #endregion

  // #region --- Process Results ---

  /** Converts graph in the form of array of [from, to] pairs into format used by vis. */
  private edgesToVisFormat(array: Array<[string, string]>): {
    edges: Array<{ from: string; to: string }>;
    nodes: Array<{ id: string; label: string }>;
  } {
    const nodes = new Set<string>();
    const edges: Array<{ from: string; to: string }> = [];

    for (let i = 0; i < array.length; i++) {
      nodes.add(array[i][0]);
      nodes.add(array[i][1]);
      if (array[i][0] !== array[i][1]) {
        edges.push({ from: array[i][0], to: array[i][1] });
      }
    }

    return {
      edges,
      nodes: Array.from(nodes).map((x) => ({
        id: x,
        label: x.replace(/[⊥⊤]/gi, '-'),
      })),
    };
  }

  /** Creates a vis-network node that serves as the label for an attractor. */
  private createLabelNode(label: string, index: number): VisNode {
    return {
      label,
      id: 'labelnode' + index,
      font: { face: 'symbols', size: 40 },
      opacity: 0,
      labelHighlightBold: false,
    };
  }

  /** Creates a vis-network edge that connects the label node to the first attractor node. */
  private createLabelEdge(toNode: VisNode, index: number): VisEdge {
    return {
      id: 'labelnodeedge' + index,
      length: 20,
      from: 'labelnode' + index,
      to: toNode.id,
      color: { color: '#000000', opacity: 0.1 },
      arrows: { to: { enabled: false } },
    };
  }

  /** Process the raw attractor data from the ComputationManager into form used in the visualizer */
  private processAttractorData(results: any): AttractorData {
    for (let i = 0; i < results.attractors.length; i++) {
      results.attractors[i].vis = this.edgesToVisFormat(
        results.attractors[i].graph
      );

      results.attractors[i].vis.nodes.push(
        this.createLabelNode(results.attractors[i].class[0], i)
      );

      results.attractors[i].vis.edges.push(
        this.createLabelEdge(results.attractors[i].vis.nodes[0], i)
      );
    }

    results.witness = this.generateWitness(results);

    return results;
  }

  // #endregion

  // #region --- Get Data ---

  /** Returns the list of state variable names, or undefined if no attractor data is loaded. */
  public getStateVariables(): string[] | undefined {
    return this.attractorData?.variables;
  }

  public getWitness(): Array<[string, string]> | undefined {
    return this.attractorData?.witness;
  }

  // #endregion

  // #region --- Clear ---

  public clear(): void {
    useAttractorVisualizerStatus.getState().clear();
  }

  // #endregion

  /** Generates witness update functions list from the raw results returned by the computation manager. */
  private generateWitness(results: any): Array<[string, string]> {
    return results.model.model
      .split('\n')
      .filter((x: string) => x[0] === '$')
      .map((x: string) => x.slice(1))
      .map((x: string) => x.split(':'))
      .map((x: string[]) => [x[0].trim(), x[1].trim()])
      .reverse();
  }

  public witnessPanelVisible(show = true): void {
    const panel = document.getElementById('explorer-witness-panel');
    if (panel) panel.style.display = show ? 'block' : 'none';
  }

  public showState(string: string): void {
    for (let i = 0; i < string.length; i++) {
      console.log(
        this.attractorData?.variables[i],
        string[i] === '0' || string[i] === '⊥' ? 'false' : 'true'
      );
    }
  }
}

const AttractorVisualizer = new AttractorVisualizerClass();

export default AttractorVisualizer;
