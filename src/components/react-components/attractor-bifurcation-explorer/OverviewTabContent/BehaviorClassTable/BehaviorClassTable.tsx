import AttractorBifurcationExplorer from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorer';
import type { DecisionMixedNode } from '../../../../../types';
import BehaviorClassLegend from '../../../global/BehaviorClassLegend/BehaviorClassLegend';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import StatEntryReact from '../../../lit-wrappers/StatEntryReact';
import BehaviorClassTableRow from './BehaviorClassTableRow/BehaviorClassTableRow';

const BehaviorClassTable: React.FC<DecisionMixedNode> = (nodeData) => {
  const renderStats = () => {
    return (
      <section className="flex flex-col justify-end items-center h-fit w-full gap-3">
        <DotHeaderReact
          compHeight="30px"
          compWidth="100%"
          justifyHeader="start"
          headerText="Statistics"
        />
        <div className="flex flex-col justify-between items-center w-[95%] h-[45px]">
          <StatEntryReact
            compWidth="100%"
            statName="Node Type"
            statValue={
              nodeData.type === 'unprocessed'
                ? 'mixed'
                : nodeData.type ?? 'unknown'
            }
          />
          <StatEntryReact
            compWidth="100%"
            statName="Number of Classes"
            statValue={nodeData.classes?.length.toString() ?? 'Unknown'}
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
            <SimpleHeaderReact headerText="Behavior" />
            <SimpleHeaderReact headerText="Class" />
          </div>

          <div className="flex flex-col justify-center items-center mx-[5%] w-[30%] h-full">
            <SimpleHeaderReact headerText="Interpretation" />
            <SimpleHeaderReact headerText="Count" />
          </div>

          <div className="flex flex-col justify-center items-center w-[30%] h-full">
            <SimpleHeaderReact headerText="Division" />
          </div>
        </div>

        <section className="flex flex-col w-full h-fit max-h-[200px] 2xl:max-h-[450px] gap-1 overflow-auto">
          {nodeData.classes?.map((behaviorClass, index) => (
            <BehaviorClassTableRow
              key={index}
              interpretationCount={behaviorClass.cardinality}
              behaviorClassJSON={behaviorClass.class ?? ''}
              distribution={[
                AttractorBifurcationExplorer.mathPercent(
                  behaviorClass.cardinality,
                  nodeData.cardinality
                ) ?? -1,
                AttractorBifurcationExplorer.mathDimPercent(
                  behaviorClass.cardinality,
                  nodeData.cardinality
                ) ?? -1,
              ]}
            />
          ))}
        </section>
      </section>
    );
  };

  return (
    <section className="h-fit w-full flex flex-col justify-center items-center gap-2">
      {renderStats()}
      <div className="h-[2px] w-[94%] mt-2 mb-2 bg-gray-300" />
      {renderTable()}

      <div className="h-fit w-full my-1">
        <BehaviorClassLegend />
      </div>
    </section>
  );
};

export default BehaviorClassTable;
