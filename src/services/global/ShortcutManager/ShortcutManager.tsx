import type { ModelEditorStatus } from '../../../stores/ModelEditor/ModelEditorStatus';
import type { UndoRedoState } from '../../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type { TabType } from '../../../types';
import type { ModelEditorInt } from '../../model-editor/ModelEditor/ModelEditorInt';
import type { LiveModelInt } from '../LiveModel/LiveModelInt';
import AttractorBifurcationExplorerShortcuts from './PageShortcuts/AttractorBifurcationExplorerShortcuts';
import ControlPerturbationTableShortcuts from './PageShortcuts/ControlPerturbationTableShortcuts';
import ModelEditorShortcuts from './PageShortcuts/ModelEditorShortcuts';
import type { PageShortcutsInt } from './PageShortcuts/PageShortcutsInt';
import type { ShortcutManagerInt } from './ShortcutManagerInt';

class ShortcutManager implements ShortcutManagerInt {
  private currentKeydownHandler: ((event: KeyboardEvent) => void) | null = null;
  private pageShortcuts: Partial<Record<TabType, PageShortcutsInt>>;

  constructor(
    liveModelServ: LiveModelInt,
    modelEditorServ: ModelEditorInt,

    modelEditorStatusStore: ZustandStore<ModelEditorStatus>,
    modelUndoRedoStore: ZustandStore<UndoRedoState>
  ) {
    this.pageShortcuts = {
      'Model Editor': new ModelEditorShortcuts(
        liveModelServ,
        modelEditorServ,

        modelEditorStatusStore,
        modelUndoRedoStore
      ),
      'Attractor Bifurcation Explorer':
        new AttractorBifurcationExplorerShortcuts(),
      'Control Perturbations Table': new ControlPerturbationTableShortcuts(),
    };
  }

  public setShortcuts(pageType: TabType): void {
    const shortcuts = this.pageShortcuts[pageType];

    if (!shortcuts) {
      console.warn(`No shortcuts defined for page type: ${pageType}`);
      return;
    }

    this.clearShortcuts();

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable;

      if (isTyping) {
        return;
      }

      shortcuts.applyShortcuts(event);
    };

    window.addEventListener('keydown', onKeyDown);
    this.currentKeydownHandler = onKeyDown;
  }

  public clearShortcuts(): void {
    if (this.currentKeydownHandler) {
      window.removeEventListener('keydown', this.currentKeydownHandler);
      this.currentKeydownHandler = null;
    }
  }
}

export default ShortcutManager;
