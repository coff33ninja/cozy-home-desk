import { Favorite, Folder, Settings, Category } from '@/types/types';

const FAVORITES_KEY = 'homepage_favorites';
const FOLDERS_KEY = 'homepage_folders';
const SETTINGS_KEY = 'homepage_settings';

export const defaultSettings: Settings = {
  roundedCorners: true,
  showWeather: true,
  showMusic: true,
  backgroundColor: '#9b87f5',
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