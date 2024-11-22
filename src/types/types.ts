export type WidgetSize = 'small' | 'medium' | 'large' | 'full';

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

export interface QBittorrentCredentials {
  url: string;
  username: string;
  password: string;
}

export interface LayoutSettings {
  widgetSizes: Record<string, WidgetSize>;
  order: string[];
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  cardTextColor: string;
  cardBorderColor: string;
  cardBorderStyle: string;
  cardBackgroundColor: string;
  cardBackgroundImage?: string;
  glassEffect: boolean;
  borderRadius: 'none' | 'small' | 'medium' | 'large';
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
  qbittorrentCredentials: QBittorrentCredentials;
  weatherApiKey: string;
  iptvPlaylistUrl: string;
  iptvEpgUrl: string;
  nightMode: boolean;
  theme: ThemeSettings;
  layout?: LayoutSettings;
  favoritesCardBg: string;
  musicCardBg: string;
  searchCardBg: string;
  youtubeCardBg: string;
  mediaCardBg: string;
}