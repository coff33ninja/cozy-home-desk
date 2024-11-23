import { useState } from 'react';
import { Folder, BookmarkPlus, Plus } from 'lucide-react';
import { Favorite, Category } from '@/types/types';
import { getFavorites, saveFavorite } from '@/lib/localStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { ColorPicker } from './settings/ColorPicker';
import { getSettings, updateSettings } from '@/lib/localStorage';

export const FavoritesList = () => {
  const [favorites, setFavorites] = useState<Favorite[]>(getFavorites());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFavorite, setNewFavorite] = useState({ title: '', url: '', category: 'work' as Category });
  const settings = getSettings();
  const [bgColor, setBgColor] = useState(settings.favoritesCardBg || 'rgba(255, 255, 255, 0.1)');

  const handleColorChange = (color: string) => {
    setBgColor(color);
    const newSettings = { ...settings, favoritesCardBg: color };
    updateSettings(newSettings);
  };

  const handleAdd = () => {
    if (!newFavorite.title || !newFavorite.url) {
      toast({ title: "Please fill all fields" });
      return;
    }

    const favorite: Favorite = {
      id: Date.now().toString(),
      ...newFavorite
    };

    saveFavorite(favorite);
    setFavorites([...favorites, favorite]);
    setShowAddForm(false);
    setNewFavorite({ title: '', url: '', category: 'work' });
    toast({ title: "Favorite added successfully" });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4 relative rounded-lg shadow-lg" style={{ backgroundColor: bgColor }}>
      <div className="absolute top-4 right-4">
        <ColorPicker color={bgColor} onChange={handleColorChange} />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Favorites</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)} variant="ghost" className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>

      {showAddForm && (
        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg space-y-3 animate-fade-in">
          <Input
            placeholder="Title"
            value={newFavorite.title}
            onChange={(e) => setNewFavorite({ ...newFavorite, title: e.target.value })}
            className="w-full"
          />
          <Input
            placeholder="URL"
            value={newFavorite.url}
            onChange={(e) => setNewFavorite({ ...newFavorite, url: e.target.value })}
            className="w-full"
          />
          <select
            className="w-full p-2 rounded-lg bg-white/10 border border-white/20"
            value={newFavorite.category}
            onChange={(e) => setNewFavorite({ ...newFavorite, category: e.target.value as Category })}
          >
            <option value="work">Work</option>
            <option value="entertainment">Entertainment</option>
            <option value="social">Social</option>
            <option value="productivity">Productivity</option>
          </select>
          <Button onClick={handleAdd} className="w-full sm:w-auto">Add Favorite</Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {favorites.map((favorite) => (
          <a
            key={favorite.id}
            href={favorite.url}
            className="p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 
                     transition-all duration-300 group flex flex-col"
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-category-${favorite.category}`} />
              <span className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                {favorite.title}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};