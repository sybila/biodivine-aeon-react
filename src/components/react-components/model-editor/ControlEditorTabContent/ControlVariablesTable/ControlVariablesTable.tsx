import { useCallback, useEffect, useMemo, useState } from 'react';
import ControlEditor from '../../../../../services/model-editor/ControlEditor/CotrolEditor';
import type { ControlVariablesTableProps } from './ControlVariablesTableProps';
import useVariablesStore from '../../../../../stores/LiveModel/useVariablesStore';
import type { Variable } from '../../../../../types';
import VariableControlInfo from './VariableControlInfo/VariableControlInfo';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';

const ControlVariablesTable: React.FC<ControlVariablesTableProps> = ({
  searchText,
}) => {
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(
    ControlEditor.getSelectedVariableId()
  );

  const variablesObj = useVariablesStore((state) => state.variables);
  const variables = Object.values(variablesObj);

  const hoverVariableInfo = useCallback((id: number, turnOnHover: boolean) => {
    setHoverId(turnOnHover ? id : null);
  }, []);

  const selectVariableInfo = useCallback((id: number, select: boolean) => {
    setSelectedId(select ? id : null);
  }, []);

  useEffect(() => {
    ControlEditor.setSelectVariableFunction(selectVariableInfo);
    ControlEditor.setHoverVariableFunction(hoverVariableInfo);
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

  if (!filteredVariables || filteredVariables.length === 0) {
    return (
      <section className="flex h-[200px] w-[98%] justify-center items-center">
        <SimpleHeaderReact headerText="No Variables" textFontWeight="normal" />
      </section>
    );
  }

  return (
    <section className="flex flex-col min-h-[50px] h-auto max-h-[100px] md:max-h-[200px] xl:max-h-[300px] 2xl:max-h-[400px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1">
      {filteredVariables.map((variable: Variable) => (
        <VariableControlInfo
          key={variable.id}
          id={variable.id}
          name={variable.name ?? 'Unknown Variable'}
          hover={hoverId === variable.id}
          selected={selectedId === variable.id}
          handleMouseEnter={() => hoverVariableInfo(variable.id, true)}
          handleMouseLeave={() => hoverVariableInfo(variable.id, false)}
        />
      ))}
    </section>
  );
};

export default ControlVariablesTable;
