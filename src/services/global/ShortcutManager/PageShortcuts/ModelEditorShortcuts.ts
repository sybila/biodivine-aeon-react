import type { ModelEditorInt } from '../../../model-editor/ModelEditor/ModelEditorInt';
import type { PageShortcutsInt } from './PageShortcutsInt';

/** Implementation of keyboard shortcuts for the Model Editor page. */
class ModelEditorShortcuts implements PageShortcutsInt {
  private modelEditorServ: ModelEditorInt;

  constructor(modelEditorServ: ModelEditorInt) {
    this.modelEditorServ = modelEditorServ;
  }

  public applyShortcuts(event: KeyboardEvent): void {
    /** Open model editor menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'M') {
      event.preventDefault();
      this.modelEditorServ.openMenuTab('Model Editor');
    }
  }
}

export default ModelEditorShortcuts;
