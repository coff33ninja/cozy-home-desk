import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MediaPlayer } from "@/components/media/MediaPlayer";
import { MediaQueue } from "@/components/media/MediaQueue";

const CuratedContent = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [currentMedia, setCurrentMedia] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<any[]>([]);
  const { toast } = useToast();

  const extractUrls = async (url: string) => {
    try {
      // This is a placeholder for the URL extraction logic
      // We'll implement this once you provide the website details
      toast({
        title: "URL Extraction",
        description: "Please provide the website URL to extract media content.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extract URLs from the website.",
        variant: "destructive",
      });
    }
  };

  const handlePlaylistItemClick = (url: string) => {
    setCurrentMedia(url);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Curated Content</h2>
            <div className="flex gap-2">
              <Input
                placeholder="Enter website URL to extract media"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
              <Button onClick={() => extractUrls(websiteUrl)}>
                Extract Media
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {currentMedia && (
        <MediaPlayer
          currentMedia={currentMedia}
          playlist={playlist}
          onPlaylistItemClick={handlePlaylistItemClick}
          bgColor="rgba(0, 0, 0, 0.2)"
        />
      )}

      <MediaQueue
        currentMedia={currentMedia}
        playlist={playlist}
        onPlaylistItemClick={handlePlaylistItemClick}
        bgColor="rgba(0, 0, 0, 0.2)"
        type="episodes"
      />
    </div>
  );
};

export default CuratedContent;