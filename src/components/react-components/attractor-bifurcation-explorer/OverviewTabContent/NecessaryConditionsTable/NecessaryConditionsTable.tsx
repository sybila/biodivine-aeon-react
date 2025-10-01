import AttractorBifurcationExplorer from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorer';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';

const NecessaryConditionsTable: React.FC<{ nodeId: number }> = ({ nodeId }) => {
  const necessaryConditions =
    AttractorBifurcationExplorer.getNodeNecessaryConditions(nodeId);

  return (
    <section className="flex flex-col justify-center items-center h-fit w-full gap-1 mb-2">
      <DotHeaderReact
        compHeight="30px"
        compWidth="100%"
        justifyHeader="start"
        headerText="Necessary Conditions"
      />
      <div className="w-[99%] min-h-[100px] max-h-[100px] xl:max-h-[150px] overflow-auto bg-[var(--color-grey-blue-ultra-light)] rounded-md p-2">
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
                  ? 'var(--color-green)'
                  : condition.positive === false
                  ? 'var(--color-red)'
                  : 'black'
              }
              className="text-nowrap"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NecessaryConditionsTable;
