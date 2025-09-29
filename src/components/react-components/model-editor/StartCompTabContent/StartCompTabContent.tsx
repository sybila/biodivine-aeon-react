import { useState } from 'react';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import type { ComputationModes } from '../../../../types';
import ComputationManager from '../../../../services/global/ComputationManager/ComputationManager';
import ControlCompParams from './ControlCompParams/ControlCompParams';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import ArrowSelectButton from '../../global/ArrowsSelectButton/ArrowsSelectButton';
import { LiveModel } from '../../../../services/global/LiveModel/LiveModel';
import useResultsStatus from '../../../../stores/ComputationManager/useResultsStatus';
import useTabsStore from '../../../../stores/Navigation/useTabsStore';
import Warning from '../../../../services/global/Warning/Warning';

const StartCompTabContent: React.FC = () => {
  const [computationMode, setComputationMode] = useState<ComputationModes>(
    ComputationManager.getComputationMode()
  );

  const changeComputationMode = (mode: ComputationModes) => {
    ComputationManager.setComputationMode(mode);
    setComputationMode(mode);
  };

  const getComputationFunction = () => {
    switch (computationMode) {
      case 'Attractor Analysis':
        return () => ComputationManager.startAttractorAnalysis();
      case 'Control':
        return () => ComputationManager.startControlComputation();
    }
  };

  const showResultsWarningIfNeeded = () => {
    const currentComputationFunction = getComputationFunction();

    if (
      useResultsStatus.getState().results ||
      !useTabsStore.getState().isEmpty()
    ) {
      Warning.addStartComputationResultsWarning(currentComputationFunction);
    } else {
      currentComputationFunction();
    }
  };

  const renderButtons = () => {
    const firstCol: Array<ComputationModes> = ['Attractor Analysis'];
    const secondCol: Array<ComputationModes> = ['Control'];

    const renderButton = (mode: ComputationModes) => (
      <ArrowSelectButton
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

  const renderParams = () => {
    switch (computationMode) {
      case 'Control':
        return <ControlCompParams />;
      default:
        return null;
    }
  };

  LiveModel.UpdateFunctions.validateUpdateFunctionsIfNeeded();

  return (
    <div className="flex flex-col items-center w-full h-fit gap-5">
      <DotHeaderReact
        headerText="Computation Mode"
        compWidth="100%"
        justifyHeader="start"
      ></DotHeaderReact>

      {renderButtons()}

      {renderParams()}

      <TextButtonReact
        text="Start Computation"
        onClick={() => showResultsWarningIfNeeded()}
        compHeight="40px"
        compWidth="100%"
      />
    </div>
  );
};

export default StartCompTabContent;
