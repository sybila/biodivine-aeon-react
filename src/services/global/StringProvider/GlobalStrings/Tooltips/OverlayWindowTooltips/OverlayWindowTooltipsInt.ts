import type { ComputeEngineTooltipsInt } from './ComputeEngineTooltips/ComputeEngineTooltipsInt';
import type { ResultsTooltipsInt } from './ResultsTooltips/ResultsTooltipsInt';

/** Class which provides tooltips for global overlay windows (eg. Compute Engine Overlay Window, Results Overlay Window ....) */
export interface OverlayWindowTooltipsInt {
  ComputeEngineTooltips: ComputeEngineTooltipsInt;
  ResultsTooltips: ResultsTooltipsInt;
}
