import { Music } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentTrack, type SpotifyTrack } from '@/lib/spotify';
import { Card, CardContent } from '@/components/ui/card';

export const MusicCard = () => {
  const { data: track, isLoading } = useQuery<SpotifyTrack | null>({
    queryKey: ['currentTrack'],
    queryFn: getCurrentTrack,
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  if (isLoading) {
    return (
      <Card className="p-4 animate-pulse">
        <CardContent className="flex items-center gap-3">
          <Music className="text-primary" />
          <div className="flex flex-col">
            <div className="h-4 w-24 bg-primary/20 rounded" />
            <div className="h-3 w-32 bg-primary/20 rounded mt-2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!track) {
    return (
      <Card className="p-4">
        <CardContent className="flex items-center gap-3">
          <Music className="text-primary" />
          <div className="flex flex-col">
            <span className="font-medium">Not Playing</span>
            <span className="text-sm text-muted-foreground">Connect Spotify or YouTube</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <CardContent className="flex items-center gap-3">
        {track.albumArt ? (
          <img src={track.albumArt} alt="Album Art" className="w-12 h-12 rounded" />
        ) : (
          <Music className="text-primary" />
        )}
        <div className="flex flex-col">
          <span className="font-medium">{track.name}</span>
          <span className="text-sm text-muted-foreground">{track.artist}</span>
        </div>
      </CardContent>
    </Card>
  );
};