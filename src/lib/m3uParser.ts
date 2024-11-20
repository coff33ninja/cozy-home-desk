interface Channel {
  name: string;
  url: string;
  logo?: string;
}

export const parseM3U = (content: string): Channel[] => {
  const lines = content.split('\n');
  const channels: Channel[] = [];
  let currentChannel: Partial<Channel> = {};

  lines.forEach(line => {
    line = line.trim();
    
    if (line.startsWith('#EXTINF:')) {
      // Parse channel name
      const nameMatch = line.match(/,(.+)$/);
      if (nameMatch) {
        currentChannel.name = nameMatch[1].trim();
      }
      
      // Parse logo URL if present
      const logoMatch = line.match(/tvg-logo="([^"]+)"/);
      if (logoMatch) {
        currentChannel.logo = logoMatch[1];
      }
    } else if (line.startsWith('http')) {
      currentChannel.url = line;
      if (currentChannel.name && currentChannel.url) {
        channels.push(currentChannel as Channel);
      }
      currentChannel = {};
    }
  });

  return channels;
};