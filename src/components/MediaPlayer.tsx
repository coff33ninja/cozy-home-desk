import { useState } from 'react';
import { Music, Radio, Tv, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { parseM3U } from '@/lib/m3uParser';
import { ColorPicker } from './settings/ColorPicker';
import { getSettings, updateSettings } from '@/lib/localStorage';
import { MediaControls } from './media/MediaControls';
import { ChannelList } from './media/ChannelList';
import { useNavigate } from 'react-router-dom';
import { MediaPlayer as Player } from './media/MediaPlayer';
import { Channel } from '@/types/types';
import DOMPurify from 'dompurify';

export const MediaPlayer = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [iptvUrl, setIptvUrl] = useState('');
  const [radioUrl, setRadioUrl] = useState('');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentMedia, setCurrentMedia] = useState<string | null>(null);
  const { toast } = useToast();
  const settings = getSettings();
  const [bgColor, setBgColor] = useState(settings.musicCardBg || 'rgba(255, 255, 255, 0.1)');
  const navigate = useNavigate();

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
    const mediaUrl = DOMPurify.sanitize(`https://www.youtube.com/embed/${videoId}?autoplay=1`);
    setCurrentMedia(mediaUrl);
    dispatchMediaEvent(mediaUrl, 'queue');
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
    const mediaUrl = DOMPurify.sanitize(url);
    setCurrentMedia(mediaUrl);
    dispatchMediaEvent(mediaUrl, 'episodes');
  };

  const dispatchMediaEvent = (mediaUrl: string, type: 'queue' | 'episodes') => {
    const event = new CustomEvent('mediaUpdate', {
      detail: {
        media: mediaUrl,
        playlist: channels,
        type
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <Card className="p-dynamic-4 relative" style={{ backgroundColor: bgColor }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Media Player</h2>
        <div className="flex items-center gap-2">
          <ColorPicker color={bgColor} onChange={handleColorChange} />
          <Button 
            variant="outline" 
            onClick={() => navigate('/curated-content')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Curated Content
          </Button>
        </div>
      </div>
      <CardContent>
        <Player currentMedia={currentMedia} bgColor={bgColor} />
        <Tabs defaultValue="youtube" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="youtube" className="text-dynamic-sm">
              <Music className="w-4 h-4 mr-dynamic-2" />
              YouTube
            </TabsTrigger>
            <TabsTrigger value="iptv" className="text-dynamic-sm">
              <Tv className="w-4 h-4 mr-dynamic-2" />
              IPTV
            </TabsTrigger>
            <TabsTrigger value="radio" className="text-dynamic-sm">
              <Radio className="w-4 h-4 mr-dynamic-2" />
              Radio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="youtube">
            <MediaControls
              type="youtube"
              url={youtubeUrl}
              onUrlChange={setYoutubeUrl}
              onPlay={handleYoutubePlay}
            />
          </TabsContent>

          <TabsContent value="iptv">
            <MediaControls
              type="iptv"
              url={iptvUrl}
              onUrlChange={setIptvUrl}
              onLoad={handleIPTVLoad}
              onPlay={() => {}}
            />
            <ChannelList 
              channels={channels} 
              onChannelClick={(url) => {
                setCurrentMedia(url);
                dispatchMediaEvent(url, 'episodes');
              }} 
            />
          </TabsContent>

          <TabsContent value="radio">
            <MediaControls
              type="radio"
              url={radioUrl}
              onUrlChange={setRadioUrl}
              onPlay={handleRadioPlay}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};