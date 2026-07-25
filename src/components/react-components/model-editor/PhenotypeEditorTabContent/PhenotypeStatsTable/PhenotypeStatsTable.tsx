import { useMemo } from 'react';
import type { PhenotypeStats } from '../../../../../types';
import StatEntryReact from '../../../lit-wrappers/StatEntryReact';
import type { PhenotypeStatsTableProps } from './PhenotypeStatsTableProps';

const PhenotypeStatsTable: React.FC<PhenotypeStatsTableProps> = ({
  controlStore,
}) => {
  const currentPhenotype = controlStore((state) => state.currentPhenotype);

  const stats: PhenotypeStats = useMemo(
    () => controlStore.getState().getPhenotypeStats(),
    [currentPhenotype]
  );

  const insertStats = () => {
    const statCells = [
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

export default PhenotypeStatsTable;
