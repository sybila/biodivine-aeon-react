import ControlPerturbationsTable from '../../../../../services/control-perturbations-table/ControlPerturbationsTable';
import ResultsOperations from '../../../../../services/global/ResultsOperations/ResultsOperations';
import DataFormaters from '../../../../../services/utilities/DataFormaters';
import Time from '../../../../../services/utilities/Time';
import useModelInfoStore from '../../../../../stores/LiveModel/useModelInfoStore';
import useTabsStore from '../../../../../stores/Navigation/useTabsStore';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import StatEntryReact from '../../../lit-wrappers/StatEntryReact';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';

import type { ControlResultsStatsProps } from './ControlResultsStatsProps';

const ControlResultsStats: React.FC<ControlResultsStatsProps> = ({
  results,
}) => {
  const renderStats = () => {
    return (
      <section className="flex flex-col justify-end items-center h-fit w-full gap-3">
        <DotHeaderReact
          className="bg-[var(--color-secondary)] rounded-md"
          compHeight="30px"
          compWidth="100%"
          justifyHeader="start"
          headerText="Statistics"
        />
        <div className="flex flex-col justify-between items-center w-[95%] h-fit gap-1">
          <StatEntryReact
            compWidth="100%"
            statName="Elapsed"
            statValue={Time.getTime(results.stats.elapsed, true)}
          />
          <StatEntryReact
            compWidth="100%"
            statName="Number of Interpretations"
            statValue={results.stats.allColorsCount.toString()}
          />
          <StatEntryReact
            compWidth="100%"
            statName="Number of Perturbations"
            statValue={results.stats.perturbationCount.toString()}
          />
          <StatEntryReact
            compWidth="100%"
            statName="Smallest Perturbation Size"
            statValue={results.stats.minimalPerturbationSize.toString()}
          />
          <StatEntryReact
            compWidth="100%"
            statName="Highest Robustness"
            statValue={`${DataFormaters.convertRobustnessToPercentage(
              results.stats.maximalPerturbationRobustness
            )}%`}
          />
        </div>
      </section>
    );
  };

  return (
    <section className="flex flex-col h-fit w-[600px] items-center justify-start gap-2">
      <div className="flex flex-row justify-end h-fit w-full">
        <SimpleHeaderReact
          headerText="Control Results"
          compWidth="calc(100% - 24px)"
          textFontSize="25px"
          textFontFamily="var(--font-family-fira-mono)"
        />
      </div>

      <div className="h-[2px] w-[94%] mt-2 mb-2 bg-gray-300" />

      <div className="flex flex-col items-center justify-start w-[95%] h-fit gap-3">
        {renderStats()}

        <div className="h-[2px] w-[95%] mt-2 mb-2 bg-gray-300" />

        <div className="flex flex-col w-full h-fit items-center justify-center gap-3">
          <DotHeaderReact
            className="bg-[var(--color-secondary)] rounded-md"
            compHeight="30px"
            compWidth="100%"
            justifyHeader="start"
            headerText="Visualizations"
          />
          <TextButtonReact
            compWidth="90%"
            text="Table"
            handleClick={() =>
              useTabsStore
                .getState()
                .addTab(
                  '/control-perturbations-table',
                  'Control Perturbations Table',
                  undefined,
                  () => ControlPerturbationsTable.clear()
                )
            }
          />
        </div>

        <div className="h-[2px] w-[95%] mt-2 mb-2 bg-gray-300" />

        <div className="flex flex-col w-full h-fit items-center justify-center gap-2 mb-2">
          <DotHeaderReact
            className="bg-[var(--color-secondary)] rounded-md"
            compHeight="30px"
            compWidth="100%"
            justifyHeader="start"
            headerText="Export"
          />
          <TextButtonReact
            compWidth="90%"
            text="CSV"
            handleClick={() =>
              ResultsOperations.exportControlPerturbationsAsCsv(
                results.perturbations,
                `${useModelInfoStore
                  .getState()
                  .getModelName()}_control_perturbations_${Time.getCurrentTime()}`
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ControlResultsStats;
