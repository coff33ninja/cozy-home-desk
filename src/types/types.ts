export type Category = 'work' | 'entertainment' | 'social' | 'productivity';

export interface Favorite {
  id: string;
  title: string;
  url: string;
  category: Category;
  folderId?: string;
}

export interface Folder {
  id: string;
  name: string;
  favorites: string[]; // IDs of favorites
}

export interface Settings {
  roundedCorners: boolean;
  showWeather: boolean;
  showMusic: boolean;
  backgroundColor: string;
  backgroundImage?: string;
  theme?: string;
  wallpaperUrl?: string;
}