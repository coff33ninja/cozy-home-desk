import { useState, useEffect, useRef } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Settings } from '@/types/types';
import { getSettings, updateSettings } from '@/lib/localStorage';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UISettingsTab } from './settings/UISettingsTab';
import { ServicesTab } from './settings/ServicesTab';
import { ScrollArea } from "@/components/ui/scroll-area";

export const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(getSettings());
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSettingChange = (key: keyof Settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    updateSettings(newSettings);

    // Apply card styling to all cards
    document.documentElement.style.setProperty('--card-text-color', newSettings.theme.cardTextColor || '#000000');
    document.documentElement.style.setProperty('--card-border-color', newSettings.theme.cardBorderColor || '#e2e8f0');
    document.documentElement.style.setProperty('--card-border-style', newSettings.theme.cardBorderStyle || 'solid');
    document.documentElement.style.setProperty('--card-background-color', newSettings.theme.cardBackgroundColor || '#ffffff');
    
    if (newSettings.theme.cardBackgroundImage) {
      document.documentElement.style.setProperty('--card-background-image', `url(${newSettings.theme.cardBackgroundImage})`);
    } else {
      document.documentElement.style.setProperty('--card-background-image', 'none');
    }

    if (key === 'nightMode') {
      if (value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-12 h-12 bg-white dark:bg-gray-800"
      >
        <SettingsIcon className="w-6 h-6" />
      </Button>

      {isOpen && (
        <div ref={panelRef} className="absolute bottom-16 right-0 w-96 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-fade-in shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Settings</h3>
          
          <Tabs defaultValue="ui" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="ui">UI Layout</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>

            <div className="h-[400px]">
              <TabsContent value="ui" className="mt-0 h-full">
                <ScrollArea className="h-full pr-4">
                  <UISettingsTab settings={settings} onSettingChange={handleSettingChange} />
                </ScrollArea>
              </TabsContent>

              <TabsContent value="services" className="mt-0 h-full">
                <ScrollArea className="h-full pr-4">
                  <ServicesTab settings={settings} onSettingChange={handleSettingChange} />
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
    </div>
  );
};