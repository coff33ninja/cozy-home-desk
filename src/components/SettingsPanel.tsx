import { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Settings } from '@/types/types';
import { ServiceCredentials } from '@/types/types';
import { getSettings, updateSettings } from '@/lib/localStorage';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const THEMES = {
  default: {
    primary: '#9b87f5',
    background: '#1A1F2C',
  },
  ocean: {
    primary: '#0EA5E9',
    background: '#0C4A6E',
  },
  forest: {
    primary: '#22C55E',
    background: '#14532D',
  },
  sunset: {
    primary: '#F97316',
    background: '#7C2D12',
  },
};

export const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(getSettings());

  const handleSettingChange = (key: keyof Settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    updateSettings(newSettings);

    if (key === 'theme') {
      const theme = THEMES[value as keyof typeof THEMES];
      document.documentElement.style.setProperty('--primary', theme.primary);
      document.documentElement.style.setProperty('--background', theme.background);
    }

    if (key === 'wallpaperUrl') {
      if (value) {
        document.body.style.backgroundImage = `url(${value})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
      } else {
        document.body.style.backgroundImage = '';
      }
    }
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
        <div className="absolute bottom-16 right-0 w-96 p-4 bg-white/10 backdrop-blur-sm rounded-lg animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">Settings</h3>
          
          <Tabs defaultValue="ui" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="ui">UI Layout</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>

            <TabsContent value="ui" className="space-y-6">
              <div className="space-y-4">
                <Label>Theme</Label>
                <RadioGroup
                  value={settings.theme || 'default'}
                  onValueChange={(value) => handleSettingChange('theme', value)}
                  className="grid grid-cols-2 gap-2"
                >
                  {Object.keys(THEMES).map((theme) => (
                    <div key={theme} className="flex items-center space-x-2">
                      <RadioGroupItem value={theme} id={theme} />
                      <Label htmlFor={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>Wallpaper</Label>
                <input
                  type="url"
                  placeholder="Enter wallpaper URL"
                  value={settings.wallpaperUrl || ''}
                  onChange={(e) => handleSettingChange('wallpaperUrl', e.target.value)}
                  className="w-full px-3 py-2 rounded bg-white/20"
                />
              </div>

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
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <div className="space-y-4">
                <Label>Media Services Configuration</Label>
                {['radarr', 'sonarr', 'lidarr', 'qbittorrent'].map((service) => (
                  <div key={service} className="space-y-2">
                    <Label>{service.charAt(0).toUpperCase() + service.slice(1)}</Label>
                    <input
                      type="url"
                      placeholder="URL"
                      value={(settings[`${service}Credentials` as keyof Settings] as ServiceCredentials)?.url || ''}
                      onChange={(e) =>
                        handleSettingChange(`${service}Credentials` as keyof Settings, {
                          ...(settings[`${service}Credentials` as keyof Settings] as ServiceCredentials),
                          url: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded bg-white/20 mb-2"
                    />
                    <input
                      type="text"
                      placeholder="API Key"
                      value={(settings[`${service}Credentials` as keyof Settings] as ServiceCredentials)?.apiKey || ''}
                      onChange={(e) =>
                        handleSettingChange(`${service}Credentials` as keyof Settings, {
                          ...(settings[`${service}Credentials` as keyof Settings] as ServiceCredentials),
                          apiKey: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded bg-white/20"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Label>Weather Service</Label>
                <input
                  type="text"
                  placeholder="Weather API Key"
                  value={settings.weatherApiKey || ''}
                  onChange={(e) => handleSettingChange('weatherApiKey', e.target.value)}
                  className="w-full px-3 py-2 rounded bg-white/20"
                />
              </div>

              <div className="space-y-4">
                <Label>IPTV Configuration</Label>
                <input
                  type="url"
                  placeholder="M3U Playlist URL"
                  value={settings.iptvPlaylistUrl || ''}
                  onChange={(e) => handleSettingChange('iptvPlaylistUrl', e.target.value)}
                  className="w-full px-3 py-2 rounded bg-white/20"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};