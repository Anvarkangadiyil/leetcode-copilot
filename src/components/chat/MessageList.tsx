import { useEffect, useRef } from "react";
import type { Message } from "@/types/type";

import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ScrollArea } from "../ui/scroll-area";

interface MessageListProps {
  messages: Message[];
  isSending: boolean;
}

export const MessageList = ({ messages, isSending }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scroll the last element into view smoothly
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full w-full max-w-full">
        <div className="p-3 space-y-4">
          {messages.map((chat) => (
            <MessageBubble key={chat.id} chat={chat} />
          ))}

          {isSending && <TypingIndicator />}

          {/* ✅ This ensures auto-scroll works */}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
    </div>
  );
};
