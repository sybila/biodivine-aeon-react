import type { ComputationModes } from '../../../../types';
import SeparatorLine from '../../global/SeparatorLine/SeparatorLine';
import ComputationExtendableContent from './ComputationExtendableContent/ComputationExtendableContent';
import ControlCompParams from './ControlCompParams/ControlCompParams';
import type { StartCompTabContentProps } from './StartCompTabContentsProps';

const StartCompTabContent: React.FC<StartCompTabContentProps> = ({
  liveModelServ,
  computationManagerServ,
  openCloseOperationsServ,
  warningServ,
  messageServ,

  tabStore,
  resultsStatusStore,
  controlStore,
}) => {
  const showResultsWarningIfNeeded = (
    computationMode: ComputationModes,
    computationFunction: () => void
  ) => {
    if (!computationManagerServ.isComputeEngineConnected()) {
      messageServ.showError(
        'Cannot start computation: Compute Engine is not connected.'
      );
      openCloseOperationsServ.openComputeEngineMenu();
    } else if (
      resultsStatusStore.getState().isResultsConflict(computationMode) ||
      !tabStore.getState().isEmpty()
    ) {
      warningServ.addStartComputationResultsWarning(computationFunction);
    } else {
      computationFunction();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-h-[70vh] gap-4 overflow-x-hidden overflow-y-auto pb-[4px]">
      <SeparatorLine width="98%" />

      <ComputationExtendableContent
        computationName="Attractor Analysis"
        startComputationFunction={() =>
          showResultsWarningIfNeeded('Attractor Analysis', () =>
            computationManagerServ.startAttractorAnalysis()
          )
        }
      />

      <ComputationExtendableContent
        computationName="Control"
        startComputationFunction={() =>
          showResultsWarningIfNeeded('Control', () =>
            computationManagerServ.startControlComputation()
          )
        }
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
