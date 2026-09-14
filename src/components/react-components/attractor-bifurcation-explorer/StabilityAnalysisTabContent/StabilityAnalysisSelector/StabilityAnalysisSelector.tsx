import StabilityIcon from '../../../../../assets/icons/stability_analysis.svg';
import type {
  FullStabilityAnalysisMode,
  StabilityAnalysisModes,
} from '../../../../../types/types';
import ArrowSelectButton from '../../../global/ArrowsSelectButton/ArrowsSelectButton';
import SeparatorLine from '../../../global/SeparatorLine/SeparatorLine';
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
        buttonColor="var(--color-secondary-buttons)"
        buttonActiveColor='var(--color-secondary-buttons-active)'
        buttonHoverColor="var(--color-secondary-buttons-hover)"
        textColor="var(--color-secondary-text)"
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
          textColor="var(--color-primary-text)"
          compHeight="30px"
          compWidth="100%"
          justifyHeader="start"
        />
        {renderButtons()}
      </div>

      <SeparatorLine />

      <TextIconButtonReact
        compHeight="40px"
        compWidth="95%"
        buttonColor="var(--color-secondary-buttons)"
        buttonHoverColor="var(--color-secondary-buttons-hover)"
        textColor="var(--color-secondary-text)"
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
