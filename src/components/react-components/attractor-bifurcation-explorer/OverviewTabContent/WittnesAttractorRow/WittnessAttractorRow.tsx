import SeparatorLine from '../../../global/SeparatorLine/SeparatorLine';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';

const WittnessAttractorRow: React.FC = () => {
  return (
    <>
      <SeparatorLine />
      <section className="h-[25px] w-full flex flex-row justify-around items-center px-2 gap-2">
        <TextButtonReact text="Wittness" compHeight="25px" compWidth="40%" />
        <TextButtonReact text="Attractor" compHeight="25px" compWidth="40%" />
      </section>
    </>
  );
};

export default WittnessAttractorRow;
