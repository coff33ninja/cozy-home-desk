import { SearchBar } from '@/components/SearchBar';
import { WeatherCalendarClock } from '@/components/WeatherCalendarClock';
import { MusicCard } from '@/components/MusicCard';
import { SettingsPanel } from '@/components/SettingsPanel';
import { MediaTab } from '@/components/MediaTab';
import { FavoritesList } from '@/components/FavoritesList';
import { YouTubeIntegration } from '@/components/YouTubeIntegration';
import { getSettings } from '@/lib/localStorage';
import { useState, useEffect } from 'react';

const Index = () => {
  const settings = getSettings();
  const [isMediaPlaying, setIsMediaPlaying] = useState(false);

  useEffect(() => {
    const handleMediaUpdate = () => {
      setIsMediaPlaying(true);
    };

    window.addEventListener('mediaUpdate', handleMediaUpdate);
    return () => {
      window.removeEventListener('mediaUpdate', handleMediaUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isMediaPlaying ? (
            <>
              <div className="col-span-1 md:col-span-2">
                <MediaTab />
              </div>
              <div className="space-y-6">
                <SearchBar />
                {settings.showMusic && <MusicCard />}
                <YouTubeIntegration />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <WeatherCalendarClock className="h-full min-h-[600px]" />
              </div>
              <div className="space-y-6">
                <FavoritesList />
              </div>
            </>
          ) : (
            <>
              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <WeatherCalendarClock className="h-full min-h-[600px]" />
              </div>
              <div className="space-y-6">
                <SearchBar />
                {settings.showMusic && <MusicCard />}
                <YouTubeIntegration />
              </div>
              <div className="space-y-6">
                <MediaTab />
                <FavoritesList />
              </div>
            </>
          )}
        </div>
      </div>
      
      <SettingsPanel />
    </div>
  );
};

export default Index;