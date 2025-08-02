
import { Send, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface MessageInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSend: () => void;
  isSending: boolean;
  onKeyPress: (e: React.KeyboardEvent) => void;
}



export const MessageInput = ({
  inputValue,
  setInputValue,
  onSend,
  isSending,
  onKeyPress,
}: MessageInputProps) => {
  return (
    <div className="p-3 border-t bg-gray-800 border-gray-700">
      <div className="flex items-end gap-2 rounded-xl border p-2 bg-gray-700 border-gray-600">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={onKeyPress}
          className="flex-1 bg-transparent border-0 text-sm resize-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-2 py-1 min-h-[36px] text-white placeholder:text-gray-400"
          placeholder="Type your message..."
          disabled={isSending}
        />
        <Button
          onClick={onSend}
          disabled={!inputValue.trim() || isSending}
          size="sm"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg px-3 py-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="flex justify-center mt-2">
        <div className="text-xs text-gray-500">
          {isSending ? "Sending..." : "Press Enter to send"}
        </div>
      </div>
    </div>
  );
};