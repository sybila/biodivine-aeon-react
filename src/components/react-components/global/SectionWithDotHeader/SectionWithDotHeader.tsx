import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import type { SectionWithDotHeaderProps } from './SectionWithDotHeaderProps';

const SectionWithDotHeader: React.FC<SectionWithDotHeaderProps> = ({
  height = 'fit',
  width = '100%',
  textColor = 'var(--color-primary-text)',
  text,
  children,
}) => {
  return (
    <section
      className="flex flex-col items-center w-full h-fit gap-3"
      style={{ height: height, width: width }}
    >
      <DotHeaderReact
        textColor={textColor}
        compWidth="100%"
        headerText={text}
        justifyHeader="start"
      />

      {children}
    </section>
  );
};

export default SectionWithDotHeader;
