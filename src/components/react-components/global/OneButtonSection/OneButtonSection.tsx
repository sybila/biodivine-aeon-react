import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import type { OneButtonSectionProps } from './OneButtonSectionProps';

const OneButtonSection: React.FC<OneButtonSectionProps> = ({
  headerText,
  buttonText,
  onClick,
  gapInsideSection,
}) => {
  return (
    <section
      className="flex flex-col h-fit w-full"
      style={{ gap: `${gapInsideSection}` }}
    >
      <DotHeaderReact headerText={headerText} compHeight="20px" />

      <TextButtonReact
        compWidth="100%"
        handleClick={() => onClick()}
        text={buttonText}
      />
    </section>
  );
};

export default OneButtonSection;
