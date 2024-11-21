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
  username?: string;
  password?: string;
  apiKey?: string;
}

export interface Settings {
  roundedCorners: boolean;
  showWeather: boolean;
  showMusic: boolean;
  radarrCredentials?: ServiceCredentials;
  sonarrCredentials?: ServiceCredentials;
  lidarrCredentials?: ServiceCredentials;
  qbittorrentCredentials?: ServiceCredentials;
  backgroundColor: string;
  backgroundImage?: string;
  theme?: string;
  wallpaperUrl?: string;
  weatherApiKey?: string;
  iptvPlaylistUrl?: string;
  iptvEpgUrl?: string;
  nightMode?: boolean;
  cardTextColor?: string;
  cardBorderColor?: string;
  cardBorderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  cardBackgroundColor?: string;
  cardBackgroundImage?: string;
  weatherCardBg?: string;
  musicCardBg?: string;
  mediaCardBg?: string;
  favoritesCardBg?: string;
  searchCardBg?: string;
  youtubeCardBg?: string;
  youtubeApiKey?: string;
  youtubeClientId?: string;
}

export interface SettingsState {
  settings: Settings;
}

export interface UpdateSettingsAction {
  type: 'UPDATE_SETTINGS';
  payload: Partial<Settings>;
}

export type SettingsAction = UpdateSettingsAction;

const initialState: SettingsState = {
  settings: {
    roundedCorners: false,
    showWeather: true,
    showMusic: true,
    backgroundColor: '#000000',
    nightMode: false,
  },
};

const settingsReducer = (state = initialState, action: SettingsAction): SettingsState => {
  switch (action.type) {  
    case 'UPDATE_SETTINGS':
      return {...state, settings: {...state.settings,...action.payload } };
    default:
      return state;
  }
};