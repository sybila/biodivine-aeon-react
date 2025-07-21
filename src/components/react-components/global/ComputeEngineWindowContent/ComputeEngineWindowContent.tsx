import { useState } from 'react';
import ComputationManager from '../../../../services/global/ComputationManager/ComputationManager';
import InvisibleInputReact from '../../lit-wrappers/InvisibleInputReact';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';

type ComputationStatus = 'Connected' | 'Disconnected' | 'Running' | 'Finnished';

const ComputeEngineWindowContent = () => {
  const [computationStatus, setComputationStatus] =
    useState<ComputationStatus>('Disconnected');

  const renderComputationStatus = () => {
    let color = 'black';
    switch (computationStatus) {
      case 'Connected':
        color = 'green';
        break;
      case 'Disconnected':
        color = 'var(--color-red)';
        break;
    }

    return (
      <section className="h-[50px] w-full flex flex-row items-center justify-between px-4">
        <DotHeaderReact textColor={color} headerText={computationStatus} />
        <button className="h-full w-fit bg-red-500">Placeholder Button</button>
      </section>
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-[60px] gap-3">
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
