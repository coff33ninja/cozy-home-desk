import { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Settings } from '@/types/types';
import { getSettings, updateSettings } from '@/lib/localStorage';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(getSettings());

  const handleSettingChange = (key: keyof Settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    updateSettings(newSettings);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-12 h-12 bg-white/10 backdrop-blur-sm"
      >
        <SettingsIcon className="w-6 h-6" />
      </Button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 p-4 bg-white/10 backdrop-blur-sm 
                      rounded-lg animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Rounded Corners</span>
              <Switch
                checked={settings.roundedCorners}
                onCheckedChange={(checked) => handleSettingChange('roundedCorners', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Show Weather</span>
              <Switch
                checked={settings.showWeather}
                onCheckedChange={(checked) => handleSettingChange('showWeather', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Show Music</span>
              <Switch
                checked={settings.showMusic}
                onCheckedChange={(checked) => handleSettingChange('showMusic', checked)}
              />
            </div>

            <div className="space-y-2">
              <span>Background Color</span>
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};