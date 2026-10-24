import type { Constructor } from '../../../../../types/mixins';
import type { SelectionButtonsTooltipsInt } from './SelectionButtonsTooltipsInt';

function SelectionButtonsTooltips<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements SelectionButtonsTooltipsInt {
    public selectAllVariables() {
      return 'Select all variables.';
    }

    public deselectAllVariables() {
      return 'Deselect all variables.';
    }

    public toggleSelectedVariables() {
      return 'Toggle selected variables.';
    }
  };
}

export default SelectionButtonsTooltips;
