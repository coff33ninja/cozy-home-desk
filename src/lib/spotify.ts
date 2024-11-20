import SpotifyWebApi from 'spotify-web-api-node';
import { toast } from '@/components/ui/use-toast';

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
  redirectUri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI
});

export interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  albumArt?: string;
}

async function refreshAccessToken() {
  try {
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body['access_token']);
    return true;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return false;
  }
}

export const initializeSpotify = async () => {
  const token = localStorage.getItem('spotify_access_token');
  const refreshToken = localStorage.getItem('spotify_refresh_token');
  
  if (token) {
    spotifyApi.setAccessToken(token);
  }
  
  if (refreshToken) {
    spotifyApi.setRefreshToken(refreshToken);
    await refreshAccessToken();
  }
};

export const handleSpotifyCallback = async (code: string) => {
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    
    const { access_token, refresh_token } = data.body;
    
    localStorage.setItem('spotify_access_token', access_token);
    localStorage.setItem('spotify_refresh_token', refresh_token);
    
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);
    
    toast({
      title: "Successfully connected to Spotify",
      description: "You can now see your currently playing track",
    });
    
    return true;
  } catch (error) {
    console.error('Error getting tokens:', error);
    toast({
      title: "Failed to connect to Spotify",
      description: "Please try again",
      variant: "destructive",
    });
    return false;
  }
};

export const getCurrentTrack = async (): Promise<SpotifyTrack | null> => {
  try {
    // Try to get current track
    const response = await spotifyApi.getMyCurrentPlayingTrack();
    
    // If no response or no item, return null
    if (!response.body?.item) return null;
    
    const track = response.body.item;
    return {
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      albumArt: track.album.images[0]?.url
    };
  } catch (error: any) {
    // If token expired, try to refresh it
    if (error.statusCode === 401) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        // Retry getting current track
        return getCurrentTrack();
      }
    }
    console.error('Error fetching Spotify track:', error);
    return null;
  }
};

export const getSpotifyAuthUrl = () => {
  const scopes = ['user-read-currently-playing', 'user-read-playback-state'];
  return spotifyApi.createAuthorizeURL(scopes, 'spotify-auth-state');
};