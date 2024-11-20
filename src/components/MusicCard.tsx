import { useState } from 'react';
import { Music, Radio, Tv } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { parseM3U } from '@/lib/m3uParser';

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

  const isValidYouTubeUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return ['www.youtube.com', 'youtube.com', 'youtu.be'].includes(parsedUrl.host);
    } catch {
      return false;
    }
  };

  const handleYoutubePlay = (url: string) => {
    if (!isValidYouTubeUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube Music URL",
        variant: "destructive",
      });
      return;
    }

    const parsedUrl = new URL(url);
    const videoId =
      parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').pop();
    if (videoId) {
      setCurrentMedia(`https://www.youtube.com/embed/${videoId}?autoplay=1`);
    } else {
      toast({
        title: "Invalid YouTube URL",
        description: "Unable to extract a video ID from the provided URL",
        variant: "destructive",
      });
    }
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
    <Card className="p-4">
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
                       onClick={() => setCurrentMedia(channel.url)}>
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
            <Button onClick={() => handleRadioPlay(radioUrl)}>Play</Button>
          </TabsContent>

          {currentMedia && (
            <div className="mt-4">
              {isValidYouTubeUrl(currentMedia) ? (
                <iframe
                  src={currentMedia}
                  className="w-full h-64"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <audio
                  src={currentMedia}
                  controls
                  autoPlay
                  className="w-full"
                />
              )}
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};
