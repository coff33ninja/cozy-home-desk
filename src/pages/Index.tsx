import { useEffect } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { WeatherWidget } from '@/components/WeatherWidget';
import { MusicCard } from '@/components/MusicCard';
import { FavoritesList } from '@/components/FavoritesList';
import { SettingsPanel } from '@/components/SettingsPanel';
import { Calendar } from '@/components/Calendar';
import { MediaTab } from '@/components/MediaTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSettings } from '@/lib/localStorage';

const Index = () => {
  const settings = getSettings();

  useEffect(() => {
    // Apply settings to document
    document.documentElement.style.setProperty('--border-radius', 
      settings.roundedCorners ? '0.5rem' : '0');
    if (settings.wallpaperUrl) {
      document.body.style.backgroundImage = `url(${settings.wallpaperUrl})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    }
  }, []);

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="space-y-8 animate-fade-in">
        {/* Top row with weather, calendar and music */}
        <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto w-full">
          {settings.showWeather && <WeatherWidget />}
          <Calendar />
          {settings.showMusic && <MusicCard />}
        </div>

        {/* Search bar */}
        <div className="py-8">
          <SearchBar />
        </div>

        {/* Tabs for Favorites and Media */}
        <Tabs defaultValue="favorites" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="media">Media Services</TabsTrigger>
          </TabsList>
          <TabsContent value="favorites">
            <FavoritesList />
          </TabsContent>
          <TabsContent value="media">
            <MediaTab />
          </TabsContent>
        </Tabs>

        {/* Settings */}
        <SettingsPanel />
      </div>
    </div>
  );
};

export default Index;