
import type { Message } from "@/types/type";

import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ScrollArea } from "../ui/scroll-area";


interface MessageListProps {
  messages: Message[];
  isSending: boolean;
}

export const MessageList = ({ messages, isSending }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full w-full max-w-full">
        <div className="p-3 space-y-4">
          {messages.map((chat) => (
            <MessageBubble key={chat.id} chat={chat} />
          ))}
          {isSending && <TypingIndicator />}
        </div>
      </ScrollArea>
    </div>
  );
};