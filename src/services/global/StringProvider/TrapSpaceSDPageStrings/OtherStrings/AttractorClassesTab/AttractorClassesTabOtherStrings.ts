import type { AttractorClassesTabOtherStringsInt } from './AttractorClassesTabOtherStringsInt';

class AttractorClassesTabOtherStrings implements AttractorClassesTabOtherStringsInt {
  public noSelectedItem() {
    return 'To be able to compute attractores please select stable motif (edge) or trap-space (node).';
  }

  public attractorClassesHeader() {
    return 'Attractor Classes';
  }

  public getAttractorClassesButton() {
    return 'Get Attractor Behavior Classes';
  }

  public openWitnessButton() {
    return 'Witness';
  }
  public openAttractorVisualizationButton() {
    return 'Attractor';
  }
}

export default AttractorClassesTabOtherStrings;
