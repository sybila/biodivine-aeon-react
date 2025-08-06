import Time from '../../../../services/utilities/Time';
import useComputeEngineStatus from '../../../../stores/ComputationManager/useComputeEngineStatus';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';

const StatusBar: React.FC = () => {
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
    <SimpleHeaderReact
      className="max-w-[calc(100% - 210px)] bg-[var(--color-secondary)] rounded-md px-3"
      headerText={getStatusText()}
      compHeight="100%"
      compWidth="auto"
      textColor={color}
    />
  );
};

export default StatusBar;
