import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import useComputeEngineStatus from '../../../../stores/ComputationManager/useComputeEngineStatus';
import ComputationManager from '../../../../services/global/ComputationManager/ComputationManager';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';

const ComputeEngineWindowContent = () => {
  const computeEngineStatus: string = useComputeEngineStatus(
    (state) => state.computeEngineStatus
  );
  const color: string = useComputeEngineStatus((state) => state.statusColor);


  const renderComputationStatus = () => {
    return (
      <section className="h-[50px] w-full flex flex-row items-center justify-between px-4 pointer-events-auto">
        <DotHeaderReact textColor={color} headerText={computeEngineStatus} />
        <button
          className="h-full w-[100px] bg-red-500 pointer-events-auto pointer-coarse cursor-pointer rounded-lg text-white font-bold text-sm"
          onClick={() => {
            ComputationManager.toggleConnection();
          }}
        >
          {computeEngineStatus === 'Connected' ? 'Disconnect' : 'Connect'}
        </button>
      </section>
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-[60px] gap-3 pointer-events-auto">
      <InvisibleInputReact
        compHeight="20px"
        compWidth="100%"
        placeholder="Compute Engine URL"
        singleTextAlign="center"
        handleChange={ComputationManager.setComputeEngineAddress}
        value={ComputationManager.getComputeEngineAddress()}
      />

      {renderComputationStatus()}
    </div>
  );
};

export default ComputeEngineWindowContent;
