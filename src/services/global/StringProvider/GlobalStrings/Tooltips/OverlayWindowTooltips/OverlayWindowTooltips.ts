import ComputeEngineTooltips from './ComputeEngineTooltips/ComputeEngineTooltips';
import type { ComputeEngineTooltipsInt } from './ComputeEngineTooltips/ComputeEngineTooltipsInt';
import type { OverlayWindowTooltipsInt } from './OverlayWindowTooltipsInt';
import ResultsTooltips from './ResultsTooltips/ResultsTooltips';
import type { ResultsTooltipsInt } from './ResultsTooltips/ResultsTooltipsInt';

class OverlayWindowTooltips implements OverlayWindowTooltipsInt {
  public ComputeEngineTooltips: ComputeEngineTooltipsInt;
  public ResultsTooltips: ResultsTooltipsInt;

  constructor() {
    this.ComputeEngineTooltips = new ComputeEngineTooltips();
    this.ResultsTooltips = new ResultsTooltips();
  }
}

export default OverlayWindowTooltips;
