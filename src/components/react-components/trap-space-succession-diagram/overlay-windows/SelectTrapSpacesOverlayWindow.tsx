import { useMemo, useState } from 'react';
import type { NodeDataTSSD } from '../../../../types/types';
import BasicTable from '../../global/BasicTable/BasicTable';
import CustomContentTableRow from '../../global/CustomContentTableRow/CustomContentTableRow';
import SectionWithDotHeader from '../../global/SectionWithDotHeader/SectionWithDotHeader';
import ColoredWordsReact from '../../lit-wrappers/ColoredWordsReact';
import type { SelectTrapSpacesOverlayWindowProps } from './SelectTrapSpacesOverlayWindowProps';
import VarTrapSpaceStateFilterTable from './VarTrapSpaceStateFilterTable/VarTrapSpaceStateFilterTable';
import type { TSSDVariableTrapSpaceFilterStateArray } from './VarTrapSpaceStateFilterTable/VarTrapSpaceStateFilterTableProps';

type ColoredWordVariables = Record<
  number,
  Array<{ text: string; color: string; weight: string }>
>;

const SelectTrapSpacesOverlayWindow: React.FC<
  SelectTrapSpacesOverlayWindowProps
> = ({
  trapSpacesForSelection,
  variableNames,
  makeDecisionFunction,
  filterFilterTableVariablesFunction,

  generalStringProviderServ,
  tooltipStringProviderServ,

  helpHoverStore,
}) => {
  const [trapSpaceFilter, setTrapSpaceFilter] =
    useState<TSSDVariableTrapSpaceFilterStateArray>([]);

  const filteredTrapSpaces = useMemo(
    () => trapSpacesForSelection,
    // .filter(
    //     (trapSpace) =>
    //       trapSpaceFilter.find(
    //         (filterTrapSpace) =>
    //           trapSpace.variableValues[filterTrapSpace.varName] ===
    //           filterTrapSpace.trapSpaceValue
    //       ) != undefined
    //   ),
    [trapSpacesForSelection, trapSpaceFilter]
  );

  const okButton = {
    text: generalStringProviderServ.selectTrapSpaceButton(),
    icon: '',
    iconAlt: '',
    handleClick: () => {},
    buttonBgColor: '',
    buttonTextColor: '',
    buttonHoverColor: '',
    buttonActiveColor: '',
    buttonTooltipFunction: (e: MouseEvent) => {},
    isActive: false,
  };

  const [allWordStrings, variableStatesAsCutColoredWords]: [
    Record<string, string>,
    ColoredWordVariables,
  ] = useMemo(() => {
    const maxLength = 30;

    return trapSpacesForSelection.reduce(
      ([allWords, cutColored], trapSpace) => {
        let currentLength = 0;

        variableNames.forEach((varName) => {
          const variableValue = trapSpace.variableValues[varName];

          if (variableValue === undefined) {
            return;
          }

          const variableString = `${varName}:${variableValue}`;

          const variableAsColoredWord = {
            text: variableString,
            color:
              variableValue === 0
                ? 'var(--color-negative)'
                : 'var(--color-positive)',
            weight: 'bold',
          };

          if (allWords[trapSpace.id] === undefined) {
            allWords[trapSpace.id] = variableString;
          } else {
            allWords[trapSpace.id] += ` ${variableString}`;
          }

          if (currentLength < maxLength) {
            if (cutColored[trapSpace.id] === undefined) {
              cutColored[trapSpace.id] = [];
            }

            if (
              variableAsColoredWord.text.length + currentLength <=
              maxLength
            ) {
              cutColored[trapSpace.id].push(variableAsColoredWord);
              currentLength += variableString.length;
            } else {
              const remainingSpace = maxLength - currentLength;

              const cutVarAsWord = { ...variableAsColoredWord };

              cutVarAsWord.text = `${cutVarAsWord.text.slice(0, remainingSpace)}...`;

              cutColored[trapSpace.id].push(cutVarAsWord);
              length += cutVarAsWord.text.length;
            }
          }
        });

        return [allWords, cutColored];
      },
      [{} as Record<number, string>, {} as ColoredWordVariables]
    );
  }, [trapSpacesForSelection]);

  return (
    <div className="flex flex-none flex-col items-center h-[80vh] w-[50vw] gap-3">
      <SectionWithDotHeader
        text={generalStringProviderServ.filterTableSectionHeader()}
        height="fit-content"
        width="100%"
      >
        <VarTrapSpaceStateFilterTable
          variableNames={variableNames}
          filterFilterTableVariablesFunction={
            filterFilterTableVariablesFunction
          }
          setFilteredVariables={setTrapSpaceFilter.bind(this)}
          generalStringProviderServ={generalStringProviderServ}
          tooltipStringProviderServ={tooltipStringProviderServ}
          helpHoverStore={helpHoverStore}
        />
      </SectionWithDotHeader>

      <SectionWithDotHeader
        text={generalStringProviderServ.trapSpaceSectionHeader()}
        height="fit-content"
        width="100%"
      >
        <BasicTable<NodeDataTSSD>
          elements={filteredTrapSpaces}
          noRowsPlaceholder={generalStringProviderServ.emptyTrapSpaceTablePlaceholderText()}
          noRowsTextColor="var(--color-primary-text)"
          noRowsHeight="100px"
          noRowsWidth="98%"
          renderRowsWithContainer={(filteredTrapSpaces) => (
            <section className="flex flex-col overflow-auto min-h-[100px] h-auto max-h-[25vh] w-[98%] px-[2%] pb-1 mb-1 gap-1">
              {filteredTrapSpaces.map((trapSpace) => {
                return (
                  <CustomContentTableRow
                    key={trapSpace.id}
                    customContent={
                      <ColoredWordsReact
                        contMinHeight="23px"
                        contMaxHeight="23px"
                        contMinWidth="50%"
                        contMaxWidth="50%"
                        contOverflowY="hidden"
                        fontSize="20px"
                        fontFamily="var(--font-family-fira-bold)"
                        contJustifyContent="start"
                        words={
                          variableStatesAsCutColoredWords[trapSpace.id] ?? [
                            {
                              text: 'Unknown',
                              color: 'var(--color-secondary-text)',
                            },
                          ]
                        }
                      />
                    }
                    isSelected={false}
                    nameTooltipFun={
                      (e: MouseEvent) => {}
                      // helpHoverStore
                      //   .getState()
                      //   .setHelpHoverAtMouse(e, el, true, -50, 50)
                    }
                    hideTooltipFun={() => helpHoverStore.getState().clear()}
                    contColor="var(--color-secondary-light)"
                    contHoverColor="var(--color-secondary-light-highlight)"
                    contActiveColor="var(--color-secondary-light-active)"
                    contActiveBorderColor="var(--color-secondary-light-border)"
                    contHoverBorderColor="var(--color-secondary-light-border)"
                    contBorderColor="var(--color-secondary-light)"
                    buttons={[okButton]}
                    buttonWidth="100px"
                  />
                );
              })}
            </section>
          )}
        />
      </SectionWithDotHeader>
    </div>
  );
};

export default SelectTrapSpacesOverlayWindow;
