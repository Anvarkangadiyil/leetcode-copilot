import { Button } from "../ui/button";
import { Settings, X } from "lucide-react";

import type { Settings as SettingsType } from "@/types/type";
import { APIConfiguration } from "./ApiConfiguration";
import { StatusSections } from "./StatusSection";

interface SettingsModalProps {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  settings: SettingsType;
  showApiKey: boolean;
  setShowApiKey: (show: boolean) => void;
  onSettingsChange: (key: keyof SettingsType, value: any) => void;
}

export const SettingsModal = ({
  showSettings,
  setShowSettings,
  settings,
  showApiKey,
  setShowApiKey,
  onSettingsChange,
}: SettingsModalProps) => {
  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md rounded-2xl shadow-2xl bg-gray-800 text-white">
        {/* Settings Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </h3>
          <Button
            onClick={() => setShowSettings(false)}
            size="sm"
            variant="ghost"
            className="p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Settings Content */}
        <div className="p-4 space-y-6 max-h-96 overflow-y-auto">
          <APIConfiguration
            settings={settings}
            showApiKey={showApiKey}
            setShowApiKey={setShowApiKey}
            onSettingsChange={onSettingsChange}
          />
          

          
          <StatusSections settings={settings} />
        </div>

        {/* Settings Footer */}
        <div className="p-4 border-t border-gray-700">
          <Button
            onClick={() => setShowSettings(false)}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};