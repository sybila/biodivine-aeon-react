import type { ControlPerturbationsTableInt } from '../../../control-perturbations-table/ControlPerturbationsTableInt';
import type { PageShortcutsInt } from './PageShortcutsInt';

/** Implementation of keyboard shortcuts for the Control Perturbation Table page. */
class ControlPerturbationTableShortcuts implements PageShortcutsInt {
  private controlPerturbationsTableServ: ControlPerturbationsTableInt;

  constructor(controlPerturbationsTableServ: ControlPerturbationsTableInt) {
    this.controlPerturbationsTableServ = controlPerturbationsTableServ;
  }

  public applyShortcuts(event: KeyboardEvent) {
    /** Open overview menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'O') {
      event.preventDefault();
      this.controlPerturbationsTableServ.openMenuTab('Overview');
      return;
    }

    /** Open filters menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'F') {
      event.preventDefault();
      this.controlPerturbationsTableServ.openMenuTab('Filters');
      return;
    }

    /** Open sorting menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'S') {
      event.preventDefault();
      this.controlPerturbationsTableServ.openMenuTab('Sorting');
      return;
    }

    /** Open pages menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'G') {
      event.preventDefault();
      this.controlPerturbationsTableServ.openMenuTab('Pages');
      return;
    }

    /** Open help menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'H') {
      event.preventDefault();
      this.controlPerturbationsTableServ.openMenuTab('Help');
      return;
    }
  }
}

export default ControlPerturbationTableShortcuts;
