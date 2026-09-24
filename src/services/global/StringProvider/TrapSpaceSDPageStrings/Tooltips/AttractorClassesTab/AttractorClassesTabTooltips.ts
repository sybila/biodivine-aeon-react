import type { AttractorClassesTabTooltipsInt } from './AttractorClassesTabTooltipsInt';

class AttractorClassesTabTooltips implements AttractorClassesTabTooltipsInt {
  public getAttractorClassesButton() {
    return 'Compute attractor behavior classes for the selected item.';
  }

  public openWitnessButton() {
    return 'Open witness model (example fully specified model for this class).';
  }
  public openAttractorVisualizationButton() {
    return 'Open attractor visualization for this class.';
  }
}

export default AttractorClassesTabTooltips;
