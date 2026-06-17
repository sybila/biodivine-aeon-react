import StabilityIcon from '../../../../../assets/icons/stability_analysis.svg';
import type {
  FullStabilityAnalysisMode,
  StabilityAnalysisModes,
} from '../../../../../types';
import ArrowSelectButton from '../../../global/ArrowsSelectButton/ArrowsSelectButton';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import TextIconButtonReact from '../../../lit-wrappers/TextIconButtonReact';
import type { StabilityAnalysisSelectorProps } from './StabilityAnalysisSelectorProps';

const StabilityAnalysisSelector: React.FC<StabilityAnalysisSelectorProps> = ({
  nodeId,

  attractorBifurcationExplorerServ,
  pageStringProviderServ,

  bifurcationExplorerStatusStore,
  helpHoverStore,
}) => {
  const stabilityMode: FullStabilityAnalysisMode =
    bifurcationExplorerStatusStore((state) => state.stabilityAnalysisMode);

  const renderButtons = () => {
    const firstCol: Array<FullStabilityAnalysisMode> = ['Total', 'Stability'];
    const secondCol: Array<FullStabilityAnalysisMode> = [
      'Oscillation',
      'Disorder',
    ];

    const renderButton = (mode: FullStabilityAnalysisMode) => (
      <ArrowSelectButton
        key={mode}
        active={stabilityMode === mode}
        text={mode}
        onClick={() =>
          bifurcationExplorerStatusStore
            .getState()
            .setStabilityAnalysisMode(mode)
        }
        onMouseEnter={(e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.changeStabilityAnalysisMode(mode),
              true,
              -50
            )
        }
        onMouseLeave={() => helpHoverStore.getState().clear()}
      />
    );
    return (
      <section className="flex flex-row w-full">
        <div className="flex flex-col justify-center items-center w-1/2 gap-2">
          {firstCol.map((mode: FullStabilityAnalysisMode) =>
            renderButton(mode)
          )}
        </div>

        <div className="flex flex-col justify-center items-center w-1/2 gap-2">
          {secondCol.map((mode: FullStabilityAnalysisMode) =>
            renderButton(mode)
          )}
        </div>
      </section>
    );
  };

  return (
    <section className="h-fit w-full flex flex-col justify-start items-center gap-2">
      <div className="h-fit w-full flex flex-col justify-start items-center gap-3">
        <DotHeaderReact
          headerText="Select Analysis Mode"
          compHeight="30px"
          compWidth="100%"
          justifyHeader="start"
        />
        {renderButtons()}
      </div>

      <div className="h-[2px] w-[94%] mt-2 mb-2 bg-gray-300" />
      <TextIconButtonReact
        compHeight="40px"
        compWidth="95%"
        text="Start Stability Analysis"
        iconAlt="Stability"
        iconSrc={StabilityIcon}
        handleClick={() =>
          attractorBifurcationExplorerServ.getStabilityData(
            nodeId,
            stabilityMode === 'Total'
              ? 'total'
              : (stabilityMode[0] as StabilityAnalysisModes)
          )
        }
        onMouseEnter={(e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              pageStringProviderServ.Tooltips.startStabilityAnalysis(),
              true,
              -50
            )
        }
        onMouseLeave={() => helpHoverStore.getState().clear()}
      />
    </section>
  );
};

export default StabilityAnalysisSelector;
