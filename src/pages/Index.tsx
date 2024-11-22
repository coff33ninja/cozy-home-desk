import { SearchBar } from '@/components/SearchBar';
import { WeatherCalendarClock } from '@/components/WeatherCalendarClock';
import { MusicCard } from '@/components/MusicCard';
import { SettingsPanel } from '@/components/SettingsPanel';
import { MediaTab } from '@/components/MediaTab';
import { FavoritesList } from '@/components/FavoritesList';
import { YouTubeIntegration } from '@/components/YouTubeIntegration';
import { getSettings } from '@/lib/localStorage';
import { useState, useEffect } from 'react';
import { DraggableWidget } from '@/components/layout/DraggableWidget';
import { LayoutManager } from '@/components/layout/LayoutManager';

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

  const renderWidgets = () => {
    if (isMediaPlaying) {
      return [
        <DraggableWidget id="media" title="Media Player" key="media">
          <MediaTab />
        </DraggableWidget>,
        <DraggableWidget id="search" title="Search" key="search">
          <SearchBar />
        </DraggableWidget>,
        {settings.showMusic && (
          <DraggableWidget id="music" title="Music" key="music">
            <MusicCard />
          </DraggableWidget>
        )},
        <DraggableWidget id="youtube" title="YouTube" key="youtube">
          <YouTubeIntegration />
        </DraggableWidget>,
        <DraggableWidget id="weather" title="Weather & Calendar" key="weather">
          <WeatherCalendarClock className="h-full min-h-[600px]" />
        </DraggableWidget>,
        <DraggableWidget id="favorites" title="Favorites" key="favorites">
          <FavoritesList />
        </DraggableWidget>
      ].filter(Boolean);
    }

    return [
      <DraggableWidget id="weather" title="Weather & Calendar" key="weather">
        <WeatherCalendarClock className="h-full min-h-[600px]" />
      </DraggableWidget>,
      <DraggableWidget id="search" title="Search" key="search">
        <SearchBar />
      </DraggableWidget>,
      {settings.showMusic && (
        <DraggableWidget id="music" title="Music" key="music">
          <MusicCard />
        </DraggableWidget>
      )},
      <DraggableWidget id="youtube" title="YouTube" key="youtube">
        <YouTubeIntegration />
      </DraggableWidget>,
      <DraggableWidget id="media" title="Media Queue" key="media">
        <MediaTab />
      </DraggableWidget>,
      <DraggableWidget id="favorites" title="Favorites" key="favorites">
        <FavoritesList />
      </DraggableWidget>
    ].filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <LayoutManager>
          {renderWidgets()}
        </LayoutManager>
      </div>
      <SettingsPanel />
    </div>
  );
};

export default Index;