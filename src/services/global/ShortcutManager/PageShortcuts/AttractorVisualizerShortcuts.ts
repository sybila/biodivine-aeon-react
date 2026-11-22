import type { AttractorVisualizerInt } from '../../../attractor-visualizer/AttractorVisualizerInt';
import type { PageShortcutsInt } from './PageShortcutsInt';

/** Implementation of keyboard shortcuts for the Attractor Visualizer page. */
class AttractorVisualizerShortcuts implements PageShortcutsInt {
  private attractorVisualizerServ: AttractorVisualizerInt;

  constructor(attractorVisualizerServ: AttractorVisualizerInt) {
    this.attractorVisualizerServ = attractorVisualizerServ;
  }

  public applyShortcuts(event: KeyboardEvent) {
    /** Open state overview menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'O') {
      event.preventDefault();
      this.attractorVisualizerServ.openMenuTab('State Overview');
      return;
    }

    /** Open wittness update function menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'U') {
      event.preventDefault();
      this.attractorVisualizerServ.openMenuTab('Witness Update Functions');
      return;
    }

    /** Open help menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'H') {
      event.preventDefault();
      this.attractorVisualizerServ.openMenuTab('Help');
      return;
    }
  }
}

export default AttractorVisualizerShortcuts;
