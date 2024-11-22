import { Favorite, Folder } from '@/types/types';

export interface LayoutSettings {
  order: string[];
  collapsed: Record<string, boolean>;
}

export interface Settings {
  roundedCorners: boolean;
  showWeather: boolean;
  showMusic: boolean;
  backgroundColor: string;
  youtubeApiKey: string;
  youtubeClientId: string;
  radarrCredentials: { url: string; apiKey: string };
  sonarrCredentials: { url: string; apiKey: string };
  lidarrCredentials: { url: string; apiKey: string };
  qbittorrentCredentials: { url: string; username: string; password: string };
  weatherApiKey: string;
  iptvPlaylistUrl: string;
  iptvEpgUrl: string;
  nightMode: boolean;
  cardTextColor: string;
  cardBorderColor: string;
  cardBorderStyle: string;
  cardBackgroundColor: string;
  layout?: LayoutSettings;
}
