import SeparatorLine from '../../../global/SeparatorLine/SeparatorLine';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import type { WitnessAttractorRowProps } from './WitnessAttractorRowProps';

const WitnessAttractorRow: React.FC<WitnessAttractorRowProps> = ({
  leafNodeId,

  attractorBifurcationExplorerServ,
  pageStringProviderServ,

  helpHoverStore,
}) => {
  return (
    <>
      <SeparatorLine />
      <section className="h-[25px] w-full flex flex-row justify-around items-center px-2 gap-2">
        <TextButtonReact
          text="Witness"
          compHeight="25px"
          compWidth="40%"
          handleClick={() =>
            attractorBifurcationExplorerServ.openLeafNodeWitness(leafNodeId)
          }
          onMouseEnter={(e: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e.nativeEvent,
                pageStringProviderServ.Tooltips.openNodeWitness(),
                true,
                -50,
                200
              )
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
        />
        <TextButtonReact
          text="Attractor"
          compHeight="25px"
          compWidth="40%"
          handleClick={() =>
            attractorBifurcationExplorerServ.openLeafNodeAttractor(leafNodeId)
          }
          onMouseEnter={(e: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e.nativeEvent,
                pageStringProviderServ.Tooltips.openNodeAttractor(),
                true,
                -50
              )
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
        />
      </section>
    </>
  );
};

export default WitnessAttractorRow;
