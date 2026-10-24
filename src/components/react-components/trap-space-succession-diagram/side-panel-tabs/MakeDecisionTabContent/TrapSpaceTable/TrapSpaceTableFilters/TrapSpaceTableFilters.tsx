import VarTrapSpaceStateFilterTable from '../../VarTrapSpaceStateFilterTable/VarTrapSpaceStateFilterTable';
import type { TrapSpaceTableFiltersProps } from './TrapSpaceTableFiltersProps';

const TrapSpaceTableFilters: React.FC<TrapSpaceTableFiltersProps> = ({
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

export default TrapSpaceTableFilters;
