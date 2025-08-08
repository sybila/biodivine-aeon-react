import { useCallback, useEffect, useMemo, useState } from 'react';
import ModelEditor from '../../../../../services/model-editor/ModelEditor/ModelEditor';
import type { Variable } from '../../../../../types';
import type { ModelEditorVariableTableProps } from './ModelEditorVariableTableProps';
import useVariablesStore from '../../../../../stores/LiveModel/useVariablesStore';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import VariableInfo from './VariableInfo/VariableInfo';

const ModelEditorVariableTable: React.FC<ModelEditorVariableTableProps> = ({
  searchText,
}) => {
  const [hoverVariableId, setHoverVariableId] = useState<number | null>(null);
  const [selectedVariableId, setSelectedVariableId] = useState<number | null>(
    ModelEditor.getSelectedVariableId()
  );

  const variablesObj = useVariablesStore((state) => state.variables);
  const variables = Object.values(variablesObj);

  const hoverVariableInfo = useCallback((id: number, turnOnHover: boolean) => {
    setHoverVariableId(turnOnHover ? id : null);
  }, []);

  const selectVariableInfo = useCallback((id: number, select: boolean) => {
    setSelectedVariableId(select ? id : null);
  }, []);

  useEffect(() => {
    ModelEditor.setSelectVariableFunction(selectVariableInfo);
    ModelEditor.setHoverVariableFunction(hoverVariableInfo);
  }, [hoverVariableInfo, selectVariableInfo]);

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
          hover={hoverVariableId === variable.id}
          selected={selectedVariableId === variable.id}
        />
      ))}
    </section>
  );
};

export default ModelEditorVariableTable;
