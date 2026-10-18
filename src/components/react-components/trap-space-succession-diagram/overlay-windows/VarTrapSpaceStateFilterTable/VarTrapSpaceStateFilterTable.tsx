import { useState } from 'react';
import TableRowWithName from '../../../global/NameTableRow/TableRowWithName';
import SelectionTable from '../../../global/SelectionTable/SelectionTable';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import type {
  TrapSpaceFilterVariableState,
  TSSDVariableTrapSpaceFilterState,
  VarTrapSpaceStateFilterTableProps,
} from './VarTrapSpaceStateFilterTableProps';

const VarTrapSpaceStateFilterTable: React.FC<
  VarTrapSpaceStateFilterTableProps
> = ({
  variableNames,
  filterFilterTableVariablesFunction,
  setFilteredVariables,
  generalStringProviderServ,
  tooltipStringProviderServ,
  helpHoverStore,
}) => {
  const [searchTextFilterTable, setSearchTextFilterTable] =
    useState<string>('');
  const [filterTableSelected, setFilterTableSelected] = useState<Set<string>>(
    new Set()
  );
  const [currentFilter, setCurrentFilter] =
    useState<TSSDVariableTrapSpaceFilterState>({});

  const getColorFromFilter = (trapSpaceValue: TrapSpaceFilterVariableState) => {
    switch (trapSpaceValue) {
      case 0:
        return 'var(--color-negative)';
      case 1:
        return 'var(--color-positive)';
      case undefined:
        return '';
      default:
        return 'var(--color-neutral)';
    }
  };

  const toggleVarFilterValue = (
    trapSpaceValue: TrapSpaceFilterVariableState
  ) => {
    switch (trapSpaceValue) {
      case 0:
        return 1;
      case 1:
        return undefined;
      case undefined:
        return 0;
      default:
        return 'Not Filtered';
    }
  };

  return (
    <div className="flex flex-col justify-center content-center w-full h-fit">
      <SelectionTable<string, string>
        elements={variableNames}
        getIdFromElement={(el) => el}
        selectedElementIds={filterTableSelected}
        setSelectedElementIds={(newSelected: Set<string>) =>
          setFilterTableSelected(newSelected)
        }
        noRowsPlaceholder={generalStringProviderServ.emptyFilterTablePlaceholderText()}
        noRowsTextColor="var(--color-primary-text)"
        getSearchText={() => searchTextFilterTable}
        setSearchText={(newSearchText: string) =>
          setSearchTextFilterTable(newSearchText)
        }
        searchPlaceholder="Insert variable name"
        filterElements={(elements: string[], searchTerm: string) =>
          filterFilterTableVariablesFunction(elements, searchTerm)
        }
        textInputTextColor="var(--color-primary-text)"
        textInputColor="var(--color-secondary-text-inputs)"
        textInputBorderColor="--color-secondary-text-inputs-border"
        renderRow={(variableName: string) => {
          return (
            <TableRowWithName
              key={variableName}
              name={variableName}
              nameIsEditable={false}
              nameTextColor="var(--color-secondary-text)"
              contColor="var(--color-secondary)"
              contHoverColor="var(--color-secondary-light-highlight)"
              contActiveColor="var(--color-secondary-light-active)"
              contActiveBorderColor="var(--color-secondary-light-highlight)"
              contHoverBorderColor="var(--color-secondary-border)"
              contBorderColor="var(--color-secondary)"
              buttons={[
                {
                  text: 'TS Value',
                  icon: '',
                  iconAlt: '',
                  handleClick: () => {
                    const currentFilterCopy = { ...currentFilter };

                    const newValue = toggleVarFilterValue(
                      currentFilter[variableName]
                    );

                    if (newValue != undefined) {
                      currentFilterCopy[variableName] = newValue;
                    } else {
                      delete currentFilterCopy[variableName];
                    }

                    setCurrentFilter(currentFilterCopy);
                  },
                  buttonBgColor: getColorFromFilter(
                    currentFilter[variableName]
                  ),
                  buttonTextColor: '',
                  buttonHoverColor: '',
                  buttonActiveColor: '',
                  buttonTooltipFunction: () => {},
                  isActive: false,
                },
              ]}
            />
          );
        }}
        selectionButtonTooltips={tooltipStringProviderServ}
        helpHoverStore={helpHoverStore}
      />

      <TextButtonReact
        text={generalStringProviderServ.filterTrapSpacesButton()}
        compWidth="98%"
        handleClick={() =>
          setFilteredVariables(
            Object.entries(currentFilter).map((trapSpace) => {
              return { varName: trapSpace[0], trapSpaceValue: trapSpace[1] };
            })
          )
        }
      />
    </div>
  );
};

export default VarTrapSpaceStateFilterTable;
