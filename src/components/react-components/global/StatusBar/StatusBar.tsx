import Time from '../../../../services/utilities/Time';
import useComputeEngineStatus from '../../../../stores/ComputationManager/useComputeEngineStatus';

const StatusBar: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const computeEngineStatus: string = useComputeEngineStatus(
    (state) => state.computeEngineStatus
  );
  const computationStatus = useComputeEngineStatus(
    (state) => state.computationStatus
  );
  const color: string = useComputeEngineStatus((state) => state.statusColor);

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
      className="flex flex-row items-center justify-center-safe h-full max-w-[20vw] xl:max-w-[30vw] 2xl:max-w-[40vw] bg-[var(--color-secondary)] rounded-md px-3 truncate font-[var(--base-font-family)] text-[21px] select-none pointer-events-auto cursor-pointer"
      style={{ color: color, fontWeight: 'bold' }}
      onClick={onClick}
    >
      {getStatusText()}
    </span>
  );
};

export default StatusBar;
