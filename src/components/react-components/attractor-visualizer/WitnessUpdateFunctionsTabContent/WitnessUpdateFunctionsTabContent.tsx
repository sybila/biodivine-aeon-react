import NoDataText from '../../global/NoDataText/NoDataText';
import StatEntryReact from '../../lit-wrappers/StatEntryReact';
import type { WitnessUpdateFunctionsTabContentProps } from './WitnessUpdateFunctionsTabContentProps';

const WitnessUpdateFunctionsTabContent: React.FC<
  WitnessUpdateFunctionsTabContentProps
> = ({ attractorVisualizerServ }) => {
  const witnessUpdateFunctions: Array<[string, string]> | undefined =
    attractorVisualizerServ.getWitness();

  if (!witnessUpdateFunctions || witnessUpdateFunctions.length <= 0) {
    return <NoDataText text="No witness update functions available." />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[60px] max-h-[500px] gap-1 pt-2 overflow-y-auto">
      {witnessUpdateFunctions.map(([variableName, updateFunction], index) => (
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

export default WitnessUpdateFunctionsTabContent;
