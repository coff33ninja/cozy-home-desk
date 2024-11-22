import { Channel } from "@/types/types";
import DOMPurify from 'dompurify';

interface ChannelListProps {
  channels: Channel[];
  onChannelClick: (url: string) => void;
}

export const ChannelList = ({ channels, onChannelClick }: ChannelListProps) => {
  if (channels.length === 0) return null;

  return (
    <div className="mt-dynamic-4 space-y-2 max-h-48 overflow-y-auto">
      {channels.map((channel, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
          onClick={() => onChannelClick(DOMPurify.sanitize(channel.url))}
        >
          {channel.logo && <img src={channel.logo} alt={channel.name} className="w-8 h-8 object-contain" />}
          <span>{channel.name}</span>
        </div>
      ))}
    </div>
  );
};