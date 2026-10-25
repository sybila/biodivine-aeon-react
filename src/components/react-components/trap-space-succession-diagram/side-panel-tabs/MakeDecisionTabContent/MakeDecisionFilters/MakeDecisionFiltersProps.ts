import type { MakeDecisionTabOtherStringsInt } from '../../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/OtherStrings/MakeDecisionTab/MakeDecisionTabOtherStringsInt';
import type { MakeDecisionTabTooltipsInt } from '../../../../../../services/global/StringProvider/TrapSpaceSDPageStrings/Tooltips/MakeDecisionTab/MakeDecisionTabTooltipsInt';
import type { SearchAndFilterHelpersInt } from '../../../../../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpersInt';
import type { HelpHoverState } from '../../../../../../stores/HelpHover/HelpHoverState';
import type { ZustandStore } from '../../../../../../stores/ZustandStoreType';
import type { TSSDVariableTrapSpaceFilterStateArray } from '../VarTrapSpaceStateFilterTable/VarTrapSpaceStateFilterTableProps';

export type MakeDecisionFiltersProps = {
  variableNames: Array<string>;

  setFilteredVariables: (
    newFilter: TSSDVariableTrapSpaceFilterStateArray
  ) => void;

  generalStringProviderServ: MakeDecisionTabOtherStringsInt;
  tooltipStringProviderServ: MakeDecisionTabTooltipsInt;
  searchAndFilterHelpersServ: SearchAndFilterHelpersInt;

  helpHoverStore: ZustandStore<HelpHoverState>;
};
