import SpotifyWebApi from 'spotify-web-api-node';

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

export const getCurrentTrack = async (): Promise<SpotifyTrack | null> => {
  try {
    const response = await spotifyApi.getMyCurrentPlayingTrack();
    if (!response.body?.item) return null;
    
    const track = response.body.item;
    return {
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      albumArt: track.album.images[0]?.url
    };
  } catch (error) {
    console.error('Error fetching Spotify track:', error);
    return null;
  }
};