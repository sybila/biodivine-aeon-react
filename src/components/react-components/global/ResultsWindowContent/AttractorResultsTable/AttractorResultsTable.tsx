import Time from '../../../../../services/utilities/Time';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import StatEntryReact from '../../../lit-wrappers/StatEntryReact';
import TextIconButtonReact from '../../../lit-wrappers/TextIconButtonReact';
import BehaviorClassLegend from '../../BehaviorClassLegend/BehaviorClassLegend';
import type { AttractorResultsTableProps } from './AttractorResultsTableProps';
import AttractorResultsTableRow from './AttractorResultsTableRow/AttractorResultsTableRow';

import SplitIcon from '../../../../../assets/icons/split_icon.svg';
import SeparatorLine from '../../SeparatorLine/SeparatorLine';

const AttractorResultsTable: React.FC<AttractorResultsTableProps> = ({
  results,
  computationManagerServ,
  attractorVisualizerServ,
  attractorBifurcationExplorerServ,
  pageStringProviderServ,

  tabsStore,
  helpHoverStore,
}) => {
  const openAttractorBifurcationExplorer = () => {
    tabsStore.getState().addTab(
      '/attractor-bifurcation-explorer',
      'Attractor Bifurcation Explorer',
      undefined,
      () => attractorBifurcationExplorerServ.saveVisualizationStatus(),
      () => attractorBifurcationExplorerServ.clear()
    );
  };

  const renderStats = () => {
    return (
      <section className="flex flex-col justify-end items-center h-fit w-full gap-3">
        <DotHeaderReact
          className="bg-[var(--color-secondary)] rounded-md"
          textColor="var(--color-secondary-text)"
          compHeight="30px"
          compWidth="100%"
          justifyHeader="start"
          headerText="Statistics"
        />
        <div className="flex flex-col justify-between items-center w-[95%] h-[45px]">
          <StatEntryReact
            compWidth="100%"
            textColor="var(--color-secondary-text)"
            contBgColor="var(--color-secondary-darker)"
            statName="Elapsed"
            statValue={Time.getTime(results?.elapsed, true)}
          />
          <StatEntryReact
            compWidth="100%"
            textColor="var(--color-secondary-text)"
            contBgColor="var(--color-secondary-darker)"
            statName="Number of Classes"
            statValue={results?.data.length.toString()}
          />
        </div>
      </section>
    );
  };

  const renderTable = () => {
    return (
      <section className="flex flex-col w-full h-fit items-center justify-center gap-2">
        <div className="flex flex-row justify-start items-center w-full h-[50px]">
          <div className="flex flex-col justify-center items-center w-[30%] h-full">
            <SimpleHeaderReact
              headerText="Behavior"
              textColor="var(--color-primary-text)"
            />
            <SimpleHeaderReact
              headerText="Class"
              textColor="var(--color-primary-text)"
            />
          </div>

          <div className="flex flex-col justify-center items-center ml-[5%] w-[30%] h-full">
            <SimpleHeaderReact
              headerText="Interpretation"
              textColor="var(--color-primary-text)"
            />
            <SimpleHeaderReact
              headerText="Count"
              textColor="var(--color-primary-text)"
            />
          </div>
        </div>

        <section className="flex flex-col w-full h-fit max-h-[100px] 2xl:max-h-[250px] gap-2 overflow-auto">
          {results?.data
            .sort((a, b) => b.sat_count - a.sat_count)
            .map((result, index) => (
              <AttractorResultsTableRow
                key={index}
                interpretationCount={result.sat_count}
                behaviorClassList={result.phenotype}
                computationManagerServ={computationManagerServ}
                attractorVisualizerServ={attractorVisualizerServ}
                pageStringProviderServ={pageStringProviderServ}
                helpHoverStore={helpHoverStore}
              />
            ))}
        </section>
      </section>
    );
  };

  return (
    <section className="flex flex-col h-fit w-[600px] items-center justify-start gap-2">
      <div className="flex flex-row justify-end h-fit w-full">
        <SimpleHeaderReact
          headerText="Attractor Results"
          compWidth="calc(100% - 24px)"
          textFontSize="25px"
          textColor='var(--color-primary-text)'
          textFontFamily="var(--font-family-fira-mono)"
        />
      </div>

      <SeparatorLine color="var(--color-primary-separator)" />

      <div className="flex flex-col items-center justify-start w-[95%] h-fit gap-3">
        {renderStats()}

        <SeparatorLine width="95%" color="var(--color-primary-separator)" />

        {renderTable()}

        <BehaviorClassLegend />

        <TextIconButtonReact
          className="mb-2"
          compWidth="100%"
          buttonJustifyContent="center"
          textContainerWidth="65%"
          text="Explore Bifurcation Function"
          iconAlt="Bifurcation"
          iconSrc={SplitIcon}
          textColor="var(--color-secondary-text)"
          buttonColor="var(--color-secondary-buttons)"
          buttonHoverColor="var(--color-secondary-buttons-hover)"
          handleClick={openAttractorBifurcationExplorer}
          onMouseEnter={(e: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e.nativeEvent,
                pageStringProviderServ.Tooltips.OverlayWindowTooltips.ResultsTooltips.AttractorAnalysisResults.openExploreBifurcationFunction(),
                true,
                -80
              )
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
        />
      </div>
    </section>
  );
};

export default AttractorResultsTable;
