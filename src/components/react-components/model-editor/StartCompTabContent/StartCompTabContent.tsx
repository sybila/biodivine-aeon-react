import { useState } from 'react';
import type { ComputationModes } from '../../../../types';
import ArrowSelectButton from '../../global/ArrowsSelectButton/ArrowsSelectButton';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import ControlCompParams from './ControlCompParams/ControlCompParams';
import type { StartCompTabContentProps } from './StartCompTabContentsProps';

const StartCompTabContent: React.FC<StartCompTabContentProps> = ({
  liveModelServ,
  computationManagerServ,
  warningServ,
  tabStore,
  resultsStatusStore,
  controlStore,
}) => {
  const [computationMode, setComputationMode] = useState<ComputationModes>(
    computationManagerServ.getComputationMode()
  );

  const changeComputationMode = (mode: ComputationModes) => {
    computationManagerServ.setComputationMode(mode);
    setComputationMode(mode);
  };

  const getComputationFunction = () => {
    switch (computationMode) {
      case 'Attractor Analysis':
        return () => computationManagerServ.startAttractorAnalysis();
      case 'Control':
        return () => computationManagerServ.startControlComputation();
    }
  };

  const showResultsWarningIfNeeded = () => {
    const currentComputationFunction = getComputationFunction();

    if (
      resultsStatusStore.getState().results ||
      !tabStore.getState().isEmpty()
    ) {
      warningServ.addStartComputationResultsWarning(currentComputationFunction);
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
        return (
          <ControlCompParams
            computationManagerServ={computationManagerServ}
            controlStore={controlStore}
          />
        );
      default:
        return null;
    }
  };

  liveModelServ.UpdateFunctions.validateUpdateFunctionsIfNeeded();

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
