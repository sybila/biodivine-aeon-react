import useResultsStatus from '../../../../stores/ComputationManager/useResultsStatus';
import type {
  AttractorResults,
  ComputationModes,
  ControlResults,
} from '../../../../types';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import AttractorResultsTable from './AttractorResultsTable/AttractorResultsTable';
import ControlResultsStats from './ControlResultsStats/ControlResultsStats';

const ResultsWindowContent: React.FC = () => {
  const resultsType: ComputationModes | undefined = useResultsStatus(
    (state) => state.type
  );
  const results = useResultsStatus((state) => state.results);

  const renderEmptyResults = () => {
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
  };

  if (!resultsType || !results) {
    return renderEmptyResults();
  }

  const getResultsComponent = () => {
    switch (resultsType) {
      case 'Attractor Analysis':
        return <AttractorResultsTable results={results as AttractorResults} />;
      case 'Control':
        return <ControlResultsStats results={results as ControlResults} />;
      default:
        return renderEmptyResults();
    }
  };

  return (
    <section className="flex flex-col h-fit w-fit items-center justify-start gap-2">
      <div className="h-[2px] w-[94%] mt-2 mb-2 bg-gray-300" />
      {getResultsComponent()}
    </section>
  );
};

export default ResultsWindowContent;
