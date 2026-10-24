import { useState } from 'react';
import TableRowWithName from '../../../../global/NameTableRow/TableRowWithName';
import SelectionTable from '../../../../global/SelectionTable/SelectionTable';
import TextButtonReact from '../../../../lit-wrappers/TextButtonReact';
import type {
  TrapSpaceFilterVariableState,
  TSSDVariableTrapSpaceFilterState,
  VarTrapSpaceStateFilterTableProps,
} from './VarTrapSpaceStateFilterTableProps';

import TrapSpaceButtonIcon from '../../../../../../assets/icons/goal.svg';

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

  const getTextColorFromFilter = (
    trapSpaceValue: TrapSpaceFilterVariableState
  ) => {
    switch (trapSpaceValue) {
      case 0:
        return 'var(--color-negative-text)';
      case 1:
        return 'var(--color-positive-text)';
      case undefined:
        return '';
      default:
        return 'var(--color-neutral-text)';
    }
  };

  const getHoverColorFromFilter = (
    trapSpaceValue: TrapSpaceFilterVariableState
  ) => {
    switch (trapSpaceValue) {
      case 0:
        return 'var(--color-negative-highlight';
      case 1:
        return 'var(--color-positive-highlight)';
      case undefined:
        return '';
      default:
        return 'var(--color-neutral-highlight)';
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

  const statusButtons = [
    {
      text: 'N',
      handleClick: () => {
        const newFilter = { ...currentFilter };

        filterTableSelected.forEach((varName) => delete newFilter[varName]);

        setCurrentFilter(newFilter);
      },
      buttonBgColor: 'var(--color-neutral)',
      buttonHoverColor: 'var(--color-neutral-highlight)',
      buttonTooltipFunction: (e: MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            tooltipStringProviderServ.removeSelectedVariablesFromFilter(),
            true,
            -50,
            80
          ),
    },
    {
      text: 'T',
      handleClick: () => {
        const newFilter = { ...currentFilter };

        filterTableSelected.forEach((varName) => (newFilter[varName] = 1));

        setCurrentFilter(newFilter);
      },
      buttonBgColor: 'var(--color-positive)',
      buttonHoverColor: 'var(--color-positive-highlight)',
      buttonTooltipFunction: (e: MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            tooltipStringProviderServ.changeSelectedVariablesFilter('true'),
            true,
            -50,
            80
          ),
    },
    {
      text: 'F',
      handleClick: () => {
        const newFilter = { ...currentFilter };

        filterTableSelected.forEach((varName) => (newFilter[varName] = 0));

        setCurrentFilter(newFilter);
      },
      buttonBgColor: 'var(--color-negative)',
      buttonHoverColor: 'var(--color-negative-highlight)',
      buttonTooltipFunction: (e: MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            tooltipStringProviderServ.changeSelectedVariablesFilter('false'),
            true,
            -50,
            50
          ),
    },
  ];

  return (
    <div className="flex flex-col justify-center content-center w-full h-fit">
      <SelectionTable<string, string>
        elements={variableNames}
        noRowsPlaceholder={generalStringProviderServ.emptyFilterTablePlaceholderText()}
        noRowsTextColor="var(--color-primary-text)"
        noRowsHeight="150px"
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
        textInputBorderColor="var(--color-secondary-text-inputs-border)"
        renderRowsWithContainer={(variableNames: string[]) => {
          return (
            <section className="flex flex-col h-[175px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1">
              {variableNames.map((variableName) => (
                <TableRowWithName
                  key={variableName}
                  name={variableName}
                  nameIsEditable={false}
                  nameTextColor="var(--color-secondary-text)"
                  contColor="var(--color-secondary)"
                  contHoverColor="var(--color-secondary-light-highlight)"
                  contActiveColor="var(--color-secondary-light-active)"
                  contActiveBorderColor="var(--color-secondary-border)"
                  contHoverBorderColor="var(--color-secondary-border)"
                  contBorderColor="var(--color-secondary)"
                  rowHeight="39px"
                  buttonHeight="28px"
                  buttonWidth="115px"
                  isSelected={filterTableSelected.has(variableName)}
                  handleClick={() => {
                    const newSelected = new Set(filterTableSelected);

                    if (filterTableSelected.has(variableName)) {
                      newSelected.delete(variableName);
                    } else {
                      newSelected.add(variableName);
                    }

                    setFilterTableSelected(newSelected);
                  }}
                  buttons={[
                    {
                      text: 'TS Value',
                      icon: TrapSpaceButtonIcon,
                      iconAlt: 'TS',
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
                      buttonTextColor: getTextColorFromFilter(
                        currentFilter[variableName]
                      ),
                      buttonHoverColor: getHoverColorFromFilter(
                        currentFilter[variableName]
                      ),
                      buttonActiveColor: '',
                      buttonTooltipFunction: () => {},
                      isActive: false,
                    },
                  ]}
                />
              ))}
            </section>
          );
        }}
        buttons={statusButtons}
        selectionButtonsConfig={{
          buttonColor: 'var(--color-tertiary-buttons)',
          buttonHoverColor: 'var(--color-tertiary-buttons-hover)',
          selectedElementsIds: filterTableSelected,
          setSelectedElements: (newSelectedElements) => {
            setFilterTableSelected(newSelectedElements);
          },
          allElementIds: variableNames,
          selectionButtonsTooltips: tooltipStringProviderServ,
          helpHoverStore: helpHoverStore,
        }}
        pagingWrapperConfig={{
          pagingWrapperTooltips: tooltipStringProviderServ,
          helpHoverStore: helpHoverStore,
          numberOfElementsOnPage: 4,
        }}
        hideTooltipFunction={() => helpHoverStore.getState().clear()}
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
