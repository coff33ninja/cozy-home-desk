import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MediaPlayer } from "@/components/media/MediaPlayer";
import { MediaQueue } from "@/components/media/MediaQueue";
import { extractMediaUrls } from "@/lib/urlExtractor";
import { Loader2 } from "lucide-react";

const CuratedContent = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [currentMedia, setCurrentMedia] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const extractUrls = async (url: string) => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const mediaUrls = await extractMediaUrls(url);
      
      if (mediaUrls.length === 0) {
        toast({
          title: "No media found",
          description: "No media content was found on the provided URL",
          variant: "destructive",
        });
        return;
      }

      setPlaylist(mediaUrls);
      toast({
        title: "Success",
        description: `Found ${mediaUrls.length} media items`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extract URLs from the website. Make sure the URL is accessible.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
                className="flex-1"
              />
              <Button 
                onClick={() => extractUrls(websiteUrl)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  'Extract Media'
                )}
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