import { Film, Radio, Music, Download, Video, Youtube } from 'lucide-react';

export const serviceIcons = {
  radarr: Film,
  sonarr: Video,
  lidarr: Music,
  qbittorrent: Download,
  youtube: Youtube,
  iptv: Video,
  radio: Radio,
} as const;

export type ServiceIconType = keyof typeof serviceIcons;