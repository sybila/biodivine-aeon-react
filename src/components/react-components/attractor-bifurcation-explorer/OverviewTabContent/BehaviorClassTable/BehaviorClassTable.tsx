import AttractorBifurcationExplorer from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorer';
import type { AttractorClassBE } from '../../../../../types';
import BehaviorClassLegend from '../../../global/BehaviorClassLegend/BehaviorClassLegend';
import SeparatorLine from '../../../global/SeparatorLine/SeparatorLine';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import BehaviorClassTableRow from './BehaviorClassTableRow/BehaviorClassTableRow';

const BehaviorClassTable: React.FC<{
  classes: AttractorClassBE[];
  nodeCardinality: number;
  isLeaf: boolean;
}> = ({ classes, nodeCardinality, isLeaf }) => {
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
            <SimpleHeaderReact headerText="Distribution" />
          </div>
        </div>

        <section
          className={`flex flex-col w-full h-fit  ${
            !isLeaf
              ? 'max-h-[100px]xl:max-h-[170px] 2xl:max-h-[200px]'
              : 'max-h-[50px] xl:max-h-[100px] 2xl:max-h-[150px]'
          } gap-1 overflow-auto`}
        >
          {classes?.map((behaviorClass, index) => (
            <BehaviorClassTableRow
              key={index}
              interpretationCount={behaviorClass.cardinality}
              behaviorClassJSON={behaviorClass.class ?? ''}
              distribution={[
                AttractorBifurcationExplorer.mathPercent(
                  behaviorClass.cardinality,
                  nodeCardinality
                ) ?? -1,
                AttractorBifurcationExplorer.mathDimPercent(
                  behaviorClass.cardinality,
                  nodeCardinality
                ) ?? -1,
              ]}
            />
          ))}
        </section>
      </section>
    );
  };

  return (
    <>
      <SeparatorLine />
      {renderTable()}

      <div className="h-fit w-full my-1">
        <BehaviorClassLegend />
      </div>
    </>
  );
};

export default BehaviorClassTable;
