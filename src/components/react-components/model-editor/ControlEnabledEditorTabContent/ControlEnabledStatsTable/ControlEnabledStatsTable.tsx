import { useMemo } from 'react';
import type { ControlEnabledStats } from '../../../../../types';
import StatEntryReact from '../../../lit-wrappers/StatEntryReact';
import type { ControlEnabledStatsProps } from './ControlEnabledStatsTableProps';

const ControlEnabledStatsTable: React.FC<ControlEnabledStatsProps> = ({
  controlStore,
}) => {
  const controlEnabled = controlStore((state) => state.controlEnabled);

  const stats: ControlEnabledStats = useMemo(
    () => controlStore.getState().getControlEnabledStats(),
    [controlEnabled]
  );

  const statCells = [
    ['Control-Enabled', stats.controlEnabled.toString()],
    ['Not-Control-Enabled', stats.notControlEnabled.toString()],
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

export default ControlEnabledStatsTable;
