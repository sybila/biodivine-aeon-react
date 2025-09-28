import { useCallback, useEffect, useMemo, useState } from 'react';
import ControlEditor from '../../../../../services/model-editor/ControlEditor/ControlEditor';
import useVariablesStore from '../../../../../stores/LiveModel/useVariablesStore';
import type { Variable } from '../../../../../types';
import VariableControlInfo from './VariableControlInfo/VariableControlInfo';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import { Loading } from '../../../../lit-components/loading-wrapper';
import TextInputReact from '../../../lit-wrappers/TextInputReact';
import SelectionButtons from '../../../global/SelectionButtons/SelectionButtons';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';

const ControlVariablesTable: React.FC = () => {
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [variableSearchText, setVariableSearchText] = useState<string>(
    ControlEditor.getVariableSearch()
  );
  const [selectedVariables, setSelectedVariables] = useState<
    Record<string, boolean>
  >(ControlEditor.getSelectedVariables());

  const variablesObj = useVariablesStore((state) => state.variables);

  const variables = Object.values(variablesObj);

  const variableNames = useMemo(() => {
    return variables.map((variable) => variable.name ?? 'Unknown Variable');
  }, [variables]);

  const hoverVariableInfo = useCallback((id: number, turnOnHover: boolean) => {
    setHoverId(turnOnHover ? id : null);
  }, []);

  useEffect(() => {
    ControlEditor.setHoverVariableFunction(hoverVariableInfo);
  }, [hoverVariableInfo]);

  const setVariableSearch = (name: string) => {
    if (name !== variableSearchText) {
      ControlEditor.setVariableSearch(name);
      setVariableSearchText(name);
    }
  };

  const updateSelectedVariables = (newSelected: Record<string, boolean>) => {
    setSelectedVariables(newSelected);
    ControlEditor.setSelectVariables(newSelected);
  };

  const toggleVariableSelect = (variableName: string) => {
    Loading.startLoading();
    updateSelectedVariables({
      ...selectedVariables,
      [variableName]: !selectedVariables[variableName],
    });
    Loading.endLoading();
  };

  const filterVariable = (variable: Variable) => {
    return (
      !variableSearchText ||
      variableSearchText === '' ||
      variable.name.startsWith(variableSearchText)
    );
  };

  const filteredVariables = useMemo(() => {
    if (variableSearchText === '') return variables;
    return variables.filter(filterVariable);
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
        ControlEditor.changeControlEnabledSelected(
          Object.entries(selectedVariables),
          false
        ),
    ],
    [
      'E',
      'var(--color-yellow)',
      () =>
        ControlEditor.changeControlEnabledSelected(
          Object.entries(selectedVariables),
          true
        ),
    ],
    [
      'N',
      'var(--color-grey)',
      () =>
        ControlEditor.changePhenotypeSelected(
          Object.entries(selectedVariables),
          null
        ),
    ],
    [
      'T',
      'var(--color-green)',
      () =>
        ControlEditor.changePhenotypeSelected(
          Object.entries(selectedVariables),
          true
        ),
    ],
    [
      'F',
      'var(--color-red)',
      () =>
        ControlEditor.changePhenotypeSelected(
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
            />
          ))}
        </section>
      )}
    </section>
  );
};

export default ControlVariablesTable;
