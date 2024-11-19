import { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<{temp?: number, condition?: string}>({});

  useEffect(() => {
    // Mock weather data for now
    setWeather({ temp: 22, condition: 'sunny' });
  }, []);

  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg animate-fade-in">
      <div className="flex items-center gap-2">
        {weather.condition === 'sunny' && <Sun className="text-yellow-300" />}
        {weather.condition === 'cloudy' && <Cloud className="text-gray-300" />}
        {weather.condition === 'rainy' && <CloudRain className="text-blue-300" />}
        <span className="text-xl font-semibold">{weather.temp}°C</span>
      </div>
    </div>
  );
};