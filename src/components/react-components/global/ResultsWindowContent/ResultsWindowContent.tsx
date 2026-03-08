import type {
  AttractorResults,
  ComputationModes,
  ControlResults,
} from '../../../../types';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import AttractorResultsTable from './AttractorResultsTable/AttractorResultsTable';
import ControlResultsStats from './ControlResultsStats/ControlResultsStats';
import type { ResultsWindowContentProps } from './ResultsWindowContentProps';

const ResultsWindowContent: React.FC<ResultsWindowContentProps> = ({
  computationManagerServ,
  attractorVisualizerServ,
  attractorBifurcationExplorerServ,
  controlPerturbationsTableServ,
  resultsOperationsServ,
  dataFormatersServ,
  modelInfoStore,
  tabsStore,
  resultsStatusStore,
}) => {
  const resultsType: ComputationModes | undefined = resultsStatusStore(
    (state) => state.type
  );
  const results = resultsStatusStore((state) => state.results);

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
        return (
          <AttractorResultsTable
            results={results as AttractorResults}
            computationManagerServ={computationManagerServ}
            attractorVisualizerServ={attractorVisualizerServ}
            attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
            tabsStore={tabsStore}
          />
        );
      case 'Control':
        return (
          <ControlResultsStats
            results={results as ControlResults}
            controlPerturbationsTableServ={controlPerturbationsTableServ}
            resultsOperationsServ={resultsOperationsServ}
            dataFormatersServ={dataFormatersServ}
            modelInfoStore={modelInfoStore}
            tabsStore={tabsStore}
          />
        );
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
