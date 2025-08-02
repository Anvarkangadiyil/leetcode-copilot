import type { Settings } from "@/types/type";
import { Brain, HelpCircle } from "lucide-react";


interface StatusSectionsProps {
  settings: Settings;
}

export const StatusSections = ({ settings }: StatusSectionsProps) => {
  return (
    <>
      {/* API Status */}
      <div className="p-3 rounded-lg bg-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-4 h-4" />
          <span className="text-sm font-medium">AI Status</span>
          <div
            className={`w-2 h-2 rounded-full ${
              settings.geminiApiKey ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </div>
        <p className="text-xs text-gray-400">
          {settings.geminiApiKey
            ? `Connected to ${settings.model}`
            : "API key required for AI responses"}
        </p>
      </div>

      {/* Help Section */}
      <div className="p-3 rounded-lg bg-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Need Help?</span>
        </div>
        <p className="text-xs text-gray-400">
          Visit our help center or contact support for assistance with your AI
          assistant.
        </p>
      </div>
    </>
  );
};