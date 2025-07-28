import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3">
      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-gradient-to-r from-blue-500 to-purple-600">
        <Bot className="w-3 h-3 text-white" />
      </div>
      <div className="rounded-2xl px-4 py-2 rounded-tl-md bg-gray-700 border border-gray-600">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <span className="text-xs text-gray-400">AI is thinking...</span>
        </div>
      </div>
    </div>
  );
};