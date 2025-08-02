// MessageBubble.tsx
import { Bot, User, Loader2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import type { Message } from "@/types/type";

interface MessageBubbleProps {
  chat: Message;
}

export const MessageBubble = ({ chat }: MessageBubbleProps) => {
  const isUser = chat.name === "user";
  const isBot = chat.name === "model";

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 py-2">
      <div className={`flex gap-3 w-full ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          <div
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105
              ${isBot
                ? "bg-gradient-to-r from-blue-500 to-purple-600"
                : "bg-gray-600"
              }`}
          >
            {isBot ? (
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-sm" />
            ) : (
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-sm" />
            )}
          </div>
        </div>

        {/* Message Container */}
        <div className={`flex-1 min-w-0 max-w-[calc(100%-4rem)] ${isUser ? "mr-1" : "ml-1"}`}>
          <div
            className={`relative rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl
              ${isUser
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-md ml-auto max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]"
                : "bg-slate-700 border border-slate-600 text-slate-100 rounded-tl-md"
              }`}
          >
            
            {/* Message Content */}
            <div className="w-full overflow-hidden">
              <div className={`prose prose-sm sm:prose-base max-w-none 
                ${isUser 
                  ? "prose-invert [&_*]:text-white [&_code]:bg-white/20 [&_pre]:bg-white/10" 
                  : "prose-invert [&_*]:text-slate-100 [&_code]:bg-slate-800 [&_pre]:bg-slate-800"
                }`}>
                <ReactMarkdown 
                  components={{
                  
                    pre: ({ children, ...props }) => (
                      <pre 
                        {...props} 
                        className={`overflow-x-auto whitespace-pre-wrap break-words rounded-lg p-3 my-3 text-xs sm:text-sm font-mono shadow-inner border
                          ${isUser
                            ? "bg-white/10 border-white/20 text-white"
                            : "bg-slate-800 border-slate-600 text-slate-100"
                          }`}
                      >
                        {children}
                      </pre>
                    ),
                    
          
                    code: ({ children, className, ...props }) => {
                      const isInline = !className?.includes('language-');
                      return isInline ? (
                        <code 
                          {...props} 
                          className={`px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono break-all shadow-sm
                            ${isUser
                              ? "bg-white/20 text-white border border-white/30"
                              : "bg-slate-800 text-slate-100 border border-slate-600"
                            }`}
                        >
                          {children}
                        </code>
                      ) : (
                        <code {...props} className="break-all whitespace-pre-wrap font-mono text-xs sm:text-sm">
                          {children}
                        </code>
                      );
                    },
                    
                    p: ({ children, ...props }) => (
                      <p {...props} className="break-words overflow-wrap-anywhere leading-relaxed mb-2 last:mb-0">
                        {children}
                      </p>
                    ),
                    
                    ul: ({ children, ...props }) => (
                      <ul {...props} className="space-y-1 ml-4">
                        {children}
                      </ul>
                    ),
                    
                    ol: ({ children, ...props }) => (
                      <ol {...props} className="space-y-1 ml-4">
                        {children}
                      </ol>
                    ),
                    
                    // Enhanced blockquote styling
                    blockquote: ({ children, ...props }) => (
                      <blockquote 
                        {...props} 
                        className={`border-l-4 pl-4 py-2 my-3 italic rounded-r-lg
                          ${isUser
                            ? "border-white/40 bg-white/10"
                            : "border-slate-500 bg-slate-800/50"
                          }`}
                      >
                        {children}
                      </blockquote>
                    ),
                    
                    // Enhanced heading styling
                    h1: ({ children, ...props }) => (
                      <h1 {...props} className="text-lg sm:text-xl font-bold mb-3 break-words">
                        {children}
                      </h1>
                    ),
                    
                    h2: ({ children, ...props }) => (
                      <h2 {...props} className="text-base sm:text-lg font-semibold mb-2 break-words">
                        {children}
                      </h2>
                    ),
                    
                    h3: ({ children, ...props }) => (
                      <h3 {...props} className="text-sm sm:text-base font-medium mb-2 break-words">
                        {children}
                      </h3>
                    ),
                  }}
                >
                  {chat.message}
                </ReactMarkdown>
              </div>
            </div>
            
            {/* Message Footer */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t  border-slate-600/50 gap-2">
              <span
                className={`text-xs font-medium flex-shrink-0 
                  ${isUser 
                    ? "text-blue-100" 
                    : "text-slate-400"
                  }`}
              >
                {chat.timestamp}
              </span>
              
              {chat.status === "sending" && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Loader2 className={`w-3 h-3 animate-spin 
                    ${isUser ? "text-blue-300" : "text-slate-400"}
                  `} />
                  <span className={`text-xs 
                    ${isUser ? "text-blue-100" : "text-slate-400"}
                  `}>
                    Sending...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};