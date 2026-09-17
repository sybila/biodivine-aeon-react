import type { EdgeMonotonicity } from '../../../../../../types/types';
import type { EditorFloatMenuInt } from './EditorFloatMenuInt';

class EditorFloatMenu implements EditorFloatMenuInt {
  // #region --- Variable ---

  public editVarName() {
    return 'Edit name (ctrl + r)';
  }

  public editUpdateFunction() {
    return 'Edit update function (ctrl + e)';
  }

  public removeVar() {
    return 'Remove (ctrl + d)';
  }

  public findVarInMenu() {
    return 'Find in menu (ctrl + s)';
  }

  // #endregion

  // #region --- Regulation ---

  public toggleObservability(setObservable: boolean) {
    const onOff = setObservable ? 'on' : 'off';

    return `Observability ${onOff} (ctrl + o)`;
  }

  public toggleMonotonicity(nextMonotocityValue: EdgeMonotonicity) {
    const shortcut = 'ctrl + m';

    const getText = (nextMonotocityValue: EdgeMonotonicity): string => {
      switch (nextMonotocityValue) {
        case 'activation': {
          return 'Make activating';
        }
        case 'inhibition': {
          return 'Make inhibiting';
        }
        default: {
          return 'Set unspecified monotonicity';
        }
      }
    };

    return `${getText(nextMonotocityValue)} (${shortcut})`;
  }

  removeReg() {
    return 'Remove (ctrl + d)';
  }

  // #endregion
}

export default EditorFloatMenu;
