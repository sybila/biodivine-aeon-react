import useResultsStatus from '../../../../stores/ComputationManager/useResultsStatus';
import type { ControlResults } from '../../../../types';
import NoDataText from '../../global/NoDataText/NoDataText';
import StatEntryReact from '../../lit-wrappers/StatEntryReact';

const OverviewTabContent: React.FC = () => {
  // We know that when type is 'Control', results is ControlResults
  const controlStats = useResultsStatus((state) =>
    state.type === 'Control'
      ? (state.results as ControlResults).stats
      : undefined
  );

  if (!controlStats) {
    return <NoDataText text="No control computation results available." />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2 pt-2 pb-2">
      <StatEntryReact
        statName="Number of Perturbations"
        statValue={controlStats.perturbationCount.toString()}
        compWidth="99%"
        addColon={true}
      />
      <StatEntryReact
        statName="Number of Interpretations"
        statValue={controlStats.allColorsCount.toString()}
        compWidth="99%"
        addColon={true}
      />
      <StatEntryReact
        statName="Maximal Robustness"
        statValue={controlStats.maximalPerturbationRobustness.toString()}
        compWidth="99%"
        addColon={true}
      />
      <StatEntryReact
        statName="Minimal Size"
        statValue={controlStats.minimalPerturbationSize.toString()}
        compWidth="99%"
        addColon={true}
      />
    </div>
  );
};

export default OverviewTabContent;
