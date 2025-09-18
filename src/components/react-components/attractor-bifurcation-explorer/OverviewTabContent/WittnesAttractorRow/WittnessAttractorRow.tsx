import AttractorVisualizer from '../../../../../services/attractor-visualizer/AttractorVisualizer';
import { Message } from '../../../../lit-components/message-wrapper';
import SeparatorLine from '../../../global/SeparatorLine/SeparatorLine';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';

const WittnessAttractorRow: React.FC<{
  leafNodeId: number;
}> = ({ leafNodeId }) => {
  const openAttractor = () => {
    if (!leafNodeId) {
      Message.showError(
        "Can't open attractor visualizer: no leaf node selected"
      );
    } else {
      AttractorVisualizer.openVisualizer({ nodeId: leafNodeId });
    }
  };

  return (
    <>
      <SeparatorLine />
      <section className="h-[25px] w-full flex flex-row justify-around items-center px-2 gap-2">
        <TextButtonReact text="Wittness" compHeight="25px" compWidth="40%" />
        <TextButtonReact
          text="Attractor"
          compHeight="25px"
          compWidth="40%"
          handleClick={() => openAttractor()}
        />
      </section>
    </>
  );
};

export default WittnessAttractorRow;
