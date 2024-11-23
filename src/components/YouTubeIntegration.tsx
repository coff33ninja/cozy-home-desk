import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { serviceIcons } from '@/lib/icons';
import DOMPurify from 'dompurify';

declare global {
  interface Window {
    gapi: {
      load: (api: string, callback: () => void) => void;
      client: {
        init: (config: any) => Promise<void>;
        youtube: {
          playlists: {
            list: (params: any) => Promise<any>;
          };
        };
      };
      auth2: {
        getAuthInstance: () => {
          isSignedIn: {
            listen: (callback: (signedIn: boolean) => void) => void;
            get: () => boolean;
          };
          signIn: () => Promise<void>;
          signOut: () => Promise<void>;
        };
      };
    };
  }
}

export const YouTubeIntegration = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  const YoutubeIcon = serviceIcons.youtube;

  useEffect(() => {
    const loadYouTubeApi = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = initializeYouTubeApi;
      document.body.appendChild(script);
    };

    if (!isInitialized) {
      loadYouTubeApi();
    }
  }, [isInitialized]);

  const initializeYouTubeApi = async () => {
    try {
      const currentSettings = getSettings();
      if (!currentSettings.youtubeApiKey || !currentSettings.youtubeClientId) {
        toast({
          title: "YouTube API not configured",
          description: "Please configure your YouTube API credentials in the settings",
          variant: "destructive"
        });
        return;
      }

      await new Promise((resolve) => window.gapi.load('client:auth2', resolve));
      await window.gapi.client.init({
        apiKey: currentSettings.youtubeApiKey,
        clientId: currentSettings.youtubeClientId,
        scope: 'https://www.googleapis.com/auth/youtube.readonly',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      });

      window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
      setIsInitialized(true);
    } catch (error: any) {
      console.error('Error initializing YouTube API:', error);
      toast({
        title: "Error initializing YouTube API",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateSignInStatus = (signedIn: boolean) => {
    setIsSignedIn(signedIn);
    if (signedIn) {
      loadPlaylists();
    } else {
      setPlaylists([]);
    }
  };

  const handleAuthClick = () => {
    if (!isInitialized) {
      toast({
        title: "YouTube API not initialized",
        description: "Please wait for the API to initialize",
        variant: "destructive"
      });
      return;
    }

    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      window.gapi.auth2.getAuthInstance().signOut();
    } else {
      window.gapi.auth2.getAuthInstance().signIn();
    }
  };

  const loadPlaylists = async () => {
    try {
      const response = await window.gapi.client.youtube.playlists.list({
        part: 'snippet',
        mine: true,
        maxResults: 50
      });

      setPlaylists(response.result.items);
      toast({
        title: "Playlists loaded",
        description: `Found ${response.result.items.length} playlists`
      });
    } catch (error: any) {
      toast({
        title: "Error loading playlists",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handlePlaylistClick = (playlistId: string) => {
    const mediaUrl = DOMPurify.sanitize(`https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1`);
    
    const event = new CustomEvent('mediaUpdate', {
      detail: {
        media: mediaUrl,
        playlist: playlists
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <Card className="relative bg-dark-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <YoutubeIcon className="w-6 h-6" />
          YouTube Playlists
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleAuthClick}
          variant={isSignedIn ? "destructive" : "default"}
          className="mb-4 flex items-center gap-2"
        >
          <YoutubeIcon className="w-4 h-4" />
          {isSignedIn ? 'Sign Out' : 'Sign In with YouTube'}
        </Button>

        {isSignedIn && (
          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  onClick={() => handlePlaylistClick(playlist.id)}
                  className="block p-2 hover:bg-accent rounded-md transition-colors cursor-pointer"
                >
                  <div className="font-medium">{playlist.snippet.title}</div>
                  <div className="text-sm text-muted-foreground">{playlist.snippet.description}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};