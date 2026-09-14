import React from 'react';
import Time from '../../../../services/utilities/Time';
import type { StatusBarProps } from './StatusBarProps';

const StatusBar: React.FC<StatusBarProps> = ({
  onClick,
  setHelpHover,
  clearHelpHover,
  computeEngineStatusStore,
}) => {
  const computeEngineStatus: string = computeEngineStatusStore(
    (state) => state.computeEngineStatus
  );
  const computationStatus = computeEngineStatusStore(
    (state) => state.computationStatus
  );
  const color: string = computeEngineStatusStore((state) => state.statusColor);

  const getStatusText = () => {
    if (computationStatus.status != 'No computation') {
      return `${
        computationStatus.computationMode ?? computationStatus.status
      }  |  ${Time.getTime(
        computationStatus.timestamp,
        computationStatus.running
      )}`;
    }

    return computeEngineStatus;
  };

  return (
    <span
      className="flex flex-row items-center justify-center-safe h-full max-w-[20vw] xl:max-w-[30vw] 2xl:max-w-[40vw] bg-(--color-primary) rounded-md px-3 truncate font-(--base-font-family) text-[21px] select-none pointer-events-auto cursor-pointer"
      style={{ color: color, fontWeight: 'bold' }}
      onClick={onClick}
      onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) =>
        setHelpHover(e.nativeEvent)
      }
      onMouseLeave={() => clearHelpHover()}
    >
      {getStatusText()}
    </span>
  );
};

export default StatusBar;
