import ReactMarkdown from 'react-markdown';
import type { MarkdownTextProps } from './MarkdownTextProps';

const MarkdownText: React.FC<MarkdownTextProps> = ({
  height,
  width,
  textColor,
  quoteColor,
  linkColor,
  text,
}) => {
  return (
    <div style={{ height, width }}>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="text-3xl font-bold mt-6 mb-4"
              {...props}
              style={{ color: textColor }}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-2xl font-bold mt-5 mb-3"
              {...props}
              style={{ color: textColor }}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-xl font-bold mt-4 mb-2"
              {...props}
              style={{ color: textColor }}
            />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-2" {...props} style={{ color: textColor }} />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-inside mb-2"
              {...props}
              style={{ color: textColor }}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-inside mb-2"
              {...props}
              style={{ color: textColor }}
            />
          ),
          li: ({ node, ...props }) => (
            <li className="ml-4" {...props} style={{ color: textColor }} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="underline"
              style={{ color: linkColor }}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong
              className="font-semibold"
              {...props}
              style={{ color: textColor }}
            />
          ),
          em: ({ node, ...props }) => (
            <em className="italic" {...props} style={{ color: textColor }} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 pl-4 italic my-2"
              {...props}
              style={{ color: quoteColor }}
            />
          ),
          hr: () => <hr className="my-4" style={{ color: quoteColor }} />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownText;
