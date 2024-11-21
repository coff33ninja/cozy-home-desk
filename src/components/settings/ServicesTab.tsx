import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Settings, ServiceCredentials } from '@/types/types';

interface ServicesTabProps {
  settings: Settings;
  onSettingChange: (key: keyof Settings, value: any) => void;
}

export const ServicesTab = ({ settings, onSettingChange }: ServicesTabProps) => {
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
          />
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