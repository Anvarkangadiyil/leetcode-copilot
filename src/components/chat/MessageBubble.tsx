// ✅ Improved MessageBubble.tsx with Highlight.js syntax highlighting + better dark theme

import { Bot, User, Loader2, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // ✅ Modern dark theme
import { useEffect } from "react";
import type { Message } from "@/types/type";

interface MessageBubbleProps {
  chat: Message;
}

export const MessageBubble = ({ chat }: MessageBubbleProps) => {
  const isUser = chat.name === "user";
  const isBot = chat.name === "model";
  // const [_copied, setCopied] = useState(false);

  useEffect(() => {
    hljs.highlightAll();
  }, [chat.message]);

  // const _handleCopy = () => {
  //   navigator.clipboard.writeText(chat.message);
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 1200);
  // };

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 py-2">
      <div className={`flex gap-3 w-full ${isUser ? "flex-row-reverse" : "flex-row"}`}>

        {/* Avatar */}
        <div className="flex-shrink-0">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center 
              transition-all duration-300 hover:scale-110
              shadow-[0_0_10px_rgba(120,0,255,0.6)]
              hover:shadow-[0_0_14px_rgba(170,80,255,0.9)]
              ${
                isBot
                  ? "bg-gradient-to-br from-purple-900 via-black to-purple-950"
                  : "bg-gradient-to-br from-black via-purple-950 to-black"
              }`}
          >
            {isBot ? (
              <Bot className="w-4 h-4 text-purple-300 drop-shadow-[0_0_4px_rgba(180,80,255,0.9)]" />
            ) : (
              <User className="w-4 h-4 text-purple-300 drop-shadow-[0_0_4px_rgba(180,80,255,0.9)]" />
            )}
          </div>
        </div>

        {/* Message Bubble */}
        <div className={`flex-1 min-w-0 max-w-[calc(100%-4rem)] ${isUser ? "mr-1" : "ml-1"}`}>
          <div
            className={`relative rounded-2xl px-4 py-3 shadow-lg backdrop-blur-md transition-all duration-300 
              hover:shadow-[0_0_16px_rgba(140,0,255,0.4)]
              ${
                isUser
                  ? "rounded-tr-md max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]"
                  : "rounded-tl-md border border-purple-900/40"
              }`}
          >

            {/* Copy Button (Bot Only)
            {isBot && (
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 opacity-70 hover:opacity-100 transition text-purple-300 hover:text-purple-100"
                title="Copy message"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}

            {/* Markdown Processing */}
            <div className="w-full overflow-hidden">
              <div
                className={`prose prose-sm sm:prose-base max-w-none prose-invert
                [&_*]:text-purple-200
                [&_strong]:text-purple-100
                [&_a]:text-purple-300 hover:[&_a]:text-purple-200
                [&_li]:marker:text-purple-400
                `}
              >
                <ReactMarkdown
                  components={{
                    /* ✅ Code Block with syntax highlighting */
                    pre: ({ children }) => (
                      <div className="relative group my-3">

                        {/* Copy button specifically for code */}
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(
                              typeof children === "string"
                                ? children
                                : children?.toString() || ""
                            )
                          }
                          className="absolute top-2 right-2 opacity-70 hover:opacity-100 transition text-purple-300 hover:text-purple-100"
                          title="Copy code"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <pre
                          className="overflow-x-auto whitespace-pre-wrap break-words rounded-xl p-3
                          bg-[#0d1117] border border-purple-950/60 shadow-inner
                          font-mono text-xs sm:text-sm text-purple-200"
                        >
                          <code className="hljs">{children}</code>
                        </pre>
                      </div>
                    ),

                    /* ✅ Inline Code */
                    code: ({ children, className, ...props }) => {
                      const isInline = !className?.includes("language-");
                      return isInline ? (
                        <code
                          {...props}
                          className="px-1.5 py-0.5 rounded font-mono text-xs sm:text-sm
                          bg-purple-900/40 border border-purple-800 text-purple-200"
                        >
                          {children}
                        </code>
                      ) : (
                        <code {...props} className="hljs">{children}</code>
                      );
                    },

                    p: ({ children }) => (
                      <p className="break-words leading-relaxed mb-2 last:mb-0 text-purple-200">
                        {children}
                      </p>
                    ),

                    ul: ({ children }) => (
                      <ul className="space-y-1 ml-4 text-purple-200">{children}</ul>
                    ),

                    ol: ({ children }) => (
                      <ol className="space-y-1 ml-4 text-purple-200">{children}</ol>
                    ),

                    blockquote: ({ children }) => (
                      <blockquote
                        className="border-l-4 pl-4 py-2 my-3 italic rounded-r-lg
                        border-purple-700 bg-purple-950/40 text-purple-300"
                      >
                        {children}
                      </blockquote>
                    ),

                    h1: ({ children }) => (
                      <h1 className="text-xl font-bold mb-3 text-purple-300">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-lg font-semibold mb-2 text-purple-300">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-base font-medium mb-2 text-purple-200">{children}</h3>
                    ),
                  }}
                >
                  {chat.message}
                </ReactMarkdown>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-purple-900/40">
              <span className="text-xs text-purple-400">{chat.timestamp}</span>

              {chat.status === "sending" && (
                <div className="flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin text-purple-300" />
                  <span className="text-xs text-purple-300">Sending...</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
