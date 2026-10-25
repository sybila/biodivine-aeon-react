import VarTrapSpaceStateFilterTable from '../VarTrapSpaceStateFilterTable/VarTrapSpaceStateFilterTable';
import type { MakeDecisionFiltersProps } from './MakeDecisionFiltersProps';

const MakeDecisionFilters: React.FC<MakeDecisionFiltersProps> = ({
  variableNames,
  setFilteredVariables,

  generalStringProviderServ,
  tooltipStringProviderServ,
  searchAndFilterHelpersServ,

  helpHoverStore,
}) => {
  return (
    <VarTrapSpaceStateFilterTable
      variableNames={variableNames}
      filterFilterTableVariablesFunction={(varNames, searchTerm) =>
        searchAndFilterHelpersServ.filterStringsBySearchTerms(
          varNames,
          searchTerm
        )
      }
      setFilteredVariables={setFilteredVariables}
      generalStringProviderServ={generalStringProviderServ}
      tooltipStringProviderServ={tooltipStringProviderServ}
      helpHoverStore={helpHoverStore}
    />
  );
};

export default MakeDecisionFilters;
