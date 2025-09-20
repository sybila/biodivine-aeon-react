import AttractorVisualizer from '../../../../../../services/attractor-visualizer/AttractorVisualizer';
import ComputationManager from '../../../../../../services/global/ComputationManager/ComputationManager';
import SimpleHeaderReact from '../../../../lit-wrappers/SimpleHeaderReact';
import type { AttractorResultsTableRowProps } from './AttractorResultsTableRowProps';

const AttractorResultsTableRow: React.FC<AttractorResultsTableRowProps> = ({
  interpretationCount,
  behaviorClassList,
}) => {
  const behaviourString: string | undefined = !behaviorClassList
    ? undefined
    : behaviorClassList
        .map((x) => x[0])
        .sort()
        .join('');

  const openAttractor = () => {
    if (behaviourString && behaviourString.length > 0) {
      AttractorVisualizer.openVisualizer({ behavior: behaviourString });
    }
  };

  const openWitness = () => {
    ComputationManager.openWitnessAttractorAnalysis(
      behaviourString ? behaviourString : ''
    );
  };

  const buttonsContent: Array<[string, () => void]> = [
    ['Witness', () => openWitness()],
    ['Attractor', () => openAttractor()],
  ];

  return (
    <section className="flex flex-row items-center justify-start h-[30px] w-full">
      <div className="flex flex-row items-center justify-center h-full w-[30%] max-w-[30%] overflow-y-hidden overflow-x-auto">
        <SimpleHeaderReact
          className="mb-[-12px]"
          compHeight="100%"
          compWidth="fit-content"
          lineHeight="30px"
          textFontSize="18px"
          headerText={
            !behaviourString || behaviourString.length === 0
              ? 'unclassified'
              : behaviourString
          }
          textFontFamily="Symbols"
        />
      </div>

      <div className="flex flex-row items-center justify-center h-full mx-[5%] w-[30%] max-w-[30%]">
        <SimpleHeaderReact
          compHeight="100%"
          compWidth="fit-content"
          lineHeight="30px"
          textFontSize="18px"
          textFontWeight="normal"
          headerText={
            !interpretationCount ? 'unknown' : interpretationCount.toString()
          }
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
  );
};

export default AttractorResultsTableRow;
