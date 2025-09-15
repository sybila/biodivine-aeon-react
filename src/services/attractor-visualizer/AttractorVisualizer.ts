import { Message } from '../../components/lit-components/message-wrapper';
import router from '../../router';
import useTabsStore from '../../stores/Navigation/useTabsStore';
import type { AttractorVisualizerInput } from '../../types';
import ComputationManager from '../global/ComputationManager/ComputationManager';

declare const vis: any;

class AttractorVisualizerClass {
  // #region --- Properties ---

  private _loadedResult: any = undefined;
  private _network: any = undefined;
  /** Container for the vis graph. */
  private container: HTMLElement | null = null;
  private _options: any = {
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
    console.log('Attractor Visualizer initialized');
    if (this.container != container) {
      this.container = container;
      this.reloadVisualizer();
    }
  }

  /** Reload the visualizer and display currently set attractor. */
  private reloadVisualizer(): void {
    if (this.container) {
      this._displayAll();
      this._network.on('click', this._nodeClick.bind(this));
    }
  }

  // #endregion

  // #region --- Show Visualization ---

  public openVisualizer(inputData: AttractorVisualizerInput): void {
    // todo - add if there is tab open with the same attractor

    if (!inputData.nodeId) {
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
        .addTab('attractor-visualizer', 'Attractor Visualizer', () => {
          this._loadedResult = result;
          this.reloadVisualizer();
        });
    }

    router.navigate({ to: '/attractor-visualizer' });

    this._loadedResult = result;
    this.reloadVisualizer();

    // todo - implement witness panel update
    // document.getElementById('explorer-update-functions')!.innerHTML =
    //   this._loadedResult.witness;
  }

  // #endregion

  private processAttractorData(results: any): void {
    for (let i = 0; i < results.attractors.length; i++) {
      results.attractors[i].vis = this._edgesToVisFormat(
        results.attractors[i].graph
      );
    }
    this._addLabels(results);
    results.witness = this._generateWitness(results);

    return results;
  }

  // #region --- Node Click ---

  private _stateToHtml(state: string): string {
    let result = '';
    for (let i = 0; i < state.length; i++) {
      const is_false = state[i] === '0' || state[i] === '⊥';
      const is_dynamic = state[i] === '0' || state[i] === '1';
      result +=
        '<span ' +
        'class="valuation-pair ' +
        (is_dynamic ? (is_false ? 'red' : 'green') : 'grey') +
        '" ' +
        'style="font-weight: ' +
        (is_dynamic ? 'bold' : 'normal') +
        '"' +
        '>' +
        (is_false ? '!' : '') +
        this._loadedResult.variables[i] +
        '</span>';
    }
    return result;
  }

  private _nodeClick(e: any): void {
    // todo - fix
    // const panel = document.getElementById('explorer-valuations');
    // const text = document.getElementById('explorer-valuations-text');
    // if (e.nodes.length !== 1 || e.nodes[0][0] === 'l') {
    //   if (panel) panel.style.display = 'none';
    //   return;
    // }
    // if (panel) panel.style.display = 'block';
    // if (text) text.innerHTML = this._stateToHtml(e.nodes[0]);
  }

  // #endregion

  private _generateWitness(results: any): string {
    return results.model.model
      .split('\n')
      .filter((x: string) => x[0] === '$')
      .map((x: string) => x.slice(1))
      .map((x: string) => x.split(':'))
      .map(
        (x: string[]) =>
          '<span class="explorer-fnName">' +
          x[0].trim() +
          '</span><span class="explorer-fnValue">' +
          x[1].trim() +
          '</span>'
      )
      .reverse()
      .reduce((a: string, x: string) => '<li>' + x + '</li>' + a, '');
  }

  public witnessPanelVisible(show = true): void {
    const panel = document.getElementById('explorer-witness-panel');
    if (panel) panel.style.display = show ? 'block' : 'none';
  }

  private _edgesToVisFormat(array: any[]): { edges: any[]; nodes: any[] } {
    const nodes = new Set<string>();
    const edges: any[] = [];

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

  public showState(string: string): void {
    for (let i = 0; i < string.length; i++) {
      console.log(
        this._loadedResult.variables[i],
        string[i] === '0' || string[i] === '⊥' ? 'false' : 'true'
      );
    }
  }

  private _addLabels(results: any): void {
    for (let i = 0; i < results.attractors.length; i++) {
      const label = results.attractors[i].class[0];
      results.attractors[i].vis.nodes.push({
        label,
        id: 'labelnode' + i,
        font: { face: 'symbols', size: 40 },
        opacity: 0,
        labelHighlightBold: false,
      });
      results.attractors[i].vis.edges.push({
        length: 20,
        from: 'labelnode' + i,
        to: results.attractors[i].vis.nodes[0].id,
        color: { color: '#000000', opacity: 0.1 },
        arrows: { to: { enabled: false } },
      });
    }
  }

  private _displayAll(): void {
    if (!this._loadedResult) {
      Message.showError(
        'Unable to render Attractor Visualization: No loaded result available for display.'
      );
      return;
    }

    if (this._loadedResult['has_large_attractors']) {
      Message.showInfo(
        'Some attractors were too large to draw. These will be shown only as two states with the constant and non-constant variables differentiated.'
      );
    }

    let nodes: any[] = [];
    let edges: any[] = [];

    for (let i = 0; i < this._loadedResult.attractors.length; i++) {
      nodes = nodes.concat(this._loadedResult.attractors[i].vis.nodes);
      edges = edges.concat(this._loadedResult.attractors[i].vis.edges);
    }

    if (!this.container) {
      Message.showError(
        'Unable to render Attractor Visualization: Missing container element - Internal Error'
      );
      return;
    }

    this._network = new vis.Network(
      this.container!,
      { nodes, edges },
      this._options
    );
  }

  public displayGraph(index: number): void {
    if (!this.container) {
      Message.showError('Cannot show Attractor Visualization: Internal Error');
      return;
    }

    if (!this._loadedResult) {
      Message.showError(
        'Unable to render Attractor Visualization: No loaded result available for display.'
      );
      return;
    }

    if (this._loadedResult['has_large_attractors']) {
      Message.showInfo(
        'Some attractors were too large to draw. These will be shown only as two states with the constant and non-constant variables differentiated.'
      );
    }

    this._network = new vis.Network(
      this.container!,
      this._loadedResult.attractors[index].vis,
      this._options
    );
  }
}

const AttractorVisualizer = new AttractorVisualizerClass();

export default AttractorVisualizer;
