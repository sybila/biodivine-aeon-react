import type { OverviewTabTooltipsInt } from './OverviewTabTooltipsInt';

class OverviewTabTooltips implements OverviewTabTooltipsInt {
  toggleStateVisualization() {
    return 'Click to toggle the state visualization format.';
  }
}

export default OverviewTabTooltips;
