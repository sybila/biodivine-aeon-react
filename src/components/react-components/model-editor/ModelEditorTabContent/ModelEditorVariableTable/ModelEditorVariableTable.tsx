import { useCallback, useEffect, useMemo, useState } from 'react';
import ModelEditor from '../../../../../services/model-editor/ModelEditor/ModelEditor';
import type { RegulationVariables, Variable } from '../../../../../types';
import type { ModelEditorVariableTableProps } from './ModelEditorVariableTableProps';
import useVariablesStore from '../../../../../stores/LiveModel/useVariablesStore';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import VariableInfo from './VariableInfo/VariableInfo';
import useModelEditorStatus from '../../../../../stores/ModelEditor/useModelEditorStatus';

const ModelEditorVariableTable: React.FC<ModelEditorVariableTableProps> = ({
  searchText,
}) => {
  const [hoverVariableId, setHoverVariableId] = useState<number | null>(null);
  const modelEditorState = useModelEditorStatus((state) => state);

  const [hoverRegulation, setHoverRegulation] =
    useState<RegulationVariables | null>(null);
  const [selectedRegulation, setSelectedRegulation] =
    useState<RegulationVariables | null>(null);

  const variablesObj = useVariablesStore((state) => state.variables);
  const variables = Object.values(variablesObj);

  const hoverVariableInfo = useCallback((id: number, turnOnHover: boolean) => {
    setHoverVariableId(turnOnHover ? id : null);
  }, []);

  const hoverRegulationInfo = useCallback(
    (regulation: RegulationVariables, turnOnHover: boolean) => {
      setHoverRegulation(turnOnHover ? regulation : null);
    },
    []
  );

  const selectRegulationInfo = useCallback(
    (regulation: RegulationVariables, select: boolean) => {
      setSelectedRegulation(select ? regulation : null);
    },
    []
  );

  useEffect(() => {
    ModelEditor.setHoverVariableFunction(hoverVariableInfo);
    ModelEditor.setSelectRegulationFunction(selectRegulationInfo);
    ModelEditor.setHoverRegulationFunction(hoverRegulationInfo);
  }, [hoverVariableInfo, hoverRegulationInfo, selectRegulationInfo]);

  const filterVariable = (variable: Variable) => {
    return (
      !searchText || searchText === '' || variable.name.startsWith(searchText)
    );
  };

  const filteredVariables = useMemo(() => {
    if (searchText === '') return variables;
    return variables.filter(filterVariable);
  }, [variables, searchText]);

  return !filteredVariables || filteredVariables.length === 0 ? (
    <section className="flex h-[200px] w-[98%] justify-center items-center">
      <SimpleHeaderReact headerText="No Variables" textFontWeight="normal" />
    </section>
  ) : (
    <section className="flex flex-col min-h-[50px] h-auto max-h-[100px] md:max-h-[200px] xl:max-h-[300px] 2xl:max-h-[400px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1">
      {filteredVariables.map((variable: Variable) => (
        <VariableInfo
          key={variable.id}
          {...variable}
          hoverVariable={hoverVariableId === variable.id}
          selectedVariable={
            modelEditorState.selectedItemInfo?.type === 'variable' &&
            modelEditorState.selectedItemInfo?.id === variable.id
          }
          hoverRegulation={
            hoverRegulation && hoverRegulation.target === variable.id
              ? hoverRegulation
              : undefined
          }
          selectedRegulation={
            selectedRegulation && selectedRegulation.target === variable.id
              ? selectedRegulation
              : undefined
          }
        />
      ))}
    </section>
  );
};

export default ModelEditorVariableTable;
