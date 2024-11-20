import { useState } from 'react';
import { Music, Radio, Tv } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const MusicCard = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [iptvUrl, setIptvUrl] = useState('');
  const [radioUrl, setRadioUrl] = useState('');
  const [currentMedia, setCurrentMedia] = useState<string | null>(null);

  const handlePlay = (url: string) => {
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
            <Button onClick={() => handlePlay(youtubeUrl)}>Play</Button>
          </TabsContent>

          <TabsContent value="iptv" className="space-y-4">
            <Input
              placeholder="IPTV Playlist URL"
              value={iptvUrl}
              onChange={(e) => setIptvUrl(e.target.value)}
            />
            <Button onClick={() => handlePlay(iptvUrl)}>Load Playlist</Button>
          </TabsContent>

          <TabsContent value="radio" className="space-y-4">
            <Input
              placeholder="Radio Stream URL"
              value={radioUrl}
              onChange={(e) => setRadioUrl(e.target.value)}
            />
            <Button onClick={() => handlePlay(radioUrl)}>Play</Button>
          </TabsContent>

          {currentMedia && (
            <div className="mt-4">
              <iframe
                src={currentMedia}
                className="w-full h-64"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};