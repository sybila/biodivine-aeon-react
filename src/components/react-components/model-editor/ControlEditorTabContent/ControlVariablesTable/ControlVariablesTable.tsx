import { useCallback, useEffect, useMemo, useState } from 'react';
import ControlEditor from '../../../../../services/model-editor/ControlEditor/ControlEditor';
import type { ControlVariablesTableProps } from './ControlVariablesTableProps';
import useVariablesStore from '../../../../../stores/LiveModel/useVariablesStore';
import type { Variable } from '../../../../../types';
import VariableControlInfo from './VariableControlInfo/VariableControlInfo';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import { Loading } from '../../../../lit-components/loading-wrapper';

const ControlVariablesTable: React.FC<ControlVariablesTableProps> = ({
  searchText,
  selectedVariables,
  setSelectedVariables,
}) => {
  const [hoverId, setHoverId] = useState<number | null>(null);

  const variablesObj = useVariablesStore((state) => state.variables);
  const variables = Object.values(variablesObj);

  const hoverVariableInfo = useCallback((id: number, turnOnHover: boolean) => {
    setHoverId(turnOnHover ? id : null);
  }, []);

  const toggleVariableSelect = (variableId: number) => {
    Loading.startLoading();
    setSelectedVariables({
      ...selectedVariables,
      [variableId]: !selectedVariables[variableId],
    });
    Loading.endLoading();
  };

  useEffect(() => {
    ControlEditor.setHoverVariableFunction(hoverVariableInfo);
  }, [hoverVariableInfo]);

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
    <section className="flex flex-col min-h-[50px] h-auto max-h-[152px] md:max-h-[252px] xl:max-h-[352px] 2xl:max-h-[452px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1">
      {filteredVariables.map((variable: Variable) => (
        <VariableControlInfo
          key={variable.id}
          id={variable.id}
          name={variable.name ?? 'Unknown Variable'}
          hover={hoverId === variable.id}
          selected={selectedVariables[variable.id] ?? false}
          toggleSelect={toggleVariableSelect}
        />
      ))}
    </section>
  );
};

export default ControlVariablesTable;
