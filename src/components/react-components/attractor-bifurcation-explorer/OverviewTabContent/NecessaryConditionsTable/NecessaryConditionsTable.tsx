import SectionWithDotHeader from '../../../global/SectionWithDotHeader/SectionWithDotHeader';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import type { NecessaryConditionTableProps } from './NecessaryConditionTableProps';

const NecessaryConditionsTable: React.FC<NecessaryConditionTableProps> = ({
  maxTableHeight,
  minTableHeight,
  tableWidth,

  nodeId,
  attractorBifurcationExplorerServ,
}) => {
  const necessaryConditions =
    attractorBifurcationExplorerServ.getNodeNecessaryConditions(nodeId);

  return (
    <SectionWithDotHeader
      height="fit-content"
      text="Necessary Conditions"
      textColor="var(--color-primary-text)"
      width={tableWidth}
    >
      <div
        className="w-[99%] overflow-auto bg-(--color-secondary) rounded-md p-2"
        style={{
          maxHeight: maxTableHeight,
          height: 'auto',
          minHeight: minTableHeight,
        }}
      >
        {necessaryConditions.map((condition, index) => (
          <div
            key={index}
            className="min-h-[22px] max-h-[35px] min-w-full max-w-full overflow-auto mt-1"
          >
            <SimpleHeaderReact
              headerText={`- ${condition.name ?? 'unknown'}`}
              compHeight="22px"
              compWidth="fit-content"
              textColor={
                condition.positive === true
                  ? 'var(--color-positive)'
                  : condition.positive === false
                    ? 'var(--color-negative)'
                    : 'var(--color-secondary-text)'
              }
              className="text-nowrap"
            />
          </div>
        ))}
      </div>
    </SectionWithDotHeader>
  );
};

export default NecessaryConditionsTable;
