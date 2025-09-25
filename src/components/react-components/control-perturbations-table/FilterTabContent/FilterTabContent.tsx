import useResultsStatus from '../../../../stores/ComputationManager/useResultsStatus';
import { type ControlResults } from '../../../../types';
import NoDataText from '../../global/NoDataText/NoDataText';
import NumberInputReact from '../../lit-wrappers/NumberInputReact';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import SelectVarFilterTable from './SelectVarFilterTable/SelectVarFilterTable';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import SeparatorLine from '../../global/SeparatorLine/SeparatorLine';
import usePerturbationFilterSortStore from '../../../../stores/ControlPerturbationsTable/usePerturbationsFilterSortStore';

const FilterTabContent: React.FC<{
  setStartFilter: (value: boolean) => void;
  startFilter: boolean;
}> = ({ setStartFilter, startFilter }) => {
  // We know that when type is 'Control', results is ControlResults
  const controlInfo: ControlResults | undefined = useResultsStatus((state) =>
    state.type === 'Control' ? (state.results as ControlResults) : undefined
  );

  if (!controlInfo) {
    return <NoDataText text="No control computation results available." />;
  }

  const getCurrentMinRobustness = () => {
    const currentRob = usePerturbationFilterSortStore.getState().minRobustness;
    return currentRob != undefined ? currentRob * 100 : undefined;
  };

  const numberInputs: Array<{
    label: string;
    min: number;
    max: number;
    step: number;
    value?: number;
    handleUpdate: (value: number | undefined) => void;
  }> = [
    {
      label: 'Max Size:',
      min: 1,
      max: 100,
      step: 1,
      value: usePerturbationFilterSortStore.getState().maxSize,
      handleUpdate: (value: number | undefined) => {
        usePerturbationFilterSortStore
          .getState()
          .setMaxSize(value ?? undefined);
      },
    },
    {
      label: 'Min Interpretations:',
      min: 1,
      max: 100,
      step: 1,
      value:
        usePerturbationFilterSortStore.getState().minNumberOfInterpretations,
      handleUpdate: (value: number | undefined) => {
        usePerturbationFilterSortStore
          .getState()
          .setMinNumberOfInterpretations(value ?? undefined);
      },
    },
    {
      label: 'Min Robustness (%):',
      min: 0,
      max: 100,
      step: 0.1,
      value: getCurrentMinRobustness(),
      handleUpdate: (value: number | undefined) => {
        usePerturbationFilterSortStore
          .getState()
          .setMinRobustness(value != undefined ? value / 100 : undefined);
      },
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2 pt-2 pb-2">
      <SeparatorLine />
      <DotHeaderReact
        compWidth="100%"
        justifyHeader="start"
        headerText="Number Filters"
      />
      {numberInputs.map((input, index) => (
        <div
          key={index}
          className="h-[45px] w-[99%] flex flex-row gap-2 justify-around items-center"
        >
          <SimpleHeaderReact
            headerText={input.label}
            compHeight="80%"
            compWidth="40%"
            textFontSize="18px"
          />
          <NumberInputReact
            compHeight="70%"
            compWidth="40%"
            min={input.min}
            max={input.max}
            value={
              input.value != undefined ? input.value.toString() : undefined
            }
            step={input.step}
            handleChange={input.handleUpdate}
          />
        </div>
      ))}

      <SeparatorLine />

      <DotHeaderReact
        compWidth="100%"
        justifyHeader="start"
        headerText="Perturbed Variable Filter"
      />
      <SelectVarFilterTable
        variableNames={controlInfo.preComputationInfo.controlEnabledVars}
      />

      <SeparatorLine />

      <TextButtonReact
        compWidth="99%"
        compHeight="40px"
        textFontWeight="bold"
        text="Apply Filters"
        onClick={() => {
          usePerturbationFilterSortStore.getState().setPageNumber(1);
          setStartFilter(!startFilter);
        }}
      />
    </div>
  );
};

export default FilterTabContent;
