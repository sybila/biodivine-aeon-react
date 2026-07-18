import { useMemo } from 'react';
import type { ModelStats } from '../../../../../types';
import StatEntryReact from '../../../lit-wrappers/StatEntryReact';
import type { ModelStatsTableProps } from './ModelStatsTableProps';

const ModelStatsTable: React.FC<ModelStatsTableProps> = ({
  modelEditorServ,
  regulationsStore,
  updateFunctionsStore,
  variablesStore,
}) => {
  const variablesObj = variablesStore((state) => state.variables);
  const updateFunctions = updateFunctionsStore(
    (state) => state.updateFunctions
  );
  const regulationsObj = regulationsStore((state) => state.regulations);

  const stats: ModelStats = useMemo(() => {
    return modelEditorServ.getModelStats();
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
            contBgColor="var(--color-secondary-darker)"
            textColor="var(--color-secondary-text)"
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
