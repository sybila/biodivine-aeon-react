import { useMemo, useState } from 'react';
import ControlPerturbationsTable from '../../../../services/control-perturbations-table/ControlPerturbationsTable';
import { LiveModel } from '../../../../services/global/LiveModel/LiveModel';
import useResultsStatus from '../../../../stores/ComputationManager/useResultsStatus';
import type { ControlResults } from '../../../../types';
import NoDataText from '../../global/NoDataText/NoDataText';
import SeparatorLine from '../../global/SeparatorLine/SeparatorLine';
import ContentWindowReact from '../../lit-wrappers/ContentWindowReact';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import StatEntryReact from '../../lit-wrappers/StatEntryReact';
import DataFormaters from '../../../../services/utilities/DataFormaters';

const OverviewTabContent: React.FC = () => {
  const [phenAsText, setPhenotypeAsText] = useState<boolean>(false);

  // We know that when type is 'Control', results is ControlResults
  const controlStats = useResultsStatus((state) =>
    state.type === 'Control'
      ? (state.results as ControlResults).stats
      : undefined
  );

  if (!controlStats) {
    return <NoDataText text="No control computation results available." />;
  }

  const controlEnabledPhenotypeVars = useMemo(() => {
    return LiveModel.Control.getPhenotypeControlEnabledVars();
  }, [controlStats]);

  const formatedPhenotype = useMemo(
    () =>
      ControlPerturbationsTable.formatPerturbation(
        Object.entries(controlEnabledPhenotypeVars.phenotypeVars)
      ),
    [controlEnabledPhenotypeVars]
  );

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
      />
      <StatEntryReact
        statName="Number of Interpretations"
        statValue={controlStats.allColorsCount.toString()}
        compWidth="99%"
        nameMaxWidth="59%"
        valueMaxWidth="40%"
        valNameGap="2%"
        addColon={true}
      />
      <StatEntryReact
        statName="Maximal Robustness (%)"
        statValue={DataFormaters.convertRobustnessToPercentage(
          controlStats.maximalPerturbationRobustness
        )}
        compWidth="99%"
        nameMaxWidth="51%"
        valueMaxWidth="47%"
        valNameGap="2%"
        addColon={true}
      />
      <StatEntryReact
        statName="Minimal Size"
        statValue={controlStats.minimalPerturbationSize.toString()}
        compWidth="99%"
        nameMaxWidth="30%"
        valueMaxWidth="68%"
        valNameGap="2%"
        addColon={true}
      />

      <SeparatorLine width="99%" />

      <DotHeaderReact
        compWidth="100%"
        justifyHeader="start"
        headerText="Control-Enabled Variables"
      />

      <ContentWindowReact
        compHeight="40px"
        compWidth="99%"
        contentAlignI="safe center"
        contentJustifyC="center"
        windOverflowY="hidden"
      >
        <div className="flex flex-row h-full w-auto font-[var(--base-font-family)] text-black select-none px-2">
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
      />

      <ContentWindowReact
        className="cursor-pointer select-none"
        compHeight="40px"
        compWidth="99%"
        contentAlignI="safe center"
        contentJustifyC="center"
        windOverflowY="hidden"
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
