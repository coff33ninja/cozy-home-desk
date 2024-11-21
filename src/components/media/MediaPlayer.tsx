import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import DOMPurify from 'dompurify';

interface MediaPlayerProps {
  currentMedia: string | null;
  playlist?: any[];
  onPlaylistItemClick?: (url: string) => void;
  bgColor: string;
}

export const MediaPlayer = ({ currentMedia, playlist, onPlaylistItemClick, bgColor }: MediaPlayerProps) => {
  if (!currentMedia) return null;

  return (
    <Card style={{ backgroundColor: bgColor }} className="relative p-dynamic-4">
      <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
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
        </div>

        {playlist && playlist.length > 0 && (
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-2">Up Next</h3>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {playlist.map((item: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => onPlaylistItemClick?.(DOMPurify.sanitize(item.url || item.snippet?.resourceId?.videoId))}
                    className="p-2 hover:bg-accent rounded-md cursor-pointer flex items-center gap-2 group transition-all"
                  >
                    {item.thumbnail && (
                      <div className="relative w-32 aspect-video">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="w-full h-full object-cover rounded" 
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-white">Play</span>
                        </div>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {item.title || item.snippet?.title}
                      </div>
                      {item.description && (
                        <div className="text-sm text-muted-foreground truncate">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
};