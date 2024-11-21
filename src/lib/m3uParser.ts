interface Channel {
  name: string;
  url: string;
  logo?: string;
  tvgId?: string;  // Added for EPG support
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

      // Parse TVG ID for EPG support
      const tvgIdMatch = line.match(/tvg-id="([^"]+)"/);
      if (tvgIdMatch) {
        currentChannel.tvgId = tvgIdMatch[1];
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

export const parseEPG = async (epgUrl: string): Promise<Record<string, any>> => {
  try {
    const response = await fetch(epgUrl);
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    const programmes = xmlDoc.getElementsByTagName('programme');
    const epgData: Record<string, any> = {};

    for (let i = 0; i < programmes.length; i++) {
      const programme = programmes[i];
      const channelId = programme.getAttribute('channel');
      const start = programme.getAttribute('start');
      const stop = programme.getAttribute('stop');
      const title = programme.getElementsByTagName('title')[0]?.textContent;
      const desc = programme.getElementsByTagName('desc')[0]?.textContent;

      if (channelId) {
        if (!epgData[channelId]) {
          epgData[channelId] = [];
        }
        epgData[channelId].push({
          start,
          stop,
          title,
          desc
        });
      }
    }

    return epgData;
  } catch (error) {
    console.error('Error parsing EPG:', error);
    return {};
  }
};