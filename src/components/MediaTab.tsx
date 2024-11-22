import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker } from './settings/ColorPicker';
import { getSettings, updateSettings } from '@/lib/localStorage';
import { useState, useEffect } from 'react';
import { 
  fetchRadarrQueue, 
  fetchSonarrQueue, 
  fetchLidarrQueue,
  fetchQBittorrentData 
} from '@/lib/mediaServices';
import { serviceIcons } from '@/lib/icons';
import { MediaQueue } from './media/MediaQueue';
import { QueueList } from './media/QueueList';
import { Card } from './ui/card';
import { AspectRatio } from './ui/aspect-ratio';

export const MediaTab = () => {
  const settings = getSettings();
  const [bgColor, setBgColor] = useState(settings.mediaCardBg || '#1a1a1a');
  const [currentMedia, setCurrentMedia] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('arr');
  const [currentPlaylist, setCurrentPlaylist] = useState<any[]>([]);
  const [playlistType, setPlaylistType] = useState<'queue' | 'episodes' | null>(null);

  const handleColorChange = (color: string) => {
    setBgColor(color);
    const newSettings = { ...settings, mediaCardBg: color };
    updateSettings(newSettings);
  };

  const { data: radarrData } = useQuery({
    queryKey: ['radarrQueue'],
    queryFn: fetchRadarrQueue,
    refetchInterval: 30000,
  });

  const { data: sonarrData } = useQuery({
    queryKey: ['sonarrQueue'],
    queryFn: fetchSonarrQueue,
    refetchInterval: 30000,
  });

  const { data: lidarrData } = useQuery({
    queryKey: ['lidarrQueue'],
    queryFn: fetchLidarrQueue,
    refetchInterval: 30000,
  });

  const { data: qbittorrentData } = useQuery({
    queryKey: ['qbittorrentData'],
    queryFn: fetchQBittorrentData,
    refetchInterval: 30000,
  });

  const RadarrIcon = serviceIcons.radarr;
  const QbittorrentIcon = serviceIcons.qbittorrent;

  useEffect(() => {
    const handleMediaUpdate = (event: CustomEvent) => {
      const { media, playlist, type } = event.detail;
      setCurrentMedia(media);
      setCurrentPlaylist(playlist || []);
      setPlaylistType(type || 'queue');
      setActiveTab('queue');
    };

    window.addEventListener('mediaUpdate' as any, handleMediaUpdate);
    return () => {
      window.removeEventListener('mediaUpdate' as any, handleMediaUpdate);
    };
  }, []);

  const renderMediaPlayer = () => {
    if (!currentMedia) return null;

    return (
      <Card style={{ backgroundColor: bgColor }} className="relative p-dynamic-4">
        {currentMedia.includes('youtube.com') ? (
          <AspectRatio ratio={16 / 9}>
            <iframe
              src={currentMedia}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatio>
        ) : currentMedia.includes('http') && !currentMedia.includes('.m3u8') ? (
          <audio
            src={currentMedia}
            controls
            autoPlay
            className="w-full"
          />
        ) : (
          <AspectRatio ratio={16 / 9}>
            <video
              src={currentMedia}
              controls
              autoPlay
              className="w-full h-full rounded-lg"
            />
          </AspectRatio>
        )}
      </Card>
    );
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="arr" className="text-dynamic-base">
          <div className="flex items-center gap-2">
            <RadarrIcon className="w-4 h-4" />
            *Arr Services
          </div>
        </TabsTrigger>
        <TabsTrigger value="torrent" className="text-dynamic-base">
          <div className="flex items-center gap-2">
            <QbittorrentIcon className="w-4 h-4" />
            qBittorrent
          </div>
        </TabsTrigger>
        <TabsTrigger value="queue" className="text-dynamic-base">
          <div className="flex items-center gap-2">
            Up Next
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="arr" className="mt-dynamic-4">
        <QueueList
          radarrData={radarrData || []}
          sonarrData={sonarrData || []}
          lidarrData={lidarrData || []}
          bgColor={bgColor}
        />
      </TabsContent>

      <TabsContent value="torrent" className="mt-dynamic-4">
        {/* Add torrent content here */}
      </TabsContent>

      <TabsContent value="queue" className="mt-dynamic-4 space-y-4">
        {renderMediaPlayer()}
        <MediaQueue
          currentMedia={currentMedia}
          playlist={currentPlaylist}
          onPlaylistItemClick={setCurrentMedia}
          bgColor={bgColor}
          type={playlistType}
        />
      </TabsContent>

      <div className="absolute top-2 right-2">
        <ColorPicker color={bgColor} onChange={handleColorChange} />
      </div>
    </Tabs>
  );
};