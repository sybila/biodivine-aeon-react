import ComputationManager from '../../../../../services/global/ComputationManager/ComputationManager';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import NumberInputReact from '../../../lit-wrappers/NumberInputReact';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';

const ControlCompParams: React.FC = () => {
  const headers: Array<string> = [
    'Min Robustness (%)',
    'Max Size',
    'Max Number of Results',
  ];

  /** functions is an array of tuples, where each tuple contains:
   * 1. A function to get the current value,
   * 2. A function to set the value,
   * 3. The minimum value for the input,
   * 4. The maximum value for the input,
   * 5. The step value for the input. */
  const functions: Array<
    [() => number, (value: number | undefined) => void, number, number, number]
  > = [
    [
      () => ComputationManager.getMinRobustness(),
      (v) => ComputationManager.setMinRobustness(v),
      0,
      100,
      0.1,
    ],
    [
      () => ComputationManager.getMaxSize(),
      (v) => ComputationManager.setMaxSize(v),
      1,
      1000,
      1,
    ],
    [
      () => ComputationManager.getMaxNumberOfResults(),
      (v) => ComputationManager.setMaxNumberOfResults(v),
      1,
      100,
      1,
    ],
  ];

  return (
    <section className="flex flex-col w-full gap-3">
      <DotHeaderReact
        headerText="Control Computation Parameters"
        compWidth="100%"
        justifyHeader="start"
      />
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col w-[47%] gap-1 justify-center">
          {headers.map((header) => (
            <SimpleHeaderReact
              key={header}
              headerText={`${header}:`}
              textFontSize="18px"
              textFontWeight="normal"
            />
          ))}
        </div>

        <div className="flex flex-col w-[47%] gap-1 justify-center">
          {functions.map(([getFunc, setFunc, min, max, step], index) => (
            <NumberInputReact
              key={index}
              min={min}
              max={max}
              step={step}
              compWidth="100%"
              compHeight="22px"
              value={getFunc().toString()}
              handleChange={setFunc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ControlCompParams;
