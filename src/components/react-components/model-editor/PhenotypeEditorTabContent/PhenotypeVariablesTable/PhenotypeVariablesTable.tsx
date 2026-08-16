import { useMemo, type ReactNode } from 'react';
import {
  PHENOTYPE_STATUS,
  type ModelEditorVariable,
  type Variable,
  type VariableIdSet,
} from '../../../../../types';
import SearchTable from '../../../global/SearchTable/SearchTable';
import type { PhenotypeVariablesTableProps } from './PhenotypeVariablesTableProps';
import VariablePhenotypeInfo from './VariablePhenotypeInfo/VariablePhenotypeInfo';

const PhenotypeVariablesTable: React.FC<PhenotypeVariablesTableProps> = ({
  phenotypeEditorServ,
  searchAndFilterHelpersServ,
  pageStringProviderServ,
  loadingServ,

  variablesStore,
  controlStore,
  modelEditorStatusStore,
  helpHoverStore,
}) => {
  const selectedVariablesIds: VariableIdSet =
    modelEditorStatusStore((state) => state.selectedItemsInfo.variables) ??
    new Set();

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
    phenotypeEditorServ.unselectAllVisualization();

    newSelected.forEach((variableId) => {
      const variable: ModelEditorVariable = {
        type: 'variable',
        id: variableId,
      };

      modelEditorStatusStore.getState().addSelectedItemInfo(variable);
      phenotypeEditorServ.selectVariableVisualization(variableId, true);
    });

    loadingServ.endLoading();
  };

  const toggleVariableSelect = (variableId: number) => {
    loadingServ.startLoading();

    const variable: ModelEditorVariable = { type: 'variable', id: variableId };

    if (selectedVariablesIds.has(variableId)) {
      modelEditorStatusStore.getState().removeSelectedItemInfo(variable);
      phenotypeEditorServ.selectVariableVisualization(variableId, false);
    } else {
      modelEditorStatusStore.getState().addSelectedItemInfo(variable);
      phenotypeEditorServ.selectVariableVisualization(variableId, true);
    }

    loadingServ.endLoading();
  };

  const statusButtons = [
    {
      text: 'N',
      handleClick: () =>
        phenotypeEditorServ.changePhenotypeSelected(
          selectedVariablesIds,
          PHENOTYPE_STATUS.NotInPhenotype
        ),
      buttonBgColor: 'var(--color-not-in-phenotype)',
      buttonHoverColor: 'var(--color-not-in-phenotype-highlight)',
      buttonTooltipFunction: (e: MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            pageStringProviderServ.Tooltips.removeVariableFromPhenotype(),
            true,
            -50,
            20
          ),
    },
    {
      text: 'T',
      handleClick: () =>
        phenotypeEditorServ.changePhenotypeSelected(
          selectedVariablesIds,
          PHENOTYPE_STATUS.InPhenotypeTrue
        ),
      buttonBgColor: 'var(--color-in-phenotype-true)',
      buttonHoverColor: 'var(--color-in-phenotype-true-highlight)',
      buttonTooltipFunction: (e: MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            pageStringProviderServ.Tooltips.changeVariablePhenotype('true'),
            true,
            -50
          ),
    },
    {
      text: 'F',
      handleClick: () =>
        phenotypeEditorServ.changePhenotypeSelected(
          selectedVariablesIds,
          PHENOTYPE_STATUS.InPhenotypeFalse
        ),
      buttonBgColor: 'var(--color-in-phenotype-false)',
      buttonHoverColor: 'var(--color-in-phenotype-false-highlight)',
      buttonTooltipFunction: (e: MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            pageStringProviderServ.Tooltips.changeVariablePhenotype('false'),
            true,
            -50
          ),
    },
  ];

  return (
    <section className="flex flex-col items-center w-full h-fit gap-1 mb-3">
      <SearchTable<Variable>
        elements={variables}
        noRowsPlaceholder={'No Variables'}
        noRowsTextColor="var(--color-secondary-text)"
        getSearchText={() => phenotypeEditorServ.getVariableSearch()}
        setSearchText={(newText: string) =>
          phenotypeEditorServ.setVariableSearch(newText)
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
        textInputTextColor="var(--color-tertiary-text)"
        textInputColor="var(--color-tertiary-text-inputs)"
        textInputBorderColor="var(--color-tertiary-text-inputs-border)"
        buttons={statusButtons}
        selectionButtonsConfig={{
          buttonColor: 'var(--color-tertiary-buttons)',
          buttonHoverColor: 'var(--color-tertiary-buttons-hover)',
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
              {variables.map((variable: Variable) => (
                <VariablePhenotypeInfo
                  key={variable.id}
                  id={variable.id}
                  name={variable.name ?? 'Unknown Variable'}
                  hover={hoverVariableId === variable.id}
                  selected={selectedVariablesIds.has(variable.id) ?? false}
                  toggleSelect={toggleVariableSelect}
                  phenotypeEditorServ={phenotypeEditorServ}
                  pageStringProviderServ={pageStringProviderServ}
                  controlStore={controlStore}
                  helpHoverStore={helpHoverStore}
                />
              ))}
            </section>
          );
        }}
        hideTooltipFunction={() => helpHoverStore.getState().clear()}
      />
    </section>
  );
};

export default PhenotypeVariablesTable;
