import { useState } from 'react';
import { Music, Radio, Tv } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { parseM3U } from '@/lib/m3uParser';
import { ColorPicker } from './settings/ColorPicker';
import { getSettings, updateSettings } from '@/lib/localStorage';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import DOMPurify from 'dompurify';

interface Channel {
  name: string;
  url: string;
  logo?: string;
}

export const MusicCard = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [iptvUrl, setIptvUrl] = useState('');
  const [radioUrl, setRadioUrl] = useState('');
  const [currentMedia, setCurrentMedia] = useState<string | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const { toast } = useToast();
  const settings = getSettings();
  const [bgColor, setBgColor] = useState(settings.musicCardBg || 'rgba(255, 255, 255, 0.1)');

  const handleColorChange = (color: string) => {
    setBgColor(color);
    const newSettings = { ...settings, musicCardBg: color };
    updateSettings(newSettings);
  };

  const handleYoutubePlay = (url: string) => {
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube Music URL",
        variant: "destructive",
      });
      return;
    }
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('youtu.be/')[1];
    setCurrentMedia(DOMPurify.sanitize(`https://www.youtube.com/embed/${videoId}?autoplay=1`));
  };

  const handleIPTVLoad = async (url: string) => {
    try {
      const response = await fetch(url);
      const content = await response.text();
      const parsedChannels = parseM3U(content);
      setChannels(parsedChannels);
      toast({
        title: "Playlist loaded",
        description: `Found ${parsedChannels.length} channels`,
      });
    } catch (error) {
      toast({
        title: "Error loading playlist",
        description: "Please check the URL and try again",
        variant: "destructive",
      });
    }
  };

  const handleRadioPlay = (url: string) => {
    if (!url.startsWith('http')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid radio stream URL",
        variant: "destructive",
      });
      return;
    }
    setCurrentMedia(url);
  };

  return (
    <Card className="p-4 relative" style={{ backgroundColor: bgColor }}>
      <div className="absolute top-2 right-2">
        <ColorPicker color={bgColor} onChange={handleColorChange} />
      </div>
      <CardContent>
        <Tabs defaultValue="youtube" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="youtube">
              <Music className="w-4 h-4 mr-2" />
              YouTube
            </TabsTrigger>
            <TabsTrigger value="iptv">
              <Tv className="w-4 h-4 mr-2" />
              IPTV
            </TabsTrigger>
            <TabsTrigger value="radio">
              <Radio className="w-4 h-4 mr-2" />
              Radio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="youtube" className="space-y-4">
            <Input
              placeholder="YouTube Music URL"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
            <Button onClick={() => handleYoutubePlay(youtubeUrl)}>Play</Button>
          </TabsContent>

          <TabsContent value="iptv" className="space-y-4">
            <Input
              placeholder="IPTV Playlist URL (M3U)"
              value={iptvUrl}
              onChange={(e) => setIptvUrl(e.target.value)}
            />
            <Button onClick={() => handleIPTVLoad(iptvUrl)}>Load Playlist</Button>
            {channels.length > 0 && (
              <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                {channels.map((channel, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                       onClick={() => setCurrentMedia(DOMPurify.sanitize(channel.url))}>
                    {channel.logo && <img src={channel.logo} alt={channel.name} className="w-8 h-8 object-contain" />}
                    <span>{channel.name}</span>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="radio" className="space-y-4">
            <Input
              placeholder="Radio Stream URL"
              value={radioUrl}
              onChange={(e) => setRadioUrl(e.target.value)}
            />
            <Button onClick={() => handleRadioPlay(DOMPurify.sanitize(radioUrl))}>Play</Button>
          </TabsContent>

          {currentMedia && (
            <div className="mt-4">
              {currentMedia.includes('youtube.com') ? (
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    src={currentMedia}
                    className="w-full h-full"
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
                    className="w-full h-full"
                  />
                </AspectRatio>
              )}
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};