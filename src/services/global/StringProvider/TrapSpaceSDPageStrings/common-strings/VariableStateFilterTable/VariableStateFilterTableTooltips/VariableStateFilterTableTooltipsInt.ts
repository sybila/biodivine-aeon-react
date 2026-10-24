import type { SelectionButtonsTooltipsInt } from '../../../../common-tooltips/SelectionButtonsTooltips/SelectionButtonsTooltipsInt';

export interface VariableStateFilterTableTooltipsInt extends SelectionButtonsTooltipsInt {
  changeSelectedVariablesFilter(trapSpaceValue: string): string;
  removeSelectedVariablesFromFilter(): string;
}
