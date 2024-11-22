import { Favorite, Folder, Settings, Category } from '@/types/types';

const FAVORITES_KEY = 'homepage_favorites';
const FOLDERS_KEY = 'homepage_folders';
const SETTINGS_KEY = 'homepage_settings';

export const defaultSettings: Settings = {
  roundedCorners: true,
  showWeather: true,
  showMusic: true,
  backgroundColor: '#9b87f5',
  youtubeApiKey: '',
  youtubeClientId: '',
  radarrCredentials: { url: '', apiKey: '' },
  sonarrCredentials: { url: '', apiKey: '' },
  lidarrCredentials: { url: '', apiKey: '' },
  qbittorrentCredentials: { url: '', username: '', password: '' },
  weatherApiKey: '',
  iptvPlaylistUrl: '',
  iptvEpgUrl: '',
  nightMode: false,
  cardTextColor: '#000000',
  cardBorderColor: '#e2e8f0',
  cardBorderStyle: 'solid',
  cardBackgroundColor: '#ffffff',
  favoritesCardBg: 'rgba(255, 255, 255, 0.1)',
  musicCardBg: 'rgba(255, 255, 255, 0.1)',
  searchCardBg: 'rgba(17, 17, 17, 0.7)',
  youtubeCardBg: 'rgba(255, 255, 255, 0.1)',
  mediaCardBg: '#1a1a1a'
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
  const storedSettings = loadFromStorage<Settings>(SETTINGS_KEY, defaultSettings);
  return { ...defaultSettings, ...storedSettings };
};

export const updateSettings = (settings: Partial<Settings>) => {
  const current = getSettings();
  const newSettings = { ...current, ...settings };
  saveToStorage(SETTINGS_KEY, newSettings);
  return newSettings;
};
