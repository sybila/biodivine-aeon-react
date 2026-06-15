import { useMemo, useState } from 'react';
import type {
  ModelEditorVariable,
  Variable,
  VariableIdSet,
} from '../../../../../types';
import SelectionButtons from '../../../global/SelectionButtons/SelectionButtons';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import TextInputReact from '../../../lit-wrappers/TextInputReact';
import type { ControlVariablesTableProps } from './ControlVariablesTableProps';
import VariableControlInfo from './VariableControlInfo/VariableControlInfo';

const ControlVariablesTable: React.FC<ControlVariablesTableProps> = ({
  controlEditorServ,
  searchAndFilterHelpersServ,
  stringProviderServ,
  loadingServ,

  variablesStore,
  controlStore,
  modelEditorStatusStore,
  helpHoverStore,
}) => {
  const [variableSearchText, setVariableSearchText] = useState<string>(
    controlEditorServ.getVariableSearch()
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
      controlEditorServ.setVariableSearch(name);
      setVariableSearchText(name);
    }
  };

  const updateSelectedVariables = (newSelected: Set<number>) => {
    loadingServ.startLoading();

    modelEditorStatusStore.getState().clearSelectedItemsInfo();
    controlEditorServ.unselectAllVisualization();

    newSelected.forEach((variableId) => {
      const variable: ModelEditorVariable = {
        type: 'variable',
        id: variableId,
      };

      modelEditorStatusStore.getState().addSelectedItemInfo(variable);
      controlEditorServ.selectVariableVisualization(variableId, true);
    });

    loadingServ.endLoading();
  };

  const toggleVariableSelect = (variableId: number) => {
    loadingServ.startLoading();

    const variable: ModelEditorVariable = { type: 'variable', id: variableId };

    if (selectedVariables.has(variableId)) {
      modelEditorStatusStore.getState().removeSelectedItemInfo(variable);
      controlEditorServ.selectVariableVisualization(variableId, false);
    } else {
      modelEditorStatusStore.getState().addSelectedItemInfo(variable);
      controlEditorServ.selectVariableVisualization(variableId, true);
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
    [string, string, () => void, (e: React.MouseEvent) => void]
  > = [
    [
      'N',
      'var(--color-grey)',
      () =>
        controlEditorServ.changeControlEnabledSelected(
          selectedVariables,
          false
        ),
      (e: React.MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e.nativeEvent,
            stringProviderServ.ToolTips.ModelEditorTooltips.changeVariableControlEnabled(
              false
            ),
            true,
            -50,
            200
          ),
    ],
    [
      'E',
      'var(--color-yellow)',
      () =>
        controlEditorServ.changeControlEnabledSelected(selectedVariables, true),
      (e: React.MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e.nativeEvent,
            stringProviderServ.ToolTips.ModelEditorTooltips.changeVariableControlEnabled(
              true
            ),
            true,
            -50,
            150
          ),
    ],
    [
      'N',
      'var(--color-grey)',
      () => controlEditorServ.changePhenotypeSelected(selectedVariables, null),
      (e: React.MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e.nativeEvent,
            stringProviderServ.ToolTips.ModelEditorTooltips.removeVariableFromPhenotype(),
            true,
            -50,
            20
          ),
    ],
    [
      'T',
      'var(--color-green)',
      () => controlEditorServ.changePhenotypeSelected(selectedVariables, true),
      (e: React.MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e.nativeEvent,
            stringProviderServ.ToolTips.ModelEditorTooltips.changeVariablePhenotype(
              'true'
            ),
            true,
            -50
          ),
    ],
    [
      'F',
      'var(--color-red)',
      () => controlEditorServ.changePhenotypeSelected(selectedVariables, false),
      (e: React.MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e.nativeEvent,
            stringProviderServ.ToolTips.ModelEditorTooltips.changeVariablePhenotype(
              'false'
            ),
            true,
            -50
          ),
    ],
  ];

  return (
    <section className="flex flex-col items-center w-full h-fit gap-1 mb-3">
      <TextInputReact
        compWidth="95%"
        placeholder="Search variables..."
        onWrite={setVariableSearch}
        value={variableSearchText}
      />

      <section className="flex flex-row justify-between items-center h-[50px] w-[94%]">
        <div className="flex flex-row gap-2 h-full max-w-[50%] items-center justify-start">
          {statusButtons.map(([label, color, onClick, onMouseEnter], index) => (
            <TextButtonReact
              key={index}
              compHeight="29px"
              compWidth="29px"
              text={label}
              handleClick={onClick}
              buttonColor={color}
              onMouseEnter={onMouseEnter}
              onMouseLeave={() => helpHoverStore.getState().clear()}
            />
          ))}
        </div>
        <SelectionButtons<number>
          keys={variableIds}
          selectedVariables={selectedVariables}
          setSelectedVariables={(newSelected) =>
            updateSelectedVariables(newSelected)
          }
          stringProviderServ={stringProviderServ}
          helpHoverStore={helpHoverStore}
        />
      </section>

      {!filteredVariables || filteredVariables.length === 0 ? (
        <section className="flex h-[200px] w-[98%] justify-center items-center">
          <SimpleHeaderReact
            headerText="No Variables"
            textFontWeight="normal"
          />
        </section>
      ) : (
        <section className="flex flex-col min-h-[50px] h-auto max-h-[152px] md:max-h-[252px] xl:max-h-[352px] 2xl:max-h-[452px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1">
          {filteredVariables.map((variable: Variable) => (
            <VariableControlInfo
              key={variable.id}
              id={variable.id}
              name={variable.name ?? 'Unknown Variable'}
              hover={hoverVariableId === variable.id}
              selected={selectedVariables.has(variable.id) ?? false}
              toggleSelect={toggleVariableSelect}
              controlEditorServ={controlEditorServ}
              stringProviderServ={stringProviderServ}
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
