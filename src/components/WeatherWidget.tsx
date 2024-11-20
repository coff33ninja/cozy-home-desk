import { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type WeatherCondition = 'sunny' | 'cloudy' | 'rainy';

interface WeatherData {
  temp?: number;
  condition?: WeatherCondition;
}

// Fallback data if API is not configured
const mockWeatherData: WeatherData = {
  temp: 22,
  condition: 'sunny'
};

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData>({});
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      
      if (!apiKey) {
        setWeather(mockWeatherData);
        toast({
          title: "Using mock weather data",
          description: "Configure VITE_WEATHER_API_KEY to get real weather data",
        });
        return;
      }

      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=auto:ip`);
        if (!response.ok) throw new Error('Weather API error');
        
        const data = await response.json();
        setWeather({
          temp: data.current.temp_c,
          condition: data.current.condition.text.toLowerCase().includes('rain') ? 'rainy' 
            : data.current.condition.text.toLowerCase().includes('cloud') ? 'cloudy' 
            : 'sunny'
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeather(mockWeatherData);
        toast({
          title: "Failed to fetch weather",
          description: "Using mock data as fallback",
          variant: "destructive",
        });
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="w-8 h-8" />;
      case 'cloudy':   
        return <Cloud className="w-8 h-8" />;   
      case 'rainy':       
        return <CloudRain className="w-8 h-8" />;   
      default:
        return <Sun className="w-8 h-8" />;
    }
  };

  return (
    <div className="p-4 rounded-lg bg-card text-card-foreground shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Weather</h2>
      {weather.temp && (
        <div className="flex items-center gap-4">
          {getWeatherIcon()}
          <div>
            <p className="text-2xl font-bold">{weather.temp}°C</p>
            <p className="text-sm text-muted-foreground capitalize">{weather.condition}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;