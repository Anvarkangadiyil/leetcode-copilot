
import type { Settings as SettingType } from "@/types/type";
import { Bell, Settings, Sliders } from "lucide-react";


interface PreferencesSectionProps {
  settings: SettingType;
  onSettingsChange: (key: keyof SettingType, value: any) => void;
}

export const PreferencesSection = ({
  settings,
  onSettingsChange,
}: PreferencesSectionProps) => {
  const preferences = [
    {
      key: "notifications",
      label: "Enable notifications",
      icon: Bell,
    },
    {
      key: "soundEnabled",
      label: "Sound effects",
      icon: Settings,
    },
    {
      key: "autoScroll",
      label: "Auto-scroll messages",
      icon: Settings,
    },
  ];

  return (
    <div className="space-y-3">
      <h4 className="font-medium flex items-center gap-2">
        <Sliders className="w-4 h-4" />
        Preferences
      </h4>
      <div className="space-y-3">
        {preferences.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </div>
            <button
              onClick={() =>
                onSettingsChange(
                  key as keyof SettingType,
                  !settings[key as keyof SettingType]
                )
              }
              className={`w-11 h-6 rounded-full transition-colors ${
                settings[key as keyof SettingType]
                  ? "bg-blue-600"
                  : "bg-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  settings[key as keyof SettingType]
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
