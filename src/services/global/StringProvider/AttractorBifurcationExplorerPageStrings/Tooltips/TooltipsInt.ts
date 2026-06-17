/** Class which provides tooltips for the attractor bifurcation explorer page. */
export interface TooltipsInt {
  // #region --- Overview Menu ---

  openNodeWitness(): string;
  openNodeAttractor(): string;

  // #endregion

  // #region --- Stability analysis Menu ---

  changeStabilityAnalysisMode(stabilityAnalysisMode: string): string;
  startStabilityAnalysis(): string;
  openStabilityAnalysisWitness(): string;
  openStabilityAnalysisAttractor(): string;

  // #endregion

  // #region --- Make Decision Menu ---

  autoExpandButton(): string;
  changeAutoExpandDepth(): string;
  getDecisionsButton(): string;
  selectDecisionButton(): string;

  // #endregion

  // #region Visual Options

  fit(): string;
  resetLayout(): string;
  animateLayoutChanges(): string;
  snapNodesToLayers(): string;
  positiveOnLeft(): string;
  changePrecision(): string;

  // #endregion
}
