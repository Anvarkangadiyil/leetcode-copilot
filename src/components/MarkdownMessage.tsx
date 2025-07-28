
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Optional: for GitHub Flavored Markdown
import rehypeHighlight from 'rehype-highlight'; // Optional: for syntax highlighting

function MarkdownMessage(content:{content: string}) {
  return (
    <div className="markdown-container"> {/* You can style this div */ }
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Add GitHub Flavored Markdown support
        rehypePlugins={[rehypeHighlight]} // Enable syntax highlighting
>{content.content}</ReactMarkdown>
    </div>
  );
}

export default MarkdownMessage;
