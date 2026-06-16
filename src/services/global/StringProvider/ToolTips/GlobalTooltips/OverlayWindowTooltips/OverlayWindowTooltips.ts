import ComputeEngineTooltips from './ComputeEngineTooltips/ComputeEngineTooltips';
import type { ComputeEngineTooltipsInt } from './ComputeEngineTooltips/ComputeEngineTooltipsInt';
import type { OverlayWindowTooltipsInt } from './OverlayWindowTooltipsInt';

class OverlayWindowTooltips implements OverlayWindowTooltipsInt {
  public ComputeEngineTooltips: ComputeEngineTooltipsInt;

  constructor() {
    this.ComputeEngineTooltips = new ComputeEngineTooltips();
  }
}

export default OverlayWindowTooltips;
