import type { AttractorVisualizerInput } from '../../types';

/**
 * Interface for managing the Attractor Visualizer page.
 */
export interface AttractorVisualizerInt {
  // #region --- Initialization ---

  /** Initialize the visualizer with a container element. */
  init(container: HTMLElement): void;

  // #endregion

  // #region --- Show Visualization ---

  /** Open the attractor visualizer with the given input data.
   * inputData depends on the part of the application from which the visualizer is opened.
   * inputData types:
   *  - { behavior: AttractorBehavior } - from the Attractor Analysis results
   *  - { nodeId: number } - from the overview in the Bifurcation Explorer
   *  - { nodeId: number, variableName: string, behavior: AttractorBehavior, vector: string[] } - from the Stability Analysis results in the Bifurcation Explorer
   */
  openVisualizer(inputData: AttractorVisualizerInput): void;

  insertAttractorData(result: any, newTab: boolean): void;

  displayGraph(index: number): void;

  // #endregion

  // #region --- Get Data ---

  /** Returns the list of state variable names, or undefined if no attractor data is loaded. */
  getStateVariables(): string[] | undefined;

  getWitness(): Array<[string, string]> | undefined;

  // #endregion

  // #region --- Clear ---

  clear(): void;

  // #endregion

  witnessPanelVisible(show?: boolean): void;

  showState(string: string): void;
}
