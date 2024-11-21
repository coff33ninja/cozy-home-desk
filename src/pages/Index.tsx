import { SearchBar } from '@/components/SearchBar';
import { WeatherCalendarClock } from '@/components/WeatherCalendarClock';
import { MusicCard } from '@/components/MusicCard';
import { SettingsPanel } from '@/components/SettingsPanel';
import { MediaTab } from '@/components/MediaTab';
import { FavoritesList } from '@/components/FavoritesList';
import { YouTubeIntegration } from '@/components/YouTubeIntegration';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { getSettings } from '@/lib/localStorage';

const Index = () => {
  const settings = getSettings();

  return (
    <div className="min-h-screen p-8 text-gray-900 dark:text-white bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <div className="space-y-8 animate-fade-in">
        <SearchBar />
        
        <ResizablePanelGroup direction="vertical" className="min-h-[800px] rounded-lg">
          <ResizablePanel defaultSize={30}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={30} minSize={20}>
                <WeatherCalendarClock className="h-full" />
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={40} minSize={30}>
                <div className="h-full flex flex-col gap-4">
                  {settings.showMusic && <MusicCard />}
                  <YouTubeIntegration />
                  <FavoritesList />
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={30} minSize={20}>
                <MediaTab />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={70}>
            <SettingsPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;