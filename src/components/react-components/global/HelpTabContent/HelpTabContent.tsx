import ReactMarkdown from 'react-markdown';
import type { HelpTabContentProps } from './HelpTabContentProps';

const HelpTabContent: React.FC<HelpTabContentProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      <div className="text-[20px] text-center">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default HelpTabContent;
