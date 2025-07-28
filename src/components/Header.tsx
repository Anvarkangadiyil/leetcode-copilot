import { Button } from "./ui/button";
import { Bot, Settings, LogOut } from "lucide-react";

interface HeaderProps {
  onSettingsClick: () => void;
  onLogoutClick: () => void;
}

export const Header = ({ onSettingsClick, onLogoutClick }: HeaderProps) => {
  return (
    <div className="flex items-center gap-3 p-3 border-b shadow-sm bg-gray-800 border-gray-700">
      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-semibold truncate">Leet Code Copilot</h2>
        <p className="text-xs text-gray-400">Online • Ready to help</p>
      </div>

      <div className="flex items-center gap-1">
        <Button
          onClick={onSettingsClick}
          size="sm"
          variant="ghost"
          className="p-2 hover:bg-gray-700 text-gray-300"
        >
          <Settings className="w-4 h-4" />
        </Button>
        <Button
          onClick={onLogoutClick}
          size="sm"
          variant="ghost"
          className="p-2 hover:bg-gray-700 text-gray-300"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};