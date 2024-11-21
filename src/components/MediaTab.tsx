import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColorPicker } from './settings/ColorPicker';
import { getSettings, updateSettings } from '@/lib/localStorage';
import { useState } from 'react';
import { 
  fetchRadarrQueue, 
  fetchSonarrQueue, 
  fetchLidarrQueue,
  fetchQBittorrentData 
} from '@/lib/mediaServices';

export const MediaTab = () => {
  const settings = getSettings();
  const [bgColor, setBgColor] = useState(settings.mediaCardBg || 'rgba(255, 255, 255, 0.1)');

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

  return (
    <Tabs defaultValue="arr" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="arr">*Arr Services</TabsTrigger>
        <TabsTrigger value="torrent">qBittorrent</TabsTrigger>
      </TabsList>
      <TabsContent value="arr" className="mt-4">
        <Card style={{ backgroundColor: bgColor }} className="relative">
          <div className="absolute top-2 right-2">
            <ColorPicker color={bgColor} onChange={handleColorChange} />
          </div>
          <CardHeader>
            <CardTitle>*Arr Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Radarr Queue</h3>
                {radarrData?.length ? (
                  <ul className="space-y-2">
                    {radarrData.map((item: any) => (
                      <li key={item.id} className="text-sm">
                        {item.title} - {item.status}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No movies in queue</p>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Sonarr Queue</h3>
                {sonarrData?.length ? (
                  <ul className="space-y-2">
                    {sonarrData.map((item: any) => (
                      <li key={item.id} className="text-sm">
                        {item.series.title} - {item.episode.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No shows in queue</p>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Lidarr Queue</h3>
                {lidarrData?.length ? (
                  <ul className="space-y-2">
                    {lidarrData.map((item: any) => (
                      <li key={item.id} className="text-sm">
                        {item.artist.artistName} - {item.album.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No music in queue</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="torrent" className="mt-4">
        <Card style={{ backgroundColor: bgColor }} className="relative">
          <div className="absolute top-2 right-2">
            <ColorPicker color={bgColor} onChange={handleColorChange} />
          </div>
          <CardHeader>
            <CardTitle>qBittorrent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qbittorrentData?.length ? (
              <ul className="space-y-2">
                {qbittorrentData.map((torrent: any) => (
                  <li key={torrent.hash} className="text-sm">
                    <div className="flex justify-between items-center">
                      <span>{torrent.name}</span>
                      <span>{Math.round(torrent.progress * 100)}%</span>
                    </div>
                    <div className="w-full bg-secondary h-1 rounded-full mt-1">
                      <div 
                        className="bg-primary h-1 rounded-full" 
                        style={{ width: `${torrent.progress * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No active torrents</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
