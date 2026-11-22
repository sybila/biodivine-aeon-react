import type { AttractorBifurcationExplorerInt } from '../../../attractor-bifurcation-explorer/AttractorBifurcationExplorer/AttractorBifurcationExplorerInt';
import type { PageShortcutsInt } from './PageShortcutsInt';

/** Implementation of keyboard shortcuts for the Attractor Bifurcation Explorer page. */
class AttractorBifurcationExplorerShortcuts implements PageShortcutsInt {
  private attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt;

  constructor(
    attractorBifurcationExplorerServ: AttractorBifurcationExplorerInt
  ) {
    this.attractorBifurcationExplorerServ = attractorBifurcationExplorerServ;
  }

  public applyShortcuts(event: KeyboardEvent) {

    /** Open overview menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'O') {
      event.preventDefault();
      this.attractorBifurcationExplorerServ.openMenuTab('Overview');
      return;
    }

    /** Open make decision menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'D') {
      event.preventDefault();
      this.attractorBifurcationExplorerServ.openMenuTab('Make Decision');
      return;
    }

    /** Open stability analysis menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'A') {
      event.preventDefault();
      this.attractorBifurcationExplorerServ.openMenuTab('Stability Analysis');
      return;
    }

    /** Open visual options menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'V') {
      event.preventDefault();
      this.attractorBifurcationExplorerServ.openMenuTab('Visual Options');
      return;
    }

    /** Open help menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'H') {
      event.preventDefault();
      this.attractorBifurcationExplorerServ.openMenuTab('Help');
      return;
    }

    /** Open utilities menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'U') {
      event.preventDefault();
      this.attractorBifurcationExplorerServ.openUtilitiesMenu();
    }
  }
}

export default AttractorBifurcationExplorerShortcuts;
