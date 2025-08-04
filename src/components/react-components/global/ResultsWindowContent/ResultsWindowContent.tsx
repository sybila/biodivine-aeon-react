import useResultsStatus from '../../../../stores/ComputationManager/useResultsStatus';
import type { AttractorResults, ComputationModes } from '../../../../types';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import AttractorResultsTable from './AttractorResultsTable/AttractorResultsTable';

const ResultsWindowContent: React.FC = () => {
  const resultsType: ComputationModes | undefined = useResultsStatus(
    (state) => state.type
  );
  const results = useResultsStatus((state) => state.results);

  if (!resultsType || !results) {
    return (
      <section className="flex flex-row justify-end items-center h-[100px] w-[600px]">
        <SimpleHeaderReact
          compWidth="calc(100% - 24px)"
          compHeight="100%"
          headerText="No results available"
          textFontFamily={'var(--font-family-fira-mono)'}
        />
      </section>
    );
  }

  return (
    <section className="flex flex-col h-fit w-fit items-center justify-start gap-2">
      <div className="h-[2px] w-[94%] mt-2 mb-2 bg-gray-300" />
      <AttractorResultsTable results={results as AttractorResults} />
    </section>
  );
};

export default ResultsWindowContent;
