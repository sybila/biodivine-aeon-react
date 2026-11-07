import BehaviorClassLegend from '../../../global/BehaviorClassLegend/BehaviorClassLegend';
import SeparatorLine from '../../../global/SeparatorLine/SeparatorLine';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import type { BehaviorClassTableProps } from './BehaviorClassTableProps';
import BehaviorClassTableRow from './BehaviorClassTableRow/BehaviorClassTableRow';

const BehaviorClassTable: React.FC<BehaviorClassTableProps> = ({
  maxTableHeight,
  minTableHeight,
  tableWidth,

  classes,
  nodeCardinality,
  attractorBifurcationExplorerServ,
  behaviorClassOperationsServ,
}) => {
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

          <div className="flex flex-col justify-center items-center mx-[5%] w-[30%] h-full">
            <SimpleHeaderReact
              headerText="Interpretation"
              textColor="var(--color-primary-text)"
            />
            <SimpleHeaderReact
              headerText="Count"
              textColor="var(--color-primary-text)"
            />
          </div>

          <div className="flex flex-col justify-center items-center w-[30%] h-full">
            <SimpleHeaderReact
              headerText="Distribution"
              textColor="var(--color-primary-text)"
            />
          </div>
        </div>

        <section
          className="flex flex-col gap-1 overflow-auto"
          style={{
            maxHeight: maxTableHeight,
            height: 'auto',
            minHeight: minTableHeight,
            width: tableWidth,
          }}
        >
          {classes?.map((behaviorClass, index) => (
            <BehaviorClassTableRow
              key={index}
              interpretationCount={behaviorClass.cardinality}
              behaviorClassJSON={behaviorClass.class ?? ''}
              behaviorClassOperationsServ={behaviorClassOperationsServ}
              distribution={[
                attractorBifurcationExplorerServ.mathPercent(
                  behaviorClass.cardinality,
                  nodeCardinality
                ) ?? -1,
                attractorBifurcationExplorerServ.mathDimPercent(
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
