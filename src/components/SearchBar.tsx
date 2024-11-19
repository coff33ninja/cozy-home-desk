import { useState } from 'react';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Google..."
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg pl-12 
                   border border-white/20 focus:border-primary focus:outline-none
                   transition-all duration-300 placeholder:text-white/50"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 
                        group-focus-within:text-primary transition-colors duration-300" />
      </div>
    </form>
  );
};