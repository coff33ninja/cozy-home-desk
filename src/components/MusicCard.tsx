import { Music } from 'lucide-react';

export const MusicCard = () => {
  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg animate-fade-in">
      <div className="flex items-center gap-3">
        <Music className="text-primary" />
        <div className="flex flex-col">
          <span className="font-medium">Not Playing</span>
          <span className="text-sm text-white/70">Connect Spotify or YouTube</span>
        </div>
      </div>
    </div>
  );
};