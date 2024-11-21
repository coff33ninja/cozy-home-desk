import { toast } from '@/components/ui/use-toast';
import { getSettings } from './localStorage';

// Mock data for when APIs are not configured
const mockMediaData = {
  radarr: [
    { id: 1, title: 'Example Movie', status: 'downloading' }
  ],
  sonarr: [
    { id: 1, series: { title: 'Example Show' }, episode: { title: 'Pilot' } }
  ],
  lidarr: [
    { id: 1, artist: { artistName: 'Example Artist' }, album: { title: 'Example Album' } }
  ],
  qbittorrent: [
    { hash: '123', name: 'Example.Torrent', progress: 0.5 }
  ]
};

const checkApiConfig = (service: string) => {
  const url = import.meta.env[`VITE_${service.toUpperCase()}_URL`];
  const apiKey = import.meta.env[`VITE_${service.toUpperCase()}_API_KEY`];
  
  if (!url || !apiKey) {
    toast({
      title: `${service} not configured`,
      description: `Using mock data. Configure VITE_${service.toUpperCase()}_URL and API_KEY for real data.`,
    });
    return false;
  }
  return true;
};

export const fetchRadarrQueue = async () => {
  if (!checkApiConfig('radarr')) return mockMediaData.radarr;
  
  try {
    const response = await fetch(`${import.meta.env.VITE_RADARR_URL}/api/v3/queue?apikey=${import.meta.env.VITE_RADARR_API_KEY}`);
    if (!response.ok) throw new Error('Radarr API error');
    return await response.json();
  } catch (error) {
    console.error('Radarr fetch error:', error);
    return mockMediaData.radarr;
  }
};

export const fetchSonarrQueue = async () => {
  if (!checkApiConfig('sonarr')) return mockMediaData.sonarr;

  try {
    const response = await fetch(`${import.meta.env.VITE_SONARR_URL}/api/v3/queue?apikey=${import.meta.env.VITE_SONARR_API_KEY}`);
    if (!response.ok) throw new Error('Sonarr API error');
    return await response.json();
  } catch (error) {
    console.error('Sonarr fetch error:', error);
    return mockMediaData.sonarr;
  }
};

export const fetchLidarrQueue = async () => {
  if (!checkApiConfig('lidarr')) return mockMediaData.lidarr;

  try {
    const response = await fetch(`${import.meta.env.VITE_LIDARR_URL}/api/v3/queue?apikey=${import.meta.env.VITE_LIDARR_API_KEY}`);
    if (!response.ok) throw new Error('Lidarr API error');
    return await response.json();
  } catch (error) {
    console.error('Lidarr fetch error:', error);
    return mockMediaData.lidarr;
  }
};

export const fetchQBittorrentData = async () => {
  const settings = getSettings();
  const credentials = settings.qbittorrentCredentials;

  if (!credentials?.url || !credentials?.username || !credentials?.password) {
    toast({
      title: 'qBittorrent not configured',
      description: 'Using mock data. Configure URL, username and password for real data.',
    });
    return mockMediaData.qbittorrent;
  }

  try {
    // First login to get SID cookie
    const loginResponse = await fetch(`${credentials.url}/api/v2/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${encodeURIComponent(credentials.username)}&password=${encodeURIComponent(credentials.password)}`,
      credentials: 'include',
    });

    if (!loginResponse.ok) throw new Error('qBittorrent login failed');

    // Then fetch torrents
    const response = await fetch(`${credentials.url}/api/v2/torrents/info`, {
      credentials: 'include',
    });
    
    if (!response.ok) throw new Error('qBittorrent API error');
    return await response.json();
  } catch (error) {
    console.error('qBittorrent fetch error:', error);
    return mockMediaData.qbittorrent;
  }
};
