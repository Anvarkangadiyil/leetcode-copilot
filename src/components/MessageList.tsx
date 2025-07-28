import { ScrollArea } from "./ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import type { Message } from "@/types/type";


interface MessageListProps {
  messages: Message[];
  isSending: boolean;
}

export const MessageList = ({ messages, isSending }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full">
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