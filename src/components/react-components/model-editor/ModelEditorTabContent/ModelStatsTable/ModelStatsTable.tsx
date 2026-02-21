import { useMemo } from 'react';
import ModelEditor from '../../../../../services/model-editor/ModelEditor/ModelEditor';
import useRegulationsStore from '../../../../../stores/LiveModel/RegulationsStore/useRegulationsStore';
import useUpdateFunctionsStore from '../../../../../stores/LiveModel/useUpdateFunctionsStore';
import useVariablesStore from '../../../../../stores/LiveModel/VariablesStore/useVariablesStore';
import type { ModelStats } from '../../../../../types';
import StatEntryReact from '../../../lit-wrappers/StatEntryReact';

const ModelStatsTable: React.FC = () => {
  const variablesObj = useVariablesStore((state) => state.variables);
  const updateFunctions = useUpdateFunctionsStore(
    (state) => state.updateFunctions
  );
  const regulationsObj = useRegulationsStore((state) => state.regulations);

  const stats: ModelStats = useMemo(() => {
    return ModelEditor.getModelStats();
  }, [variablesObj, updateFunctions, regulationsObj]);

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

  return insertStats();
};

export default ModelStatsTable;
