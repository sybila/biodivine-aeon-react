import AttractorVisualizer from '../../../../services/attractor-visualizer/AttractorVisualizer';
import NoDataText from '../../global/NoDataText/NoDataText';
import StatEntryReact from '../../lit-wrappers/StatEntryReact';

const WittnessUpdateFunctionsTabContent = () => {
  const wittnessUpdateFunctions: Array<[string, string]> | undefined =
    AttractorVisualizer.getWitness();

  if (!wittnessUpdateFunctions || wittnessUpdateFunctions.length <= 0) {
    return <NoDataText text="No witness update functions available." />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[60px] max-h-[500px] gap-1 pt-2 overflow-y-auto">
      {wittnessUpdateFunctions.map(([variableName, updateFunction], index) => (
        <StatEntryReact
          key={index}
          compWidth="98%"
          addColon={true}
          nameWidth="15%"
          nameMaxWidth="15%"
          valNameGap="3%"
          valueWidth="80%"
          valueMaxWidth="80%"
          statName={variableName}
          statValue={updateFunction}
        />
      ))}
    </div>
  );
};

export default WittnessUpdateFunctionsTabContent;
