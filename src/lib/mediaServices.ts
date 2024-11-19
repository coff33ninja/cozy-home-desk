interface ArrConfig {
  url: string;
  apiKey: string;
}

interface QBittorrentConfig {
  url: string;
  username: string;
  password: string;
}

export const getRadarrConfig = (): ArrConfig => ({
  url: import.meta.env.VITE_RADARR_URL || '',
  apiKey: import.meta.env.VITE_RADARR_API_KEY || ''
});

export const getSonarrConfig = (): ArrConfig => ({
  url: import.meta.env.VITE_SONARR_URL || '',
  apiKey: import.meta.env.VITE_SONARR_API_KEY || ''
});

export const getLidarrConfig = (): ArrConfig => ({
  url: import.meta.env.VITE_LIDARR_URL || '',
  apiKey: import.meta.env.VITE_LIDARR_API_KEY || ''
});

export const getQBittorrentConfig = (): QBittorrentConfig => ({
  url: import.meta.env.VITE_QBITTORRENT_URL || '',
  username: import.meta.env.VITE_QBITTORRENT_USERNAME || '',
  password: import.meta.env.VITE_QBITTORRENT_PASSWORD || ''
});

// Fetch data from *Arr services
export const fetchRadarrQueue = async () => {
  const config = getRadarrConfig();
  const response = await fetch(`${config.url}/api/v3/queue?apikey=${config.apiKey}`);
  return response.json();
};

export const fetchSonarrQueue = async () => {
  const config = getSonarrConfig();
  const response = await fetch(`${config.url}/api/v3/queue?apikey=${config.apiKey}`);
  return response.json();
};

export const fetchLidarrQueue = async () => {
  const config = getLidarrConfig();
  const response = await fetch(`${config.url}/api/v3/queue?apikey=${config.apiKey}`);
  return response.json();
};

// QBittorrent integration
export const fetchQBittorrentData = async () => {
  const config = getQBittorrentConfig();
  const loginResponse = await fetch(`${config.url}/api/v2/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${config.username}&password=${config.password}`
  });

  if (!loginResponse.ok) throw new Error('QBittorrent login failed');

  const torrentsResponse = await fetch(`${config.url}/api/v2/torrents/info`);
  return torrentsResponse.json();
};