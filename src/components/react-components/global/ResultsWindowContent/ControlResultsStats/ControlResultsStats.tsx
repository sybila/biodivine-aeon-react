import Time from '../../../../../services/utilities/Time';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import StatEntryReact from '../../../lit-wrappers/StatEntryReact';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import SeparatorLine from '../../SeparatorLine/SeparatorLine';

import type { ControlResultsStatsProps } from './ControlResultsStatsProps';

const ControlResultsStats: React.FC<ControlResultsStatsProps> = ({
  results,
  controlPerturbationsTableServ,
  resultsOperationsServ,
  dataFormatersServ,
  tooltips,
  modelInfoStore,
  tabsStore,
  helpHoverStore,
}) => {
  const renderStats = () => {
    return (
      <section className="flex flex-col justify-end items-center h-fit w-full gap-3">
        <DotHeaderReact
          className="bg-(--color-secondary) rounded-md"
          compHeight="30px"
          compWidth="100%"
          textColor="var(--color-secondary-text)"
          justifyHeader="start"
          headerText="Statistics"
        />
        <div className="flex flex-col justify-between items-center w-[95%] h-fit gap-1">
          <StatEntryReact
            compWidth="100%"
            statName="Elapsed"
            contBgColor="var(--color-secondary-darker)"
            textColor="var(--color-secondary-text)"
            statValue={Time.getTime(results.stats.elapsed, true)}
          />
          <StatEntryReact
            compWidth="100%"
            statName="Number of Interpretations"
            contBgColor="var(--color-secondary-darker)"
            textColor="var(--color-secondary-text)"
            statValue={results.stats.allColorsCount.toString()}
          />
          <StatEntryReact
            compWidth="100%"
            statName="Number of Perturbations"
            contBgColor="var(--color-secondary-darker)"
            textColor="var(--color-secondary-text)"
            statValue={results.stats.perturbationCount.toString()}
          />
          <StatEntryReact
            compWidth="100%"
            statName="Smallest Perturbation Size"
            contBgColor="var(--color-secondary-darker)"
            textColor="var(--color-secondary-text)"
            statValue={results.stats.minimalPerturbationSize.toString()}
          />
          <StatEntryReact
            compWidth="100%"
            statName="Highest Robustness"
            contBgColor="var(--color-secondary-darker)"
            textColor="var(--color-secondary-text)"
            statValue={`${dataFormatersServ.convertRobustnessToPercentage(
              results.stats.maximalPerturbationRobustness
            )}%`}
          />
          <StatEntryReact
            compWidth="100%"
            statName="Phenotype Oscillation"
            contBgColor="var(--color-secondary-darker)"
            textColor="var(--color-secondary-text)"
            statValue={results.preComputationInfo.oscillation.toString()}
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
          textColor='var(--color-primary-text)'
        />
      </div>

      <SeparatorLine />

      <div className="flex flex-col items-center justify-start w-[95%] h-fit gap-3">
        {renderStats()}

        <SeparatorLine />

        <div className="flex flex-col w-full h-fit items-center justify-center gap-3">
          <DotHeaderReact
            className="bg-(--color-secondary) rounded-md"
            compHeight="30px"
            compWidth="100%"
            justifyHeader="start"
            textColor="var(--color-secondary-text)"
            headerText="Visualizations"
          />
          <TextButtonReact
            compWidth="90%"
            text="Table"
            buttonColor="var(--color-secondary-buttons)"
            buttonHoverColor="var(--color-secondary-buttons-hover)"
            textColor="var(--color-secondary)"
            handleClick={() =>
              tabsStore
                .getState()
                .addTab(
                  '/control-perturbations-table',
                  'Control Perturbations Table',
                  undefined,
                  undefined,
                  () => controlPerturbationsTableServ.clear()
                )
            }
            onMouseEnter={(e: React.MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e.nativeEvent,
                  tooltips.openTableVisualization(),
                  true,
                  -50
                )
            }
            onMouseLeave={() => helpHoverStore.getState().clear()}
          />
        </div>

        <SeparatorLine />

        <div className="flex flex-col w-full h-fit items-center justify-center gap-2 mb-2">
          <DotHeaderReact
            className="bg-(--color-secondary) rounded-md"
            compHeight="30px"
            compWidth="100%"
            justifyHeader="start"
            headerText="Export"
            textColor="var(--color-secondary-text)"
          />
          <TextButtonReact
            compWidth="90%"
            text="CSV"
            buttonColor="var(--color-secondary-buttons)"
            buttonHoverColor="var(--color-secondary-buttons-hover)"
            textColor="var(--color-secondary)"
            handleClick={() =>
              resultsOperationsServ.exportControlPerturbationsAsCsv(
                results.perturbations,
                `${modelInfoStore
                  .getState()
                  .getModelName()}_control_perturbations_${Time.getCurrentTime()}`
              )
            }
            onMouseEnter={(e: React.MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e.nativeEvent,
                  tooltips.exportAsCsv(),
                  true,
                  -50
                )
            }
            onMouseLeave={() => helpHoverStore.getState().clear()}
          />
        </div>
      </div>
    </section>
  );
};

export default ControlResultsStats;
