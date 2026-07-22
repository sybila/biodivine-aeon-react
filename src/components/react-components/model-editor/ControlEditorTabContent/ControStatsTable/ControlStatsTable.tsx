import { useMemo } from 'react';
import type { ControlStats } from '../../../../../types';
import StatEntryReact from '../../../lit-wrappers/StatEntryReact';
import type { ControlStatsTableProps } from './ControlStatsTableProps';

const ControlStatsTable: React.FC<ControlStatsTableProps> = ({
  liveModelServ,
  controlStore,
}) => {
  const controlEnabled = controlStore((state) => state.controlEnabled);
  const currentPhenotype = controlStore((state) => state.currentPhenotype);

  const stats: ControlStats = useMemo(
    () => liveModelServ.Control.getControlStats(),
    [controlEnabled, currentPhenotype]
  );

  const insertStats = () => {
    const statCells = [
      ['Control-Enabled', stats.controlEnabled.toString()],
      ['Not-Control-Enabled', stats.notControlEnabled.toString()],
      ['Phenotype - True', stats.inPhenotypeTrue.toString()],
      ['Phenotype - False', stats.inPhenotypeFalse.toString()],
      ['Not in Phenotype', stats.notInPhenotype.toString()],
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

export default ControlStatsTable;
