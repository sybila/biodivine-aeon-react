import MarkdownText from '../MarkdownText/MarkdownText';
import type { HelpTabContentProps } from './HelpTabContentProps';

const HelpTabContent: React.FC<HelpTabContentProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center w-full max-h-[64vh] overflow-auto gap-3">
      <MarkdownText height="fit-content" width="100%" text={text} />
    </div>
  );
};

export default HelpTabContent;
