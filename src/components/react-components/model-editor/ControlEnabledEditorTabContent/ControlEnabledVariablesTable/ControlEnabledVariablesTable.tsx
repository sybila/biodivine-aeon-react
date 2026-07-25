import { useMemo, useState } from 'react';
import {
  type ModelEditorVariable,
  type Variable,
  type VariableIdSet,
} from '../../../../../types';
import SelectionButtons from '../../../global/SelectionButtons/SelectionButtons';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import TextInputReact from '../../../lit-wrappers/TextInputReact';
import type { ControlEnabledVariablesTableProps } from './ControlEnabledVariablesTableProps';
import VariableControlEnabledInfo from './VariableControlEnabledInfo/VariableControlEnabledInfo';

const ControlVariablesTable: React.FC<ControlEnabledVariablesTableProps> = ({
  controlEnabledEditorServ,
  searchAndFilterHelpersServ,
  pageStringProviderServ,
  loadingServ,

  variablesStore,
  controlStore,
  modelEditorStatusStore,
  helpHoverStore,
}) => {
  const [variableSearchText, setVariableSearchText] = useState<string>(
    controlEnabledEditorServ.getVariableSearch()
  );

  const selectedVariables: VariableIdSet =
    modelEditorStatusStore((state) => state.selectedItemsInfo.variables) ??
    new Set();

  const variablesObj = variablesStore((state) => state.variables);

  const variables = Object.values(variablesObj);

  const variableIds = useMemo(() => {
    return variables
      .map((variable) => variable.id ?? -1)
      .filter((id) => id !== -1);
  }, [variables]);

  const hoverVariableId = modelEditorStatusStore((state) =>
    state.hoverItemInfo?.type === 'variable' ? state.hoverItemInfo.id : null
  );

  const setVariableSearch = (name: string) => {
    if (name !== variableSearchText) {
      controlEnabledEditorServ.setVariableSearch(name);
      setVariableSearchText(name);
    }
  };

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

    if (selectedVariables.has(variableId)) {
      modelEditorStatusStore.getState().removeSelectedItemInfo(variable);
      controlEnabledEditorServ.selectVariableVisualization(variableId, false);
    } else {
      modelEditorStatusStore.getState().addSelectedItemInfo(variable);
      controlEnabledEditorServ.selectVariableVisualization(variableId, true);
    }

    loadingServ.endLoading();
  };

  const filteredVariables = useMemo(() => {
    return searchAndFilterHelpersServ.filterVariablesBySearchTerms(
      variables,
      variableSearchText
    );
  }, [variables, variableSearchText]);

  /** Array of buttons for changing the Control-Enabled and Phenotype status of selected variables.
   * Each button is represented as a tuple containing:
   * - The button label (string)
   * - The button color (string)
   * - The onClick handler function (() => void)
   * - The onMouseEnter handler function ((e: React.MouseEvent) => void)
   */
  const statusButtons: Array<
    [string, string, string, () => void, (e: React.MouseEvent) => void]
  > = [
    [
      'N',
      'var(--color-not-control-enabled)',
      'var(--color-not-control-enabled-highlight)',
      () =>
        controlEnabledEditorServ.changeControlEnabledSelected(
          selectedVariables,
          false
        ),
      (e: React.MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e.nativeEvent,
            pageStringProviderServ.Tooltips.changeVariableControlEnabled(false),
            true,
            -50,
            200
          ),
    ],
    [
      'E',
      'var(--color-control-enabled)',
      'var(--color-control-enabled-highlight)',
      () =>
        controlEnabledEditorServ.changeControlEnabledSelected(
          selectedVariables,
          true
        ),
      (e: React.MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e.nativeEvent,
            pageStringProviderServ.Tooltips.changeVariableControlEnabled(true),
            true,
            -50,
            150
          ),
    ],
  ];

  return (
    <section className="flex flex-col items-center w-full h-fit gap-1 mb-3">
      <TextInputReact
        textColor="var(--color-secondary-text)"
        inputColor="var(--color-secondary-text-inputs)"
        inputBorderColor="var(--color-secondary-text-inputs-border)"
        compWidth="95%"
        placeholder="Search variables..."
        onWrite={setVariableSearch}
        value={variableSearchText}
      />

      <section className="flex flex-row justify-between items-center h-[50px] w-[94%]">
        <div className="flex flex-row gap-2 h-full max-w-[50%] items-center justify-start">
          {statusButtons.map(
            ([label, color, hoverColor, onClick, onMouseEnter], index) => (
              <TextButtonReact
                textColor="var(--color-secondary-text)"
                key={index}
                compHeight="29px"
                compWidth="29px"
                text={label}
                handleClick={onClick}
                buttonColor={color}
                buttonHoverColor={hoverColor}
                onMouseEnter={onMouseEnter}
                onMouseLeave={() => helpHoverStore.getState().clear()}
              />
            )
          )}
        </div>
        <SelectionButtons<number>
          keys={variableIds}
          selectedVariables={selectedVariables}
          setSelectedVariables={(newSelected) =>
            updateSelectedVariables(newSelected)
          }
          tooltips={pageStringProviderServ.Tooltips}
          helpHoverStore={helpHoverStore}
        />
      </section>

      {!filteredVariables || filteredVariables.length === 0 ? (
        <section className="flex h-[200px] w-[98%] justify-center items-center">
          <SimpleHeaderReact
            textColor="var(--color-primary-text)"
            headerText="No Variables"
            textFontWeight="normal"
          />
        </section>
      ) : (
        <section className="flex flex-col min-h-[50px] h-auto max-h-[152px] md:max-h-[252px] xl:max-h-[352px] 2xl:max-h-[452px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1">
          {filteredVariables.map((variable: Variable) => (
            <VariableControlEnabledInfo
              key={variable.id}
              id={variable.id}
              name={variable.name ?? 'Unknown Variable'}
              hover={hoverVariableId === variable.id}
              selected={selectedVariables.has(variable.id) ?? false}
              toggleSelect={toggleVariableSelect}
              controlEnabledEditorServ={controlEnabledEditorServ}
              pageStringProviderServ={pageStringProviderServ}
              controlStore={controlStore}
              helpHoverStore={helpHoverStore}
            />
          ))}
        </section>
      )}
    </section>
  );
};

export default ControlVariablesTable;
