// Shared Configuration Interfaces
interface ArrConfig {
  url: string;
  apiKey?: string;
  username?: string;
  password?: string;
}

interface QBittorrentConfig {
  url: string;
  username: string;
  password: string;
}

// Fetch Configuration Functions
export const getRadarrConfig = (): ArrConfig => ({
  url: import.meta.env.VITE_RADARR_URL || '',
  apiKey: import.meta.env.VITE_RADARR_API_KEY || '',
  username: import.meta.env.VITE_RADARR_USERNAME || '',
  password: import.meta.env.VITE_RADARR_PASSWORD || '',
});

export const getSonarrConfig = (): ArrConfig => ({
  url: import.meta.env.VITE_SONARR_URL || '',
  apiKey: import.meta.env.VITE_SONARR_API_KEY || '',
  username: import.meta.env.VITE_SONARR_USERNAME || '',
  password: import.meta.env.VITE_SONARR_PASSWORD || '',
});

export const getLidarrConfig = (): ArrConfig => ({
  url: import.meta.env.VITE_LIDARR_URL || '',
  apiKey: import.meta.env.VITE_LIDARR_API_KEY || '',
  username: import.meta.env.VITE_LIDARR_USERNAME || '',
  password: import.meta.env.VITE_LIDARR_PASSWORD || '',
});

export const getQBittorrentConfig = (): QBittorrentConfig => ({
  url: import.meta.env.VITE_QBITTORRENT_URL || '',
  username: import.meta.env.VITE_QBITTORRENT_USERNAME || '',
  password: import.meta.env.VITE_QBITTORRENT_PASSWORD || '',
});

// Utility Function: Create Authorization Headers
const createAuthHeaders = (config: ArrConfig | QBittorrentConfig) => {
  if ('username' in config && 'password' in config && config.username && config.password) {
    return {
      'Authorization': 'Basic ' + btoa(`${config.username}:${config.password}`),
      'Content-Type': 'application/json',
    };
  }
  return { 'Content-Type': 'application/json' };
};

// Fetch Functions for Arr Projects
const fetchArrQueue = async (config: ArrConfig, serviceName: string) => {
  try {
    if (!config.url) throw new Error(`${serviceName} URL is not configured`);

    const url = `${config.url}/api/v3/queue`;
    const headers = config.apiKey
      ? { 'X-Api-Key': config.apiKey }
      : createAuthHeaders(config);

    const response = await fetch(url, { headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch ${serviceName} queue: ${response.status} ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${serviceName} queue:`, error);
    throw error;
  }
};

export const fetchRadarrQueue = async () => fetchArrQueue(getRadarrConfig(), 'Radarr');
export const fetchSonarrQueue = async () => fetchArrQueue(getSonarrConfig(), 'Sonarr');
export const fetchLidarrQueue = async () => fetchArrQueue(getLidarrConfig(), 'Lidarr');

// Fetch Function for qBittorrent
export const fetchQBittorrentTorrents = async () => {
  const config = getQBittorrentConfig();

  if (!config.url || !config.username || !config.password)
    throw new Error('qBittorrent credentials not configured');

  const authResponse = await fetch(`${config.url}/api/v2/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      username: config.username,
      password: config.password,
    }),
  });

  if (!authResponse.ok) throw new Error('Failed to authenticate with qBittorrent');

  const cookie = authResponse.headers.get('set-cookie');
  if (!cookie) throw new Error('qBittorrent login did not return a session cookie');

  const torrentsResponse = await fetch(`${config.url}/api/v2/torrents/info`, {
    headers: { Cookie: cookie },
  });

  if (!torrentsResponse.ok) throw new Error('Failed to fetch qBittorrent torrents');
  return torrentsResponse.json();
};