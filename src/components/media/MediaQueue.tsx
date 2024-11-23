interface MediaQueueProps {
  currentMedia: string | null;
  playlist?: any[];
  onPlaylistItemClick?: (url: string) => void;
  type: 'queue' | 'episodes' | null;
}

export const MediaQueue = ({ currentMedia, playlist, onPlaylistItemClick, type }: MediaQueueProps) => {
  if (!playlist || playlist.length === 0) return null;

  const renderPlaylistItem = (item: any, index: number) => {
    const thumbnailUrl = item.thumbnail || item.logo;
    const title = item.title || item.name || item.snippet?.title;
    const description = item.description || item.snippet?.description;

    return (
      <div
        key={index}
        onClick={() => onPlaylistItemClick?.(DOMPurify.sanitize(item.url || item.snippet?.resourceId?.videoId))}
        className="p-2 hover:bg-accent rounded-md cursor-pointer flex items-center gap-2 group transition-all"
      >
        {thumbnailUrl && (
          <div className="relative w-32 aspect-video">
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="w-full h-full object-cover rounded" 
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{title}</div>
          {description && (
            <div className="text-sm text-muted-foreground truncate">
              {description}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="relative p-dynamic-4 bg-background">
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">
          {type === 'episodes' ? 'Episodes' : 'Up Next'}
        </h3>
        <ScrollArea className="h-[400px]">
          <div className="space-y-2">
            {playlist.map((item, index) => renderPlaylistItem(item, index))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};