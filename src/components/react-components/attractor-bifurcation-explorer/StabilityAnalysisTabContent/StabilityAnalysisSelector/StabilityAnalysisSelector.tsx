import { useState } from 'react';
import type { StabilityAnalysisModes } from '../../../../../types';
import ArrowSelectButton from '../../../global/ArrowsSelectButton/ArrowsSelectButton';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import TextIconButtonReact from '../../../lit-wrappers/TextIconButtonReact';

import StabilityIcon from '../../../../../assets/icons/stability_analysis.svg';

const StabilityAnalysisSelector = () => {
  const [stabilityMode, setStabilityMode] =
    useState<StabilityAnalysisModes>('Total');

  const renderButtons = () => {
    const firstCol: Array<StabilityAnalysisModes> = ['Total', 'Stability'];
    const secondCol: Array<StabilityAnalysisModes> = [
      'Oscillation',
      'Disorder',
    ];

    const renderButton = (mode: StabilityAnalysisModes) => (
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
          {firstCol.map((mode: StabilityAnalysisModes) => renderButton(mode))}
        </div>

        <div className="flex flex-col justify-center items-center w-1/2 gap-2">
          {secondCol.map((mode: StabilityAnalysisModes) => renderButton(mode))}
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
        onClick={() => {}}
      />
    </section>
  );
};

export default StabilityAnalysisSelector;
