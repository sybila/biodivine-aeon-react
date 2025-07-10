import { LiveModel } from '../../../../services/global/LiveModel/LiveModel';
import type { ModelStats } from '../../../../types';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import StatEntryReact from '../../lit-wrappers/StatEntryReact';
import TextInputReact from '../../lit-wrappers/TextInputReact';

const ModelEditorTabContent: React.FC = () => {
  const insertStats = () => {
    const stats: ModelStats = LiveModel.Export.stats();

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

      <TextInputReact compWidth="95%" inputPlaceholder="Search variables..." onWrite={console.log}/>
    </div>
  );
};

export default ModelEditorTabContent;
