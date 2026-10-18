import type { SelectTrapSpacesOverlayWindowOtherStringsInt } from '../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/SelectTrapSpacesOverlayWindow/SelectTrapSpacesOverlayWindowOtherStringsInt';
import type { SelectTrapSpacesOverlayWindowTooltipsInt } from '../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/Tooltips/SelectTrapSpacesOverlayWindow/SelectTrapSpacesOverlayWindowTooltipsInt';
import type { HelpHoverState } from '../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../stores/ZustandStoreType';
import type { TrapSpaceVariableState } from '../../../../../types/types';

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

  generalStringProviderServ: SelectTrapSpacesOverlayWindowOtherStringsInt;
  tooltipStringProviderServ: SelectTrapSpacesOverlayWindowTooltipsInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
