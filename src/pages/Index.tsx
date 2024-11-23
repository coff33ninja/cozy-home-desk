import { SearchBar } from '@/components/SearchBar';
import { WeatherCalendarClock } from '@/components/WeatherCalendarClock';
import { MediaPlayer } from '@/components/MediaPlayer';
import { SettingsPanel } from '@/components/SettingsPanel';
import { MediaTab } from '@/components/MediaTab';
import { FavoritesList } from '@/components/FavoritesList';
import { YouTubeIntegration } from '@/components/YouTubeIntegration';
import { getSettings } from '@/lib/localStorage';
import { useState, useEffect } from 'react';
import { DraggableWidget } from '@/components/layout/DraggableWidget';
import { LayoutManager } from '@/components/layout/LayoutManager';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const settings = getSettings();
  const [isMediaPlaying, setIsMediaPlaying] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const handleMediaUpdate = () => {
      setIsMediaPlaying(true);
    };

    window.addEventListener('mediaUpdate', handleMediaUpdate);
    return () => {
      window.removeEventListener('mediaUpdate', handleMediaUpdate);
    };
  }, []);

  const renderWidgets = () => {
    const baseWidgets = [
      <div key="search" className="w-full fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-2xl px-4">
        <SearchBar />
      </div>,
      <div className="grid grid-cols-12 gap-4 mt-20" key="main-content">
        <div className="col-span-3">
          <DraggableWidget id="weather" title="Weather & Calendar">
            <WeatherCalendarClock className="h-full" />
          </DraggableWidget>
        </div>
        <div className="col-span-6">
          <DraggableWidget id="media" title="Media Player">
            <div className="space-y-4">
              <MediaPlayer />
              <YouTubeIntegration />
            </div>
          </DraggableWidget>
        </div>
        <div className="col-span-3">
          <DraggableWidget id="queue" title="Media Queue">
            <MediaTab />
          </DraggableWidget>
        </div>
      </div>
    ];

    return baseWidgets;
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFavorites(!showFavorites)}
            className="rounded-full w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            <Star className="w-6 h-6" />
          </Button>
        </div>
        {showFavorites && (
          <div className="fixed right-4 top-20 z-50 w-96">
            <FavoritesList />
          </div>
        )}
        <LayoutManager>
          {renderWidgets()}
        </LayoutManager>
      </div>
      <SettingsPanel />
    </div>
  );
};

export default Index;