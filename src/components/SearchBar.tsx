import { useState } from 'react';
import { Search } from 'lucide-react';
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
  stackoverflow: 'https://stackoverflow.com/search?q='
};

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchEngine, setSearchEngine] = useState('google');
  const settings = getSettings();
  const [bgColor, setBgColor] = useState(settings.searchCardBg || 'rgba(255, 255, 255, 0.1)');

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

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto relative p-4 rounded-lg" style={{ backgroundColor: bgColor }}>
      <div className="absolute top-2 right-2">
        <ColorPicker color={bgColor} onChange={handleColorChange} />
      </div>
      <div className="relative group flex gap-2">
        <Select defaultValue={searchEngine} onValueChange={setSearchEngine}>
          <SelectTrigger className="w-[180px] bg-white/10 backdrop-blur-sm border-black/20 dark:border-white/20">
            <SelectValue placeholder="Select search engine" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="bing">Bing</SelectItem>
            <SelectItem value="duckduckgo">DuckDuckGo</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="reddit">Reddit</SelectItem>
            <SelectItem value="chatgpt">ChatGPT</SelectItem>
            <SelectItem value="github">GitHub</SelectItem>
            <SelectItem value="stackoverflow">Stack Overflow</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg pl-12 
                     border border-black/20 dark:border-white/20 
                     focus:border-primary focus:outline-none
                     transition-all duration-300 
                     text-black dark:text-white 
                     placeholder:text-black/50 dark:placeholder:text-white/50"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 
                          text-black/50 dark:text-white/50 
                          group-focus-within:text-primary 
                          transition-colors duration-300" />
        </div>
      </div>
    </form>
  );
};
