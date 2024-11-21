import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Settings, ServiceCredentials } from '@/types/types';
import { useEffect, useState } from 'react';
import { serviceIcons } from '@/lib/icons';

interface ServicesTabProps {
  settings: Settings;
  onSettingChange: (key: keyof Settings, value: any) => void;
}

export const ServicesTab = ({ settings, onSettingChange }: ServicesTabProps) => {
  const [isYouTubeSignedIn, setIsYouTubeSignedIn] = useState(false);
  const YoutubeIcon = serviceIcons.youtube;

  useEffect(() => {
    // Initialize YouTube API
    const loadYouTubeApi = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = initializeYouTubeApi;
      document.body.appendChild(script);
    };

    if (settings.youtubeApiKey && settings.youtubeClientId) {
      loadYouTubeApi();
    }
  }, [settings.youtubeApiKey, settings.youtubeClientId]);

  const initializeYouTubeApi = async () => {
    try {
      await new Promise((resolve) => window.gapi.load('client:auth2', resolve));
      await window.gapi.client.init({
        apiKey: settings.youtubeApiKey,
        clientId: settings.youtubeClientId,
        scope: 'https://www.googleapis.com/auth/youtube.readonly',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      });

      window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    } catch (error) {
      console.error('Error initializing YouTube API:', error);
    }
  };

  const updateSignInStatus = (signedIn: boolean) => {
    setIsYouTubeSignedIn(signedIn);
  };

  const handleAuthClick = () => {
    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      window.gapi.auth2.getAuthInstance().signOut();
    } else {
      window.gapi.auth2.getAuthInstance().signIn();
    }
  };

  const services = ['radarr', 'sonarr', 'lidarr'] as const;
  type ServiceType = typeof services[number];
  type ServiceCredentialsKey = `${ServiceType}Credentials`;

  const handleServiceChange = (service: ServiceType, field: keyof ServiceCredentials, value: string) => {
    const credentialsKey = `${service}Credentials` as ServiceCredentialsKey;
    onSettingChange(credentialsKey as keyof Settings, {
      ...(settings[credentialsKey] as ServiceCredentials),
      [field]: value,
    });
  };

  const handleQBittorrentChange = (field: keyof ServiceCredentials, value: string) => {
    onSettingChange('qbittorrentCredentials', {
      ...settings.qbittorrentCredentials,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>YouTube Configuration</Label>
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="YouTube API Key"
            value={settings.youtubeApiKey || ''}
            onChange={(e) => onSettingChange('youtubeApiKey', e.target.value)}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="YouTube Client ID"
            value={settings.youtubeClientId || ''}
            onChange={(e) => onSettingChange('youtubeClientId', e.target.value)}
            className="mb-2"
          />
          {settings.youtubeApiKey && settings.youtubeClientId && (
            <Button 
              onClick={handleAuthClick}
              variant={isYouTubeSignedIn ? "destructive" : "default"}
              className="w-full flex items-center gap-2"
            >
              <YoutubeIcon className="w-4 h-4" />
              {isYouTubeSignedIn ? 'Sign Out of YouTube' : 'Sign In with YouTube'}
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Media Services Configuration</Label>
        {services.map((service) => (
          <div key={service} className="space-y-2">
            <Label>{service.charAt(0).toUpperCase() + service.slice(1)}</Label>
            <Input
              type="url"
              placeholder="URL"
              value={(settings[`${service}Credentials` as keyof Settings] as ServiceCredentials)?.url || ''}
              onChange={(e) => handleServiceChange(service, 'url', e.target.value)}
              className="mb-2"
            />
            <Input
              type="text"
              placeholder="API Key"
              value={(settings[`${service}Credentials` as keyof Settings] as ServiceCredentials)?.apiKey || ''}
              onChange={(e) => handleServiceChange(service, 'apiKey', e.target.value)}
            />
          </div>
        ))}

        <div className="space-y-2">
          <Label>qBittorrent</Label>
          <Input
            type="url"
            placeholder="URL"
            value={settings.qbittorrentCredentials?.url || ''}
            onChange={(e) => handleQBittorrentChange('url', e.target.value)}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="Username"
            value={settings.qbittorrentCredentials?.username || ''}
            onChange={(e) => handleQBittorrentChange('username', e.target.value)}
            className="mb-2"
          />
          <Input
            type="password"
            placeholder="Password"
            value={settings.qbittorrentCredentials?.password || ''}
            onChange={(e) => handleQBittorrentChange('password', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Weather Service</Label>
        <Input
          type="text"
          placeholder="Weather API Key"
          value={settings.weatherApiKey || ''}
          onChange={(e) => onSettingChange('weatherApiKey', e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <Label>IPTV Configuration</Label>
        <Input
          type="url"
          placeholder="M3U Playlist URL"
          value={settings.iptvPlaylistUrl || ''}
          onChange={(e) => onSettingChange('iptvPlaylistUrl', e.target.value)}
          className="mb-2"
        />
        <Input
          type="url"
          placeholder="EPG URL (XMLTV format)"
          value={settings.iptvEpgUrl || ''}
          onChange={(e) => onSettingChange('iptvEpgUrl', e.target.value)}
        />
      </div>
    </div>
  );
};
