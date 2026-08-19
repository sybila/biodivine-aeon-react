import SeparatorLine from '../../../global/SeparatorLine/SeparatorLine';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import type { WitnessAttractorRowProps } from './WitnessAttractorRowProps';

const WitnessAttractorRow: React.FC<WitnessAttractorRowProps> = ({
  leafNodeId,

  attractorBifurcationExplorerServ,
  messageServ,
  pageStringProviderServ,

  helpHoverStore,
}) => {
  return (
    <>
      <SeparatorLine />
      <section className="h-[25px] w-full flex flex-row justify-around items-center px-2 gap-2">
        <TextButtonReact
          text="Witness"
          buttonColor="var(--color-secondary-buttons)"
          buttonHoverColor="var(--color-secondary-buttons-hover)"
          textColor="var(--color-secondary-text)"
          compHeight="25px"
          compWidth="40%"
          handleClick={() =>
            messageServ.showFromResult(
              attractorBifurcationExplorerServ.openLeafNodeWitness(leafNodeId),
              'Failed to Open Witness'
            )
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
          buttonColor="var(--color-secondary-buttons)"
          buttonHoverColor="var(--color-secondary-buttons-hover)"
          textColor="var(--color-secondary-text)"
          compHeight="25px"
          compWidth="40%"
          handleClick={() =>
            messageServ.showFromResult(
              attractorBifurcationExplorerServ.openLeafNodeAttractor(
                leafNodeId
              ),
              'Failed to open attractor visualization'
            )
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
