import { useMemo } from 'react';
import StatEntryReact from '../../../lit-wrappers/StatEntryReact';
import type { ControlInfo, ControlStats } from '../../../../../types';
import useControlStore from '../../../../../stores/LiveModel/useControlStore';
import { LiveModel } from '../../../../../services/global/LiveModel/LiveModel';

const ControlStatsTable: React.FC = () => {
  const controlInfo: Record<number, ControlInfo> = useControlStore(
    (state) => state.controlInfo
  );

  const stats: ControlStats = useMemo(
    () => LiveModel.Control.getControlStats(),
    [controlInfo]
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
