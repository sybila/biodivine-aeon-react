import useResultsStatus from '../../../../stores/ComputationManager/useResultsStatus';
import type { ControlResults } from '../../../../types';
import NoDataText from '../../global/NoDataText/NoDataText';
import NumberInputReact from '../../lit-wrappers/NumberInputReact';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';

const FilterTabContent: React.FC = () => {
  // We know that when type is 'Control', results is ControlResults
  const controlStats = useResultsStatus((state) =>
    state.type === 'Control'
      ? (state.results as ControlResults).stats
      : undefined
  );

  if (!controlStats) {
    return <NoDataText text="No control computation results available." />;
  }

  const numberInputs: Array<{
    label: string;
    min: number;
    max: number;
    step: number;
    handleKeyUp: (value: number | undefined) => void;
  }> = [
    {
      label: 'Max Size:',
      min: 1,
      max: 100,
      step: 1,
      handleKeyUp: (value: number | undefined) => {
        // Handle the key up event, e.g., update state or perform an action
        console.log('Max Size input value:', value);
      },
    },
    {
      label: 'Min Number Of Interpretations:',
      min: 1,
      max: 100,
      step: 1,
      handleKeyUp: (value: number | undefined) => {
        // Handle the key up event, e.g., update state or perform an action
        console.log('Min Number Of Interpretations input value:', value);
      },
    },
    {
      label: 'Min Robustness (%):',
      min: 0,
      max: 100,
      step: 0.1,
      handleKeyUp: (value: number | undefined) => {
        // Handle the key up event, e.g., update state or perform an action
        console.log('Min Robustness input value:', value);
      },
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2 pt-2 pb-2">
      {numberInputs.map((input, index) => (
        <div
          key={index}
          className="w-[99%] flex flex-row gap-2 justify-around items-center"
        >
          <SimpleHeaderReact headerText={input.label} />
          <NumberInputReact
            min={input.min}
            max={input.max}
            step={input.step}
            handleKeyUp={input.handleKeyUp}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterTabContent;
