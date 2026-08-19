import * as vis from 'vis-network';
import type { AttractorVisualizerStatusState } from '../../stores/AttractorVisualizer/AttractorVisualizerStatusState';
import type { TabsState } from '../../stores/Navigation/TabState';
import type { ZustandStore } from '../../stores/ZustandStoreType';
import { err, ok, type Result } from '../../types/result';
import type {
  AttractorData,
  AttractorVisualizerInput,
  VisEdge,
  VisNode,
} from '../../types/types';
import type { ComputationManagerInt } from '../global/ComputationManager/ComputationManagerInt';
import type { MessageInt } from '../global/Message/MessageInt';
import type { AttractorVisualizerInt } from './AttractorVisualizerInt';

class AttractorVisualizer implements AttractorVisualizerInt {
  // #region --- Properties + Constructor ---

  /** Currently loaded attractor data. */
  private attractorData: AttractorData | undefined = undefined;
  /** Currently active vis network visualization. */
  private network: any = undefined;
  /** Container for the vis graph. */
  private container: HTMLElement | null = null;
  /** Options for the vis graph. */
  private options: any = this.buildOptions();

  private computationManagerServ: ComputationManagerInt;
  private messageServ: MessageInt;

  private attractorVisualizerStatusStore: ZustandStore<AttractorVisualizerStatusState>;
  private tabsStore: ZustandStore<TabsState>;

  constructor(
    computationManagerServ: ComputationManagerInt,
    messageServ: MessageInt,
    attractorVisualizerStatusStore: ZustandStore<AttractorVisualizerStatusState>,
    tabsStore: ZustandStore<TabsState>
  ) {
    this.computationManagerServ = computationManagerServ;
    this.messageServ = messageServ;
    this.attractorVisualizerStatusStore = attractorVisualizerStatusStore;
    this.tabsStore = tabsStore;
  }

  // #endregion

  // #region --- Initialization ---

  /** Initialize the visualizer with a container element. */
  public init(container: HTMLElement): void {
    if (this.container != container) {
      this.container = container;
      this.reloadVisualizer();
    }
  }

  /** Builds options for the vis network visualization.*/
  private buildOptions(): any {
    const styles = getComputedStyle(document.documentElement);

    return {
      edges: {
        arrows: {
          to: { enabled: true, type: 'triangle' },
        },
        width: 0.7,
      },
      nodes: {
        color: {
          border: styles
            .getPropertyValue('--color-attractor-visualizer-node-border')
            .trim(),
          background: styles
            .getPropertyValue('--color-attractor-visualizer-node')
            .trim(),
          highlight: {
            background: styles
              .getPropertyValue('--color-attractor-visualizer-highlighted-node')
              .trim(),
            border: styles
              .getPropertyValue(
                '--color-attractor-visualizer-node-highlighted-border'
              )
              .trim(),
          },
        },
        font: {
          face: styles.getPropertyValue('--font-family-fira-mono').trim(),
          color: styles
            .getPropertyValue('--color-attractor-visualizer-node-text')
            .trim(),
        },
        shape: 'box',
        labelHighlightBold: false,
        borderWidth: 1,
      },
      layout: {
        improvedLayout: false,
      },
    };
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
        this.computationManagerServ.getAttractorByBehavior(
          inputData.behavior,
          this
        );
      }
    } else if (!inputData.variableName || !inputData.vector) {
      this.computationManagerServ.getBifurcationExplorerAttractor(
        inputData.nodeId,
        this
      );
    } else if (inputData.variableName && inputData.vector) {
      this.computationManagerServ.getStabilityAnalysisAttractor(
        inputData.nodeId,
        inputData.variableName,
        inputData.behavior ?? '',
        inputData.vector,
        this
      );
    }
  }

  public insertAttractorData(result: any, newTab: boolean): void {
    if (newTab) {
      result = this.processAttractorData(result);
      this.tabsStore
        .getState()
        .addTab('/attractor-visualizer', 'Attractor Visualizer', () => {
          this.attractorData = result;
          this.messageServ.showFromResult(
            this.reloadVisualizer(),
            'Failed to open attractor visualization tab'
          );
          this.clear();
        });
    }

    this.attractorData = result;
    this.reloadVisualizer();
  }

  /** Inserts this.loadedResults into the visualizer.
   *  Creates new network visualizer with the currently loaded attractor. */
  private displayAll(): Result<boolean> {
    if (!this.attractorData) {
      return err('No loaded result available for display.');
    }

    if (this.attractorData['has_large_attractors']) {
      this.messageServ.showInfo(
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
      return err('Internal Error - Missing container element');
    }

    this.network = new vis.Network(
      this.container!,
      { nodes, edges },
      this.options
    );

    return ok(true);
  }

  /** Reload the visualizer and display currently set attractor. */
  private reloadVisualizer(): Result<boolean> {
    if (this.container) {
      const result = this.displayAll();

      if (this.network) {
        this.network.on('click', this.nodeClick.bind(this));
      }

      return result;
    }

    return err('Internal Error - Missing container.');
  }

  // #endregion

  // #region --- Node Click ---

  /** Function for handling node clicks.
   * Changes selected node state in the this.attractorVisualizerStatusStore. */
  private nodeClick(e: any): void {
    if (e) {
      this.attractorVisualizerStatusStore
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

  /** Process the raw attractor data from the this.computationManagerServ into form used in the visualizer */
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
    this.attractorVisualizerStatusStore.getState().clear();
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

export default AttractorVisualizer;
