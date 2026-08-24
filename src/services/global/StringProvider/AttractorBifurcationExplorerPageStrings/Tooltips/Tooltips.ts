import type { TooltipsInt } from './TooltipsInt';

class Tooltips implements TooltipsInt {
  // #region --- Overview Menu ---

  openNodeWitness(): string {
    return 'Open witness model (example fully specified version of the model) for the nodes attractor class.';
  }
  openNodeAttractor(): string {
    return 'Open attractor visualization for the nodes attractor class.';
  }

  // #endregion

  // #region --- Stability analysis Menu ---

  changeStabilityAnalysisMode(stabilityAnalysisMode: string): string {
    return `Change stability analysis mode to ${stabilityAnalysisMode}.`;
  }
  startStabilityAnalysis(): string {
    return 'Start stability analysis for selected node.';
  }
  openStabilityAnalysisWitness(): string {
    return 'Open witness (example fully specified version of the model) for this variable state.';
  }
  openStabilityAnalysisAttractor(): string {
    return 'Open attractor visualization for this variable state.';
  }

  // #endregion

  // #region --- Make Decision Menu ---

  autoExpandButton(): string {
    return 'Auto-expand bifurcation tree by selected depth.';
  }
  changeAutoExpandDepth(): string {
    return 'Change depth of the auto-expand.';
  }
  getDecisionsButton(): string {
    return 'Compute available decisions for this node.';
  }
  selectDecisionButton(): string {
    return 'Apply decision to the bifurcation tree.';
  }

  // #endregion

  // #region Visual Options

  animateLayoutChanges(): string {
    return 'Toggle animation of layout changes';
  }

  snapNodesToLayers(): string {
    return 'Toggle snapping of nodes to layers';
  }

  positiveOnLeft(): string {
    return 'Toggle whether positive nodes are on the left or right';
  }

  changePrecision(): string {
    return 'Change the precision of the bifuration tree.';
  }

  // #endregion

  // #region Utilities Menu

  public utilitiesMenu() {
    return 'Show/Hide Utilities Menu';
  }

  public fit() {
    return 'Fit the bifurcation tree to the canvas';
  }

  public resetLayout() {
    return 'Reset the layout of the bifurcation tree to the default';
  }

  // #endregion
}

export default Tooltips;
