import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import NumberInputReact from '../../../lit-wrappers/NumberInputReact';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import type { ControlCompParamsProps } from './ControlCompParamsProps';

const ControlCompParams: React.FC<ControlCompParamsProps> = ({
  computationManagerServ,
  controlStore,
}) => {
  const controlEnabledStatuses: Record<number, boolean> = controlStore(
    (state) => state.controlEnabled
  );

  const numberOfEnabled = Object.values(controlEnabledStatuses).filter(
    (controlEnabledStatus) => controlEnabledStatus
  ).length;

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
      () => computationManagerServ.getMinRobustness(),
      (v) => computationManagerServ.setMinRobustness(v),
      0,
      100,
      0.1,
    ],
    [
      () => computationManagerServ.getMaxSize(),
      (v) => computationManagerServ.setMaxSize(v),
      1,
      numberOfEnabled,
      1,
    ],
    [
      () => computationManagerServ.getMaxNumberOfResults(),
      (v) => computationManagerServ.setMaxNumberOfResults(v),
      1,
      100,
      1,
    ],
  ];

  return (
    <section className="flex flex-col w-full gap-3">
      <DotHeaderReact
        textColor="var(--color-secondary-text)"
        style={{ userSelect: 'none' }}
        headerText="Control Computation Parameters"
        compWidth="100%"
        justifyHeader="start"
      />
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col w-[47%] gap-1 justify-center">
          {headers.map((header) => (
            <SimpleHeaderReact
              style={{ userSelect: 'none' }}
              key={header}
              headerText={`${header}:`}
              textFontSize="18px"
              textFontWeight="normal"
              textColor="var(--color-secondary-text)"
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
              inputColor="var(--color-tertiary-text-inputs)"
              inputBorderColor="var(--color-tertiary-text-inputs-border)"
              textColor="var(--color-tertiary-text)"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ControlCompParams;
