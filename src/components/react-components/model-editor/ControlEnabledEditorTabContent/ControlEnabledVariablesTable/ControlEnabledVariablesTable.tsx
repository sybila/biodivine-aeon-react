import { useMemo, type ReactNode } from 'react';
import {
  type ModelEditorVariable,
  type Variable,
  type VariableIdSet,
} from '../../../../../types/types';
import SearchTable from '../../../global/SearchTable/SearchTable';
import type { ControlEnabledVariablesTableProps } from './ControlEnabledVariablesTableProps';
import VariableControlEnabledInfo from './VariableControlEnabledInfo/VariableControlEnabledInfo';

const ControlVariablesTable: React.FC<ControlEnabledVariablesTableProps> = ({
  controlEnabledEditorServ,
  searchAndFilterHelpersServ,
  pageStringProviderServ,
  messageServ,
  loadingServ,

  variablesStore,
  controlStore,
  modelEditorStatusStore,
  helpHoverStore,
}) => {
  const selectedVariablesIdsNotSafe: VariableIdSet = modelEditorStatusStore(
    (state) => state.selectedItemsInfo.variables
  );

  const selectedVariablesIds: VariableIdSet =
    selectedVariablesIdsNotSafe ?? new Set();

  const variablesObj = variablesStore((state) => state.variables);

  const variables = Object.values(variablesObj);

  const variableIds = useMemo(() => {
    return variables
      .map((variable) => variable.id ?? -1)
      .filter((id) => id !== -1);
  }, [variables]);

  const hoverItem = modelEditorStatusStore((state) => state.hoverItemInfo);

  const hoverVariableId = hoverItem?.type === 'variable' ? hoverItem.id : null;

  const updateSelectedVariables = (newSelected: Set<number>) => {
    loadingServ.startLoading();

    modelEditorStatusStore.getState().clearSelectedItemsInfo();
    controlEnabledEditorServ.unselectAllVisualization();

    newSelected.forEach((variableId) => {
      const variable: ModelEditorVariable = {
        type: 'variable',
        id: variableId,
      };

      modelEditorStatusStore.getState().addSelectedItemInfo(variable);
      controlEnabledEditorServ.selectVariableVisualization(variableId, true);
    });

    loadingServ.endLoading();
  };

  const toggleVariableSelect = (variableId: number) => {
    loadingServ.startLoading();

    const variable: ModelEditorVariable = { type: 'variable', id: variableId };

    if (selectedVariablesIds.has(variableId)) {
      modelEditorStatusStore.getState().removeSelectedItemInfo(variable);
      controlEnabledEditorServ.selectVariableVisualization(variableId, false);
    } else {
      modelEditorStatusStore.getState().addSelectedItemInfo(variable);
      controlEnabledEditorServ.selectVariableVisualization(variableId, true);
    }

    loadingServ.endLoading();
  };

  const statusButtons = [
    {
      text: 'N',
      handleClick: () =>
        controlEnabledEditorServ.changeControlEnabledSelected(
          selectedVariablesIds,
          false
        ),
      buttonBgColor: 'var(--color-not-control-enabled)',
      buttonHoverColor: 'var(--color-not-control-enabled-highlight)',
      buttonTooltipFunction: (e: MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            pageStringProviderServ.Tooltips.changeVariableControlEnabled(false),
            true,
            -50,
            200
          ),
    },
    {
      text: 'E',
      handleClick: () =>
        controlEnabledEditorServ.changeControlEnabledSelected(
          selectedVariablesIds,
          true
        ),
      buttonBgColor: 'var(--color-control-enabled)',
      buttonHoverColor: 'var(--color-control-enabled-highlight)',
      buttonTooltipFunction: (e: MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            pageStringProviderServ.Tooltips.changeVariableControlEnabled(true),
            true,
            -50,
            150
          ),
    },
  ];

  return (
    <SearchTable<Variable>
      elements={variables}
      noRowsPlaceholder={'No Variables'}
      noRowsTextColor="var(--color-primary-text)"
      getSearchText={() => controlEnabledEditorServ.getVariableSearch()}
      setSearchText={(newText: string) =>
        controlEnabledEditorServ.setVariableSearch(newText)
      }
      searchPlaceholder={'Search variables...'}
      filterElements={(
        elements: Variable[],
        searchTerm: string
      ): Variable[] => {
        return searchAndFilterHelpersServ.filterVariablesBySearchTerms(
          elements,
          searchTerm
        );
      }}
      textInputTextColor="var(--color-secondary-text)"
      textInputColor="var(--color-secondary-text-inputs)"
      textInputBorderColor="var(--color-secondary-text-inputs-border)"
      buttons={statusButtons}
      selectionButtonsConfig={{
        buttonColor: 'var(--color-secondary-buttons)',
        buttonHoverColor: 'var(--color-secondary-buttons-hover)',
        selectedElementsIds: selectedVariablesIds,
        setSelectedElements: (newSelectedElements) => {
          updateSelectedVariables(newSelectedElements);
        },
        allElementIds: variableIds,
        selectionButtonsTooltips: pageStringProviderServ.Tooltips,
        helpHoverStore: helpHoverStore,
      }}
      renderRowsWithContainer={(variables: Variable[]): ReactNode => {
        return (
          <section className="flex flex-col min-h-[50px] h-auto max-h-[152px] md:max-h-[252px] xl:max-h-[352px] 2xl:max-h-[452px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1">
            {variables.map((variable: Variable) => {
              return (
                <VariableControlEnabledInfo
                  key={variable.id}
                  id={variable.id}
                  name={variable.name ?? 'Unknown Variable'}
                  hover={hoverVariableId === variable.id}
                  selected={selectedVariablesIds.has(variable.id) ?? false}
                  toggleSelect={toggleVariableSelect}
                  controlEnabledEditorServ={controlEnabledEditorServ}
                  messageServ={messageServ}
                  pageStringProviderServ={pageStringProviderServ}
                  controlStore={controlStore}
                  helpHoverStore={helpHoverStore}
                />
              );
            })}
          </section>
        );
      }}
      hideTooltipFunction={() => helpHoverStore.getState().clear()}
    />
  );
};

export default ControlVariablesTable;
