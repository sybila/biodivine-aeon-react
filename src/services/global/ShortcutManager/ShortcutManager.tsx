import type { TabType } from '../../../types';
import type { ModelEditorInt } from '../../model-editor/ModelEditor/ModelEditorInt';
import ModelEditorShortcuts from './PageShortcuts/ModelEditorShortcuts';
import type { PageShortcutsInt } from './PageShortcuts/PageShortcutsInt';
import type { ShortcutManagerInt } from './ShortcutManagerInt';

class ShortcutManager implements ShortcutManagerInt {
  private currentKeydownHandler: ((event: KeyboardEvent) => void) | null = null;
  private pageShortcuts: Partial<Record<TabType, PageShortcutsInt>>;

  constructor(modelEditorServ: ModelEditorInt) {
    this.pageShortcuts = {
      'Model Editor': new ModelEditorShortcuts(modelEditorServ),
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
