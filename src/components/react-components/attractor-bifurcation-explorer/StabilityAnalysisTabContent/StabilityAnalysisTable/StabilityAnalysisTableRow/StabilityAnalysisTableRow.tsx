import type {
  StabilityAnalysisVariable,
  VariableStability,
} from '../../../../../../types';
import SimpleHeaderReact from '../../../../lit-wrappers/SimpleHeaderReact';

const StabilityAnalysisTableRow: React.FC<StabilityAnalysisVariable> = ({
  variable,
  data,
}) => {
  const buttonsContent: Array<[string, () => void]> = [
    ['Witness', () => console.log('Witness clicked')],
    ['Attractor', () => console.log('Attractor clicked')],
  ];

  const renderStabilityValues = (values: string[]) => {
    return (
      <div className="flex flex-row items-center justify-center h-full w-[30%] max-w-[30%] overflow-y-hidden overflow-x-auto gap-1">
        {values.map((item, idx) => {
          let color = 'black';
          if (item === 'true') color = 'green';
          else if (item === 'false') color = 'red';

          return (
            <SimpleHeaderReact
              key={idx}
              headerText={item}
              textFontWeight="normal"
              textColor={color}
              compHeight="30px"
              lineHeight="30px"
              compWidth="fit-content"
              textFontSize="18px"
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-start items-start h-fit w-full">
      <SimpleHeaderReact
        compHeight="20px"
        compWidth="100%"
        headerText={variable}
      />
      {data.map((stabilityData: VariableStability) => (
        <section className="flex flex-row items-center justify-start h-[30px] w-full">
          {renderStabilityValues(stabilityData.vector ?? [])}

          <div className="flex flex-row items-center justify-center h-full mx-[5%] w-[30%] max-w-[30%]">
            <SimpleHeaderReact
              compHeight="100%"
              compWidth="fit-content"
              lineHeight="30px"
              textFontSize="18px"
              textFontWeight="normal"
              headerText={stabilityData.colors.toString() ?? 'unknown'}
            />
          </div>

          <div className="flex flex-row h-full w-[30%] items-center justify-end gap-2">
            {buttonsContent.map(([text, onClick], index) => (
              <span
                key={index}
                className="decoration-solid underline cursor-pointer hover:text-gray-700"
                onClick={onClick}
              >
                {text}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default StabilityAnalysisTableRow;
