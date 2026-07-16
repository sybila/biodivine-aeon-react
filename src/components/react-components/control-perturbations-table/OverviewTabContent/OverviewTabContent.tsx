import { useMemo, useState } from 'react';
import type { ControlResults } from '../../../../types';
import NoDataText from '../../global/NoDataText/NoDataText';
import SeparatorLine from '../../global/SeparatorLine/SeparatorLine';
import ContentWindowReact from '../../lit-wrappers/ContentWindowReact';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import StatEntryReact from '../../lit-wrappers/StatEntryReact';
import type { OverviewTabContentProps } from './OverviewTabContentProps';

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({
  liveModelServ,
  controlPerturbationsTableServ,
  dataFormatersServ,
  resultsStatusStore,
}) => {
  const [phenAsText, setPhenotypeAsText] = useState<boolean>(false);

  // We know that when type is 'Control', results is ControlResults
  const controlResult: ControlResults | undefined = resultsStatusStore(
    (state) => state.results.Control as ControlResults
  );

  const controlStats = controlResult ? controlResult.stats : undefined;

  const controlPrecomputation = controlResult
    ? controlResult.preComputationInfo
    : undefined;

  const controlEnabledPhenotypeVars = useMemo(() => {
    return liveModelServ.Control.getPhenotypeControlEnabledVars();
  }, [controlStats]);

  const formatedPhenotype = useMemo(
    () =>
      controlPerturbationsTableServ.formatPerturbation(
        Object.entries(controlEnabledPhenotypeVars.phenotypeVars),
        "var(--color-secondary-text)"
      ),
    [controlEnabledPhenotypeVars]
  );

  if (!controlStats || !controlPrecomputation) {
    return <NoDataText text="No control computation results available." />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2 pt-2 pb-2">
      <StatEntryReact
        statName="Number of Perturbations"
        statValue={controlStats.perturbationCount.toString()}
        compWidth="99%"
        nameMaxWidth="54%"
        valueMaxWidth="45%"
        valNameGap="1%"
        addColon={true}
        contBgColor="var(--color-secondary-darker)"
        textColor="var(--color-secondary-text)"
      />
      <StatEntryReact
        statName="Number of Interpretations"
        statValue={controlStats.allColorsCount.toString()}
        compWidth="99%"
        nameMaxWidth="59%"
        valueMaxWidth="40%"
        valNameGap="2%"
        addColon={true}
        contBgColor="var(--color-secondary-darker)"
        textColor="var(--color-secondary-text)"
      />
      <StatEntryReact
        statName="Maximal Robustness (%)"
        statValue={dataFormatersServ.convertRobustnessToPercentage(
          controlStats.maximalPerturbationRobustness
        )}
        compWidth="99%"
        nameMaxWidth="51%"
        valueMaxWidth="47%"
        valNameGap="2%"
        addColon={true}
        contBgColor="var(--color-secondary-darker)"
        textColor="var(--color-secondary-text)"
      />
      <StatEntryReact
        statName="Minimal Size"
        statValue={controlStats.minimalPerturbationSize.toString()}
        compWidth="99%"
        nameMaxWidth="30%"
        valueMaxWidth="68%"
        valNameGap="2%"
        addColon={true}
        contBgColor="var(--color-secondary-darker)"
        textColor="var(--color-secondary-text)"
      />
      <StatEntryReact
        statName="Phenotype Oscillation"
        statValue={controlPrecomputation.oscillation.toString()}
        compWidth="99%"
        nameMaxWidth="50%"
        valueMaxWidth="48%"
        valNameGap="2%"
        addColon={true}
        contBgColor="var(--color-secondary-darker)"
        textColor="var(--color-secondary-text)"
      />

      <SeparatorLine width="99%" />

      <DotHeaderReact
        compWidth="100%"
        justifyHeader="start"
        headerText="Control-Enabled Variables"
        textColor="var(--color-primary-text)"
      />

      <ContentWindowReact
        compHeight="40px"
        compWidth="99%"
        contentAlignI="safe center"
        contentJustifyC="center"
        windOverflowY="hidden"
        windColor="var(--color-secondary-light)"
      >
        <div className="flex flex-row h-full w-auto font-(--base-font-family) text-(--color-secondary-text) select-none px-2">
          {controlEnabledPhenotypeVars.controlEnabledVars.map(
            (varName, index) => (
              <span key={index} className="mx-1">
                {varName}
                {index <
                controlEnabledPhenotypeVars.controlEnabledVars.length - 1
                  ? ', '
                  : ''}
              </span>
            )
          )}
        </div>
      </ContentWindowReact>

      <SeparatorLine width="99%" />

      <DotHeaderReact
        compWidth="100%"
        justifyHeader="start"
        headerText="Phenotype"
        textColor="var(--color-primary-text)"
      />

      <ContentWindowReact
        className="cursor-pointer select-none"
        compHeight="40px"
        compWidth="99%"
        contentAlignI="safe center"
        contentJustifyC="center"
        windOverflowY="hidden"
        windColor="var(--color-secondary-light)"
        onClick={() => setPhenotypeAsText(!phenAsText)}
      >
        <div className="flex flex-row h-full w-auto px-2">
          {phenAsText ? formatedPhenotype[1] : formatedPhenotype[0]}
        </div>
      </ContentWindowReact>
    </div>
  );
};

export default OverviewTabContent;
