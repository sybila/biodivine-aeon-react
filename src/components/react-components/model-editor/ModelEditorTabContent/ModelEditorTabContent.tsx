import { useCallback, useEffect, useState } from 'react';
import ModelEditor from '../../../../services/model-editor/ModelEditor/ModelEditor';
import type { ModelStats, Variable } from '../../../../types';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import StatEntryReact from '../../lit-wrappers/StatEntryReact';
import TextInputReact from '../../lit-wrappers/TextInputReact';
import VariableInfo from './VariableInfo/VariableInfo';
import { useMemo } from 'react';

const ModelEditorTabContent: React.FC = () => {
  const [variables, setVariables] = useState<Variable[]>(
    ModelEditor.getAllVariables()
  );
  const [stats, setStats] = useState<ModelStats>(ModelEditor.getModelStats());
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(
    ModelEditor.getSelectedVariableId()
  );
  const [variableSearchText, setVariableSearchText] = useState<string>(
    ModelEditor.getVariableSearch()
  );

  const reloadComponent = useCallback(() => {
    setStats(ModelEditor.getModelStats());
    setVariables(ModelEditor.getAllVariables());
  }, []);

  const hoverVariableInfo = useCallback((id: number, turnOnHover: boolean) => {
    setHoverId(turnOnHover ? id : null);
  }, []);

  const selectVariableInfo = useCallback((id: number, select: boolean) => {
    setSelectedId(select ? id : null);
  }, []);

  useEffect(() => {
    ModelEditor.setSelectVariableFunction(selectVariableInfo);
    ModelEditor.setHoverVariableFunction(hoverVariableInfo);
    ModelEditor.setReloadFunction(reloadComponent);
  }, [hoverVariableInfo, reloadComponent, selectVariableInfo]);

  const setVariableSearch = (name: string) => {
    if (name !== variableSearchText) {
      ModelEditor.setVariableSearch(name);
      setVariableSearchText(name);
    }
  };

  const filterVariable = (variable: Variable) => {
    return (
      variableSearchText === '' || variable.name.startsWith(variableSearchText)
    );
  };

  const filteredVariables = useMemo(() => {
    if (variableSearchText === '') return variables;
    return variables.filter(filterVariable);
  }, [variables, variableSearchText]);

  const insertVariables = () => {
    if (!filteredVariables || filteredVariables.length === 0) {
      return (
        <section className="flex h-[200px] w-[98%] justify-center items-center">
          <SimpleHeaderReact
            headerText="No Variables"
            textFontWeight="normal"
          />
        </section>
      );
    }

    return (
      <section className="flex flex-col min-h-[50px] h-auto max-h-[400px] overflow-auto w-[98%] gap-1">
        {filteredVariables.map((variable: Variable) => (
          <VariableInfo
            key={variable.id}
            {...variable}
            hover={hoverId === variable.id}
            selected={selectedId === variable.id}
          />
        ))}
      </section>
    );
  };

  const insertStats = () => {
    const statCells = [
      ['Variables', stats.variableCount.toString()],
      ['Regulations', stats.regulationCount.toString()],
      ['Max. in-degree', stats.maxInDegree.toString()],
      ['Parameter space size', '2^' + stats.parameterVariables],
      ['State space size', '2^' + stats.variableCount],
      ['Max. out-degree', stats.maxOutDegree.toString()],
      [
        'Explicit parameters',
        stats.explicitParameters.length === 0
          ? '(none)'
          : stats.explicitParameters.join(', '),
      ],
    ];

    return (
      <section className="flex flex-col justify-center items-start w-[94%] h-fit gap-0.5">
        {statCells.map(([name, value]) => (
          <StatEntryReact
            key={name}
            compHeight="100%"
            compWidth="100%"
            statName={name}
            statValue={value}
            addColon={true}
          />
        ))}{' '}
      </section>
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      <section className="flex flex-col items-center w-full h-fit gap-1">
        <DotHeaderReact
          compWidth="100%"
          headerText="Overview"
          justifyHeader="start"
        />

        {insertStats()}
      </section>

      <section className="flex flex-row items-around w-full h-fit gap-1">
        <DotHeaderReact
          compWidth="50%"
          headerText="Variables"
          justifyHeader="start"
        />
      </section>

      <TextInputReact
        compWidth="95%"
        placeholder="Search variables..."
        onWrite={setVariableSearch}
        value={variableSearchText}
      />

      {insertVariables()}
    </div>
  );
};

export default ModelEditorTabContent;
