import type { HelpTabContentProps } from './HelpTabContentProps';

const HelpTabContent: React.FC<HelpTabContentProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      <span className="text-[20px] text-center">{text}</span>
    </div>
  );
};

export default HelpTabContent;