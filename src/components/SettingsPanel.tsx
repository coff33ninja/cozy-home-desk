import { useState, useEffect, useRef } from 'react';
import { Settings as SettingsIcon, Check } from 'lucide-react';
import { Settings } from '@/types/types';
import { getSettings, updateSettings } from '@/lib/localStorage';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UISettingsTab } from './settings/UISettingsTab';
import { ServicesTab } from './settings/ServicesTab';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

export const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(getSettings());
  const [pendingSettings, setPendingSettings] = useState<Settings>(settings);
  const panelRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
    setPendingSettings(prev => ({ ...prev, [key]: value }));
  };

  const applySettings = () => {
    setSettings(pendingSettings);
    updateSettings(pendingSettings);

    // Apply card styling to all cards
    document.documentElement.style.setProperty('--card-text-color', pendingSettings.theme.cardTextColor || '#ffffff');
    document.documentElement.style.setProperty('--card-border-color', pendingSettings.theme.cardBorderColor || '#333333');
    document.documentElement.style.setProperty('--card-border-style', pendingSettings.theme.cardBorderStyle || 'solid');
    document.documentElement.style.setProperty('--card-background-color', pendingSettings.theme.cardBackgroundColor || '#1a1a1a');
    
    if (pendingSettings.theme.cardBackgroundImage) {
      document.documentElement.style.setProperty('--card-background-image', `url(${pendingSettings.theme.cardBackgroundImage})`);
    } else {
      document.documentElement.style.setProperty('--card-background-image', 'none');
    }

    toast({
      title: "Settings Applied",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
      >
        <SettingsIcon className="w-6 h-6" />
      </Button>

      {isOpen && (
        <div 
          ref={panelRef} 
          className="absolute bottom-16 right-0 w-[90vw] sm:w-96 p-4 bg-dark-card rounded-lg animate-fade-in shadow-lg border border-dark-border"
        >
          <h3 className="text-lg font-semibold mb-4">Settings</h3>
          
          <Tabs defaultValue="ui" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="ui">UI Layout</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>

            <div className="h-[400px]">
              <TabsContent value="ui" className="mt-0 h-full">
                <ScrollArea className="h-full pr-4">
                  <UISettingsTab settings={pendingSettings} onSettingChange={handleSettingChange} />
                </ScrollArea>
              </TabsContent>

              <TabsContent value="services" className="mt-0 h-full">
                <ScrollArea className="h-full pr-4">
                  <ServicesTab settings={pendingSettings} onSettingChange={handleSettingChange} />
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>

          <div className="mt-4 flex justify-end">
            <Button 
              onClick={applySettings}
              className="flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Apply Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};