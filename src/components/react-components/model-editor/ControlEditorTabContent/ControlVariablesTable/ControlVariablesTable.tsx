import { useCallback, useEffect, useMemo, useState } from 'react';
import SearchAndFilterHelpers from '../../../../../services/utilities/SearchAndFilterHelpers';
import useVariablesStore from '../../../../../stores/LiveModel/VariablesStore/useVariablesStore';
import type { Variable } from '../../../../../types';
import { Loading } from '../../../../lit-components/loading-wrapper';
import SelectionButtons from '../../../global/SelectionButtons/SelectionButtons';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import TextInputReact from '../../../lit-wrappers/TextInputReact';
import type { ControlVariablesTableProps } from './ControlVariablesTableProps';
import VariableControlInfo from './VariableControlInfo/VariableControlInfo';

const ControlVariablesTable: React.FC<ControlVariablesTableProps> = ({
  controlEditorServ,
}) => {
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [variableSearchText, setVariableSearchText] = useState<string>(
    controlEditorServ.getVariableSearch()
  );
  const [selectedVariables, setSelectedVariables] = useState<
    Record<string, boolean>
  >(controlEditorServ.getSelectedVariables());

  const variablesObj = useVariablesStore((state) => state.variables);

  const variables = Object.values(variablesObj);

  const variableNames = useMemo(() => {
    return variables.map((variable) => variable.name ?? 'Unknown Variable');
  }, [variables]);

  const hoverVariableInfo = useCallback((id: number, turnOnHover: boolean) => {
    setHoverId(turnOnHover ? id : null);
  }, []);

  useEffect(() => {
    controlEditorServ.setHoverVariableFunction(hoverVariableInfo);
  }, [hoverVariableInfo]);

  const setVariableSearch = (name: string) => {
    if (name !== variableSearchText) {
      controlEditorServ.setVariableSearch(name);
      setVariableSearchText(name);
    }
  };

  const updateSelectedVariables = (newSelected: Record<string, boolean>) => {
    setSelectedVariables(newSelected);
    controlEditorServ.setSelectVariables(newSelected);
  };

  const toggleVariableSelect = (variableName: string) => {
    Loading.startLoading();
    updateSelectedVariables({
      ...selectedVariables,
      [variableName]: !selectedVariables[variableName],
    });
    Loading.endLoading();
  };

  const filteredVariables = useMemo(() => {
    return SearchAndFilterHelpers.filterVariablesBySearchTerms(
      variables,
      variableSearchText
    );
  }, [variables, variableSearchText]);

  /** Array of buttons for changing the Control-Enabled and Phenotype status of selected variables.
   * Each button is represented as a tuple containing:
   * - The button label (string)
   * - The button color (string)
   * - The onClick handler function (() => void)
   */
  const statusButtons: Array<[string, string, () => void]> = [
    [
      'N',
      'var(--color-grey)',
      () =>
        controlEditorServ.changeControlEnabledSelected(
          Object.entries(selectedVariables),
          false
        ),
    ],
    [
      'E',
      'var(--color-yellow)',
      () =>
        controlEditorServ.changeControlEnabledSelected(
          Object.entries(selectedVariables),
          true
        ),
    ],
    [
      'N',
      'var(--color-grey)',
      () =>
        controlEditorServ.changePhenotypeSelected(
          Object.entries(selectedVariables),
          null
        ),
    ],
    [
      'T',
      'var(--color-green)',
      () =>
        controlEditorServ.changePhenotypeSelected(
          Object.entries(selectedVariables),
          true
        ),
    ],
    [
      'F',
      'var(--color-red)',
      () =>
        controlEditorServ.changePhenotypeSelected(
          Object.entries(selectedVariables),
          false
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
          {statusButtons.map(([label, color, onClick], index) => (
            <TextButtonReact
              key={index}
              compHeight="29px"
              compWidth="29px"
              text={label}
              handleClick={onClick}
              buttonColor={color}
            />
          ))}
        </div>
        <SelectionButtons
          keys={variableNames}
          selectedVariables={selectedVariables}
          setSelectedVariables={(newSelected) =>
            updateSelectedVariables(newSelected)
          }
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
              hover={hoverId === variable.id}
              selected={selectedVariables[variable.name] ?? false}
              toggleSelect={toggleVariableSelect}
              controlEditorServ={controlEditorServ}
            />
          ))}
        </section>
      )}
    </section>
  );
};

export default ControlVariablesTable;
