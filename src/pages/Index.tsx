import { useEffect } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { WeatherWidget } from '@/components/WeatherWidget';
import { MusicCard } from '@/components/MusicCard';
import { FavoritesList } from '@/components/FavoritesList';
import { SettingsPanel } from '@/components/SettingsPanel';
import { getSettings } from '@/lib/localStorage';

const Index = () => {
  const settings = getSettings();

  useEffect(() => {
    // Apply settings to document
    document.documentElement.style.setProperty('--border-radius', 
      settings.roundedCorners ? '0.5rem' : '0');
    document.body.style.backgroundColor = settings.backgroundColor;
  }, []);

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="space-y-8 animate-fade-in">
        {/* Top row with weather and music */}
        <div className="flex justify-between items-start max-w-4xl mx-auto w-full">
          {settings.showWeather && <WeatherWidget />}
          {settings.showMusic && <MusicCard />}
        </div>

        {/* Search bar */}
        <div className="py-8">
          <SearchBar />
        </div>

        {/* Favorites */}
        <FavoritesList />

        {/* Settings */}
        <SettingsPanel />
      </div>
    </div>
  );
};

export default Index;