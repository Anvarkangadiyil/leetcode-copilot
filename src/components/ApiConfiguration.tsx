
import type { Settings } from "@/types/type";
import { Input } from "./ui/input";
import { Key, Eye, EyeOff } from "lucide-react";


interface APIConfigurationProps {
  settings: Settings;
  showApiKey: boolean;
  setShowApiKey: (show: boolean) => void;
  onSettingsChange: (key: keyof Settings, value: any) => void;
}

export const APIConfiguration = ({
  settings,
  showApiKey,
  setShowApiKey,
  onSettingsChange,
}: APIConfigurationProps) => {
  return (
    <div className="space-y-3">
      <h4 className="font-medium flex items-center gap-2">
        <Key className="w-4 h-4" />
        API Configuration
      </h4>
      <div className="space-y-3">
        {/* API Key */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Gemini API Key</label>
          <div className="relative">
            <Input
              type={showApiKey ? "text" : "password"}
              value={settings.geminiApiKey}
              onChange={(e) =>
                onSettingsChange("geminiApiKey", e.target.value)
              }
              placeholder="Enter your Gemini API key"
              className="pr-10 bg-gray-700 border-gray-600 text-white"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showApiKey ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400">
            Get your API key from{" "}
            <a
              href="https://makersuite.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Google AI Studio
            </a>
          </p>
        </div>

        {/* Model Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Model</label>
          <select
            value={settings.model}
            onChange={(e) => onSettingsChange("model", e.target.value)}
            className="w-full p-2 rounded-lg border text-sm bg-gray-700 border-gray-600 text-white"
          >
            <option value="gemini-pro">Gemini Pro</option>
            <option value="gemini-pro-vision">Gemini Pro Vision</option>
          </select>
        </div>

        {/* Temperature */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Temperature</label>
            <span className="text-xs text-gray-500">{settings.temperature}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.temperature}
            onChange={(e) =>
              onSettingsChange("temperature", parseFloat(e.target.value))
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Focused</span>
            <span>Creative</span>
          </div>
        </div>

        {/* Max Tokens */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Max Tokens</label>
          <Input
            type="number"
            min="100"
            max="4000"
            value={settings.maxTokens}
            onChange={(e) =>
              onSettingsChange("maxTokens", parseInt(e.target.value))
            }
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
      </div>
    </div>
  );
};
