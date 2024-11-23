import { useState } from 'react';
import { 
  Search, 
  Youtube, 
  Globe, 
  MessageSquare, 
  Github, 
  BookOpen,
  BrainCircuit,
  Database,
  Bird,
  Film,
  Tv,
  Music,
  Download,
  Radio,
  Video
} from 'lucide-react';
import { ColorPicker } from './settings/ColorPicker';
import { getSettings, updateSettings } from '@/lib/localStorage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const searchEngines = {
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q=',
  duckduckgo: 'https://duckduckgo.com/?q=',
  youtube: 'https://www.youtube.com/results?search_query=',
  reddit: 'https://www.reddit.com/search/?q=',
  chatgpt: 'https://chat.openai.com/?q=',
  github: 'https://github.com/search?q=',
  stackoverflow: 'https://stackoverflow.com/search?q=',
  radarr: '/radarr/search?q=',
  sonarr: '/sonarr/search?q=',
  lidarr: '/lidarr/search?q=',
  qbittorrent: '/qbittorrent/search?q=',
  iptv: '/iptv/search?q=',
  radio: '/radio/search?q='
};

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchEngine, setSearchEngine] = useState('google');
  const settings = getSettings();
  const [bgColor, setBgColor] = useState(settings.searchCardBg || 'rgba(17, 17, 17, 0.7)');

  const handleColorChange = (color: string) => {
    setBgColor(color);
    const newSettings = { ...settings, searchCardBg: color };
    updateSettings(newSettings);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `${searchEngines[searchEngine as keyof typeof searchEngines]}${encodeURIComponent(query)}`;
    }
  };

  const getIconForService = (service: string) => {
    switch (service) {
      case 'google':
        return <Globe className="h-4 w-4 mr-2" />;
      case 'bing':
        return <Database className="h-4 w-4 mr-2" />;
      case 'duckduckgo':
        return <Bird className="h-4 w-4 mr-2" />;
      case 'youtube':
        return <Youtube className="h-4 w-4 mr-2" />;
      case 'reddit':
        return <MessageSquare className="h-4 w-4 mr-2" />;
      case 'chatgpt':
        return <BrainCircuit className="h-4 w-4 mr-2" />;
      case 'github':
        return <Github className="h-4 w-4 mr-2" />;
      case 'stackoverflow':
        return <BookOpen className="h-4 w-4 mr-2" />;
      case 'radarr':
        return <Film className="h-4 w-4 mr-2" />;
      case 'sonarr':
        return <Tv className="h-4 w-4 mr-2" />;
      case 'lidarr':
        return <Music className="h-4 w-4 mr-2" />;
      case 'qbittorrent':
        return <Download className="h-4 w-4 mr-2" />;
      case 'iptv':
        return <Video className="h-4 w-4 mr-2" />;
      case 'radio':
        return <Radio className="h-4 w-4 mr-2" />;
      default:
        return <Database className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full backdrop-blur-md shadow-lg rounded-lg" style={{ backgroundColor: bgColor }}>
      <div className="absolute top-2 right-2">
        <ColorPicker color={bgColor} onChange={handleColorChange} />
      </div>
      <div className="relative group flex flex-col sm:flex-row gap-dynamic-2 p-dynamic-4">
        <Select defaultValue={searchEngine} onValueChange={setSearchEngine}>
          <SelectTrigger className="w-full sm:w-[180px] text-dynamic-sm bg-dark-card border-dark-border">
            <SelectValue placeholder="Select search engine">
              <div className="flex items-center">
                {getIconForService(searchEngine)}
                <span>{searchEngine.charAt(0).toUpperCase() + searchEngine.slice(1)}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-dark-card border-dark-border">
            {Object.keys(searchEngines).map((engine) => (
              <SelectItem 
                key={engine} 
                value={engine}
                className="flex items-center text-dynamic-sm"
              >
                <div className="flex items-center">
                  {getIconForService(engine)}
                  <span>{engine.charAt(0).toUpperCase() + engine.slice(1)}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-3 bg-dark-card rounded-lg pl-12 
                     border border-dark-border
                     focus:border-primary focus:outline-none
                     transition-all duration-300 
                     text-white text-dynamic-sm
                     placeholder:text-white/50"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 
                          text-white/50
                          group-focus-within:text-primary 
                          transition-colors duration-300" />
        </div>
      </div>
    </form>
  );
};