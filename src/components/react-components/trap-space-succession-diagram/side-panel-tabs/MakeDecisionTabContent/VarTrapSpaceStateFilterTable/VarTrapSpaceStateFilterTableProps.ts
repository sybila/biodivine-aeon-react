import type { MakeDecisionTabOtherStringsInt } from '../../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/MakeDecisionTab/MakeDecisionTabOtherStringsInt';
import type { MakeDecisionTabTooltipsInt } from '../../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/Tooltips/MakeDecisionTab/MakeDecisionTabTooltipsInt';
import type { HelpHoverState } from '../../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';
import type { TrapSpaceVariableState } from '../../../../../../types/types';

export type TrapSpaceFilterVariableState =
  | TrapSpaceVariableState
  | 'Not Filtered';

export type TSSDVariableTrapSpaceFilterState = Record<
  string,
  TrapSpaceFilterVariableState
>;

export type TSSDVariableTrapSpaceFilterStateArray = Array<{
  varName: string;
  trapSpaceValue: TrapSpaceFilterVariableState;
}>;

export type VarTrapSpaceStateFilterTableProps = {
  variableNames: Array<string>;
  filterFilterTableVariablesFunction: (
    variableNames: Array<string>,
    searchTerm: string
  ) => Array<string>;
  setFilteredVariables: (
    newFilter: TSSDVariableTrapSpaceFilterStateArray
  ) => void;

  generalStringProviderServ: MakeDecisionTabOtherStringsInt;
  tooltipStringProviderServ: MakeDecisionTabTooltipsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
