import { useEffect, useState } from 'react';
import type {
  AttractorResults,
  ComputationModes,
  ControlResults,
} from '../../../../types';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import ArrowSelectButton from '../ArrowsSelectButton/ArrowsSelectButton';
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
  const [selectedResultsMode, setSelectedResultsMode] = useState<
    ComputationModes | undefined
  >(undefined);

  const results: Record<
    ComputationModes,
    AttractorResults | ControlResults | undefined
  > = resultsStatusStore((state) => state.results);

  useEffect(() => {
    if (selectedResultsMode === undefined || !results[selectedResultsMode]) {
      const definedResults = Object.entries(results).filter(
        (_, value) => value != undefined
      );

      if (definedResults.length > 0) {
        setSelectedResultsMode(definedResults[0][0] as ComputationModes);
      } else {
        setSelectedResultsMode(undefined);
      }
    }
  }, [results]);

  const renderButtons = () => {
    const renderButton = (mode: ComputationModes) => (
      <ArrowSelectButton
        key={mode}
        active={selectedResultsMode === mode}
        text={mode}
        onClick={() => setSelectedResultsMode(mode)}
      />
    );

    const resultsArray = Object.entries(results).filter(
      (value) => value[1] != null
    );

    const mid = Math.ceil(resultsArray.length / 2);

    const firstCol = resultsArray.slice(0, mid);
    const secondCol = resultsArray.slice(mid);

    return (
      <section className="flex flex-row w-full">
        <div className="w-1/2">
          {firstCol.map((value) => renderButton(value[0] as ComputationModes))}
        </div>

        <div className="w-1/2">
          {secondCol.map((value) => renderButton(value[0] as ComputationModes))}
        </div>
      </section>
    );
  };

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
      {renderButtons()}
      <div className="h-[2px] w-[94%] mt-2 mb-2 bg-gray-300" />
      {getResultsComponent(selectedResultsMode)}
    </section>
  );
};

export default ResultsWindowContent;
