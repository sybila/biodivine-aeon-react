import ReactMarkdown from 'react-markdown';
import type { MarkdownTextProps } from './MarkdownTextProps';

const MarkdownText: React.FC<MarkdownTextProps> = ({ height, width, text }) => {
  return (
    <div style={{ height, width }}>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold mt-4 mb-2" {...props} />
          ),
          p: ({ node, ...props }) => <p className="mb-2" {...props} />,
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mb-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mb-2" {...props} />
          ),
          li: ({ node, ...props }) => <li className="ml-4" {...props} />,
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold" {...props} />
          ),
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2"
              {...props}
            />
          ),
          hr: () => <hr className="my-4 border-gray-300" />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownText;
