import type { GlobalTooltipsInt } from './GlobalTooltipsInt';

class GlobalTooltips implements GlobalTooltipsInt {
  computeEngineStatus(): string {
    return 'Compute Engine Status';
  }
}

export default GlobalTooltips;
