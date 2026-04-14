import { useState } from 'react';
import type { ComputationModes } from '../../../../types';
import SeparatorLine from '../../global/SeparatorLine/SeparatorLine';
import ComputationExtendableContent from './ComputationExtendableContent/ComputationExtendableContent';
import ControlCompParams from './ControlCompParams/ControlCompParams';
import type { StartCompTabContentProps } from './StartCompTabContentsProps';

const StartCompTabContent: React.FC<StartCompTabContentProps> = ({
  liveModelServ,
  computationManagerServ,
  resultsOperationsServ,
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
      resultsStatusStore.getState().isResultsConflict(computationMode) ||
      !tabStore.getState().isEmpty()
    ) {
      warningServ.addStartComputationResultsWarning(currentComputationFunction);
    } else {
      currentComputationFunction();
    }
  };

  liveModelServ.UpdateFunctions.validateUpdateFunctionsIfNeeded();

  return (
    <div className="flex flex-col items-center w-full max-h-[70vh] gap-3 overflow-x-hidden overflow-y-auto">
      <SeparatorLine width="98%" />

      <ComputationExtendableContent
        computationName="Attractor Analysis"
        startComputationFunction={() => showResultsWarningIfNeeded()}
      />

      <ComputationExtendableContent
        computationName="Control"
        startComputationFunction={() => showResultsWarningIfNeeded()}
      >
        <ControlCompParams
          computationManagerServ={computationManagerServ}
          controlStore={controlStore}
        />
      </ComputationExtendableContent>
    </div>
  );
};

export default StartCompTabContent;
