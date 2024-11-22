import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DOMPurify from 'dompurify';

interface MediaControlsProps {
  type: 'youtube' | 'iptv' | 'radio';
  url: string;
  onUrlChange: (url: string) => void;
  onPlay: (url: string) => void;
  onLoad?: (url: string) => void;
}

export const MediaControls = ({ type, url, onUrlChange, onPlay, onLoad }: MediaControlsProps) => {
  const { toast } = useToast();

  const handleAction = () => {
    if (type === 'iptv' && onLoad) {
      onLoad(url);
    } else {
      onPlay(url);
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'youtube':
        return 'YouTube Music URL';
      case 'iptv':
        return 'IPTV Playlist URL (M3U)';
      case 'radio':
        return 'Radio Stream URL';
    }
  };

  const getButtonText = () => {
    return type === 'iptv' ? 'Load Playlist' : 'Play';
  };

  return (
    <div className="space-y-dynamic-4">
      <Input
        placeholder={getPlaceholder()}
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        className="text-dynamic-sm"
      />
      <Button onClick={handleAction} className="text-dynamic-sm">{getButtonText()}</Button>
    </div>
  );
};