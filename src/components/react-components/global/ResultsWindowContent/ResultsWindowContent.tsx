import type {
  AttractorResults,
  ComputationModes,
  ControlResults,
} from '../../../../types/types';
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
  pageStringProviderServ,
  modelInfoStore,

  tabsStore,
  resultsStatusStore,
  helpHoverStore,
}) => {
  const selectedResultsMode = resultsStatusStore(
    (state) => state.selectedResults
  );

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

  const getResultsComponent = (resultsType: ComputationModes | undefined) => {
    if (resultsType == undefined) {
      return renderEmptyResults();
    }

    const results = resultsStatusStore.getState().results[resultsType];

    switch (resultsType) {
      case 'Attractor Analysis':
        return (
          <AttractorResultsTable
            results={results as AttractorResults}
            computationManagerServ={computationManagerServ}
            attractorVisualizerServ={attractorVisualizerServ}
            attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
            pageStringProviderServ={pageStringProviderServ}
            tabsStore={tabsStore}
            helpHoverStore={helpHoverStore}
          />
        );
      case 'Control':
        return (
          <ControlResultsStats
            results={results as ControlResults}
            controlPerturbationsTableServ={controlPerturbationsTableServ}
            resultsOperationsServ={resultsOperationsServ}
            dataFormatersServ={dataFormatersServ}
            tooltips={
              pageStringProviderServ.Tooltips.OverlayWindowTooltips
                .ResultsTooltips.ControlResults
            }
            modelInfoStore={modelInfoStore}
            tabsStore={tabsStore}
            helpHoverStore={helpHoverStore}
          />
        );
      default:
        return renderEmptyResults();
    }
  };

  return (
    <section className="flex flex-col h-fit w-fit items-center justify-start gap-2">
      {getResultsComponent(selectedResultsMode)}
    </section>
  );
};

export default ResultsWindowContent;
