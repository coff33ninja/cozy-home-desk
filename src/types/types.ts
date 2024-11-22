export interface LayoutSettings {
  order: string[];
  collapsed: Record<string, boolean>;
}

export type Category = 'work' | 'entertainment' | 'social' | 'productivity';

export interface Favorite {
  id: string;
  title: string;
  url: string;
  category: Category;
}

export interface Folder {
  id: string;
  name: string;
  favorites: Favorite[];
}

export interface ServiceCredentials {
  url: string;
  apiKey?: string;
  username?: string;
  password?: string;
}

export interface Settings {
  roundedCorners: boolean;
  showWeather: boolean;
  showMusic: boolean;
  backgroundColor: string;
  youtubeApiKey: string;
  youtubeClientId: string;
  radarrCredentials: ServiceCredentials;
  sonarrCredentials: ServiceCredentials;
  lidarrCredentials: ServiceCredentials;
  qbittorrentCredentials: ServiceCredentials;
  weatherApiKey: string;
  iptvPlaylistUrl: string;
  iptvEpgUrl: string;
  nightMode: boolean;
  cardTextColor: string;
  cardBorderColor: string;
  cardBorderStyle: string;
  cardBackgroundColor: string;
  cardBackgroundImage?: string;
  favoritesCardBg?: string;
  musicCardBg?: string;
  searchCardBg?: string;
  youtubeCardBg?: string;
  mediaCardBg?: string;
  layout?: LayoutSettings;
}