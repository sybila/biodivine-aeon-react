import { useState } from 'react';
import type { StabilityAnalysisModes } from '../../../../../types';
import ArrowSelectButton from '../../../global/ArrowsSelectButton/ArrowsSelectButton';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import TextIconButtonReact from '../../../lit-wrappers/TextIconButtonReact';

import StabilityIcon from '../../../../../assets/icons/stability_analysis.svg';
import AttractorBifurcationExplorer from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorer';

type FullStabilityAnalysisMode =
  | 'Total'
  | 'Stability'
  | 'Oscillation'
  | 'Disorder';

const StabilityAnalysisSelector: React.FC<{ nodeId: number }> = ({
  nodeId,
}) => {
  const [stabilityMode, setStabilityMode] =
    useState<FullStabilityAnalysisMode>('Total');

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
        onClick={() => setStabilityMode(mode)}
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
          AttractorBifurcationExplorer.getStabilityData(
            nodeId,
            stabilityMode === 'Total'
              ? 'total'
              : (stabilityMode[0] as StabilityAnalysisModes)
          )
        }
      />
    </section>
  );
};

export default StabilityAnalysisSelector;
