import type { StabilityAnalysisModes } from "../../../../types/types";
import type { AttractorBifurcationExplorerInt } from "../../../attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorerInt";
import type { AttractorVisualizerInt } from "../../../attractor-visualizer/AttractorVisualizerInt";

export interface AttractorAnalysisInt {
  // #region --- Attractor Analysis Computation ---

  startAttractorAnalysis(): void;

  // #endregion

  // #region --- Attractor Bifurcation Explorer ---

  /** Fetches the bifurcation tree from the compute engine.
   * @param fit - (boolean) Determines whether to fit the tree in the view of AttractorBifurcationExplorer.
   * @param animate - (boolean) Determines whether the bifurcation tree should be loaded with animation (true) or without (false).
   * @param attractorBifurcationExplorerRef - (AttractorBifurcationExplorerInt) Reference to the AttractorBifurcationExplorer, used to insert the tree data after fetching.
   */
  getBifurcationTree(
    fit: boolean,
    animate: boolean,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void;

  /** Sets the precision of the bifurcation tree.
   *  Precision is % with up to two decimal places
   */
  setBifurcationTreePrecision(
    precision: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void;

  /** Automatically expands the bifurcation tree at the given node and depth. */
  autoExpandBifurcationTree(
    nodeId: number,
    depth: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void;

  /** Deletes a bifurcation decision by node ID. */
  deleteBifurcationDecision(
    nodeId: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void;

  /** Fetches the stability data for a specific node and behaviour.
   * @param nodeId - (number) The ID of the node to fetch stability data for.
   * @param behaviour - (StabilityAnalysisModes) The behaviour mode to use for fetching stability data.
   */
  getStabilityData(nodeId: number, behaviour: StabilityAnalysisModes): void;

  /** Fetches the decisions for a specific node. */
  getDecisions(
    nodeId: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void;

  makeDecision(
    nodeId: number,
    decisionId: number,
    attractorBifurcationExplorerRef: AttractorBifurcationExplorerInt
  ): void;

  // #endregion

  // #region --- Attractor Visualizer ---

  /** Fetches an attractor by its behavior string. Used by the results window.*/
  getAttractorByBehavior(
    behavior: string,
    attractorVisualizerRef: AttractorVisualizerInt
  ): void;

  /** Fetches an attractor for node in the AttractorBifurcationExplorer */
  getBifurcationExplorerAttractor(
    nodeId: number,
    attractorVisualizerRef: AttractorVisualizerInt
  ): void;

  getStabilityAnalysisAttractor(
    nodeId: number,
    variableName: string,
    behavior: string,
    vector: string[],
    attractorVisualizerRef: AttractorVisualizerInt
  ): void;

  // #endregion
}
