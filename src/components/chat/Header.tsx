////import { Bot, Settings, LogOut, Code2 } from "lucide-react";
import { Bot, Code2, LogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  onSettingsClick: () => void;
  onLogoutClick: () => void;
  currentProblem?: string;
}

export const Header = ({ 
  onSettingsClick, 
  onLogoutClick, 
  currentProblem 
}: HeaderProps) => {
  return (
    <div className="flex flex-col border-b shadow-sm bg-gray-800 border-gray-700">
      {/* Main Header Row */}
      <div className="flex items-center gap-3 p-3">
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
            className="p-2 hover:bg-gray-700 text-gray-300 hover:text-white"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            onClick={onLogoutClick}
            size="sm"
            variant="ghost"
            className="p-2 hover:bg-gray-700 text-gray-300 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Current Problem Row */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 p-2 bg-gray-700/50 rounded-lg border border-gray-600">
          <Code2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-xs text-gray-400 block">Current Problem:</span>
            <span className="text-sm font-medium text-white truncate block">
              {currentProblem || "No problem selected"}
            </span>
          </div>
          {currentProblem && (
            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};