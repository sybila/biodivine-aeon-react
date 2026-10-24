import { type Constructor } from '../../../../../../../types/mixins';
import SelectionButtonsTooltips from '../../../../common-tooltips/SelectionButtonsTooltips/SelectionButtonTooltips';
import type { VariableStateFilterTableTooltipsInt } from './VariableStateFilterTableTooltipsInt';

function VariableStateFilterTableTooltips<TBase extends Constructor>(
  Base: TBase
) {
  const BasewithSelectionButtons = SelectionButtonsTooltips(Base);

  return class
    extends BasewithSelectionButtons
    implements VariableStateFilterTableTooltipsInt
  {
    public changeSelectedVariablesFilter(trapSpaceValue: string) {
      return `Change filter value of selected variables to ${trapSpaceValue}.`;
    }
    public removeSelectedVariablesFromFilter() {
      return 'Remove selected variables from filter.';
    }
  };
}

export default VariableStateFilterTableTooltips;
