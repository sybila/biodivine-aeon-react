import type { TrapSpaceFilterVariableState } from '../../../../../../../components/react-components/trap-space-succession-diagram/side-panel-tabs/MakeDecisionTabContent/VarTrapSpaceStateFilterTable/VarTrapSpaceStateFilterTableProps';
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

    public filterRowsButton() {
      return 'Apply currently defined filter.';
    }

    public changeFilterForVariableButton(
      nextFilterVarValue: TrapSpaceFilterVariableState
    ) {
      if (nextFilterVarValue == 'Not Filtered' || nextFilterVarValue == undefined) {
        return 'Remove variable from filter.';
      }

      const trapSpaceFilterValue = nextFilterVarValue == 0 ? 'false' : 'true';

      return `Change filtered trap space status for variable to ${trapSpaceFilterValue}`;
    }
  };
}

export default VariableStateFilterTableTooltips;
