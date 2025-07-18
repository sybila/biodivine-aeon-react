import { useEffect, useState } from 'react';
import ModelEditor from '../../../../services/model-editor/ModelEditor/ModelEditor';
import type { ModelStats, Variable } from '../../../../types';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import StatEntryReact from '../../lit-wrappers/StatEntryReact';
import TextInputReact from '../../lit-wrappers/TextInputReact';
import VariableInfo from '../VariableInfo/VariableInfo';

const ModelEditorTabContent: React.FC = () => {
  const [variables, setVariables] = useState<Variable[]>(
    ModelEditor.getAllVariables()
  );
  const [stats, setStats] = useState<ModelStats>(ModelEditor.getModelStats());
  const [hoverId, setHoverId] = useState<number | null>(null);

  const reloadComponent = () => {
    setStats(ModelEditor.getModelStats());
    setVariables(ModelEditor.getAllVariables());
  };

  const hoverVariableInfo = (id: number, turnOnHover: boolean) => {
    setHoverId(turnOnHover ? id : null);
  };

  useEffect(() => {
    ModelEditor.setHoverVariableFunction(hoverVariableInfo);
    ModelEditor.setReloadFunction(reloadComponent);
  }, []);

  const searchVariable = (varName: string) => {
    const tempVars: Variable[] = ModelEditor.getAllVariables();

    if (varName === '') {
      setVariables(tempVars);
    } else {
      setVariables(
        tempVars.filter((variable: Variable) =>
          variable.name.startsWith(varName)
        )
      );
    }
  };

  const insertVariables = () => {
    if (!variables || variables.length === 0) {
      return (
        <section className="flex h-[200px] w-[98%] justify-center items-center">
          <SimpleHeaderReact headerText="No Variables" textFontWeight='normal'></SimpleHeaderReact>
        </section>
      );
    }

    return (
      <section className="flex flex-col min-h-[50px] h-auto max-h-[400px] overflow-auto w-[98%] gap-1">
        {variables.map((variable: Variable) => (
          <VariableInfo
            key={variable.id}
            {...variable}
            hover={hoverId === variable.id}
          ></VariableInfo>
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
        inputPlaceholder="Search variables..."
        onWrite={searchVariable}
      />

      {insertVariables()}
    </div>
  );
};

export default ModelEditorTabContent;
