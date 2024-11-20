import { Favorite, Folder, Settings } from '@/types/types';

const FAVORITES_KEY = 'homepage_favorites';
const FOLDERS_KEY = 'homepage_folders';
const SETTINGS_KEY = 'homepage_settings';
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

export interface SpotifyTrack {
  name: string;
  artist: string;
  albumArt?: string;
}

export const defaultSettings: Settings = {
  roundedCorners: true,
  showWeather: true,
  showMusic: true,
  backgroundColor: '#9b87f5',
};

export const initializeSpotify = () => {
  // Check if we have tokens in localStorage
  const accessToken = localStorage.getItem('spotify_access_token');
  const refreshToken = localStorage.getItem('spotify_refresh_token');

  if (!accessToken && !refreshToken) {
    return false;
  }

  return true;
};

export const getSpotifyAuthUrl = () => {
  const scope = 'user-read-currently-playing user-read-playback-state';
  
  return `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${SPOTIFY_REDIRECT_URI}&scope=${encodeURIComponent(scope)}`;
};

export const getCurrentTrack = async (): Promise<SpotifyTrack | null> => {
  const accessToken = localStorage.getItem('spotify_access_token');
  
  if (!accessToken) {
    return null;
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch current track');
    }

    const data = await response.json();
    
    if (!data || !data.item) {
      return null;
    }

    return {
      name: data.item.name,
      artist: data.item.artists[0].name,
      albumArt: data.item.album.images[0]?.url,
    };
  } catch (error) {
    console.error('Error fetching current track:', error);
    return null;
  }
};

export const handleSpotifyCallback = async (code: string) => {
  try {
    const response = await fetch('/api/spotify/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to authenticate with Spotify');
    }

    const data = await response.json();
    localStorage.setItem('spotify_access_token', data.accessToken);
    localStorage.setItem('spotify_refresh_token', data.refreshToken);
  } catch (error) {
    console.error('Error handling Spotify callback:', error);
    throw error;
  }
};

export const saveToStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

export const saveFavorite = (favorite: Favorite) => {
  const favorites = loadFromStorage<Favorite[]>(FAVORITES_KEY, []);
  favorites.push(favorite);
  saveToStorage(FAVORITES_KEY, favorites);
};

export const getFavorites = () => {
  return loadFromStorage<Favorite[]>(FAVORITES_KEY, []);
};

export const getFolders = () => {
  return loadFromStorage<Folder[]>(FOLDERS_KEY, []);
};

export const getSettings = () => {
  return loadFromStorage<Settings>(SETTINGS_KEY, defaultSettings);
};

export const updateSettings = (settings: Partial<Settings>) => {
  const current = getSettings();
  saveToStorage(SETTINGS_KEY, { ...current, ...settings });
};