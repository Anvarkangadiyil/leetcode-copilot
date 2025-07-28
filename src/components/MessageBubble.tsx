// MessageBubble.tsx
import { Bot, User, Loader2 } from "lucide-react";
import MarkdownMessage from "./MarkdownMessage";
import type { Message } from "@/types/type";

interface MessageBubbleProps {
  chat: Message;
}

export const MessageBubble = ({ chat }: MessageBubbleProps) => {
  return (
    <div
      className={`flex gap-3 ${
        chat.name === "user" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
          chat.name === "bot"
            ? "bg-gradient-to-r from-blue-500 to-purple-600"
            : "bg-gray-600"
        }`}
      >
        {chat.name === "bot" ? (
          <Bot className="w-3 h-3 text-white" />
        ) : (
          <User className="w-3 h-3 text-white" />
        )}
      </div>

      <div className="flex-1 max-w-[85%]">
        <div
          className={`rounded-2xl px-4 py-2 text-sm leading-relaxed ${
            chat.name === "bot"
              ? "bg-gray-700 border border-gray-600 text-gray-100 rounded-tl-md"
              : "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-md ml-auto"
          }`}
        >
          <p className="whitespace-pre-wrap">
            <MarkdownMessage content={chat.message} />
          </p>
          <div className="flex items-center justify-between mt-2">
            <p
              className={`text-xs ${
                chat.name === "bot" ? "text-gray-400" : "text-blue-100"
              }`}
            >
              {chat.timestamp}
            </p>
            {chat.status === "sending" && (
              <Loader2 className="w-3 h-3 animate-spin text-blue-300" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};