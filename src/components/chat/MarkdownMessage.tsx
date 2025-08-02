import ReactMarkdown from 'react-markdown';



interface MarkdownMessageProps {
  content: string;
  className?: string;
}

const MarkdownMessage = ({ content }: MarkdownMessageProps) => {
  return (
    <div >
      <ReactMarkdown >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownMessage;