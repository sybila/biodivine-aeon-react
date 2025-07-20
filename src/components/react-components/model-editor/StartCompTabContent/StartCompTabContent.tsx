import { useState } from 'react';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import ComputationModeButton from './ComputationModeButton/ComputationModeButton';
import type { ComputationModes } from '../../../../types';
import ComputationManager from '../../../../services/global/ComputationManager/ComputationManager';
import ControlCompParams from './ControlCompParams/ControlCompParams';

const StartCompTabContent: React.FC = () => {
  const [computationMode, setComputationMode] = useState<ComputationModes>(
    ComputationManager.getComputationMode()
  );

  const changeComputationMode = (mode: ComputationModes) => {
    ComputationManager.setComputationMode(mode);
    setComputationMode(mode);
  };

  const renderButtons = () => {
    const firstCol: Array<ComputationModes> = ['Attractor Analysis'];
    const secondCol: Array<ComputationModes> = ['Control'];

    const renderButton = (mode: ComputationModes) => (
      <ComputationModeButton
        key={mode}
        active={computationMode === mode}
        text={mode}
        onClick={() => changeComputationMode(mode)}
      />
    );
    return (
      <section className="flex flex-row w-full">
        <div className="w-1/2">
          {firstCol.map((mode: ComputationModes) => renderButton(mode))}
        </div>

        <div className="w-1/2">
          {secondCol.map((mode: ComputationModes) => renderButton(mode))}
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-fit gap-5">
      <DotHeaderReact
        headerText="Computation Mode"
        compWidth="100%"
        justifyHeader="start"
      ></DotHeaderReact>

      {renderButtons()}

      <ControlCompParams />
    </div>
  );
};

export default StartCompTabContent;
