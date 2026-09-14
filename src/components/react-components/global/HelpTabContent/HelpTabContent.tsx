import MarkdownText from '../MarkdownText/MarkdownText';
import type { HelpTabContentProps } from './HelpTabContentProps';

const HelpTabContent: React.FC<HelpTabContentProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center w-full max-h-[64vh] overflow-auto gap-3">
      <MarkdownText
        height="fit-content"
        width="100%"
        textColor="var(--color-primary-text)"
        quoteColor="var(--color-primary-placeholder-text)"
        linkColor="var(--color-primary-interactive-text)"
        text={text}
      />
    </div>
  );
};

export default HelpTabContent;
