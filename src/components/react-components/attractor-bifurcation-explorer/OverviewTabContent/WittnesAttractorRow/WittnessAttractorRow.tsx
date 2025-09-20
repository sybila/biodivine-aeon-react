import AttractorBifurcationExplorer from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorer';
import SeparatorLine from '../../../global/SeparatorLine/SeparatorLine';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';

const WittnessAttractorRow: React.FC<{
  leafNodeId: number;
}> = ({ leafNodeId }) => {
  return (
    <>
      <SeparatorLine />
      <section className="h-[25px] w-full flex flex-row justify-around items-center px-2 gap-2">
        <TextButtonReact
          text="Wittness"
          compHeight="25px"
          compWidth="40%"
          handleClick={() =>
            AttractorBifurcationExplorer.openLeafNodeWitness(leafNodeId)
          }
        />
        <TextButtonReact
          text="Attractor"
          compHeight="25px"
          compWidth="40%"
          handleClick={() =>
            AttractorBifurcationExplorer.openLeafNodeAttractor(leafNodeId)
          }
        />
      </section>
    </>
  );
};

export default WittnessAttractorRow;
