import { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { WeatherData, fetchWeather, getCurrentLocation } from '@/lib/weatherService';
import { WeatherForecast } from './WeatherForecast';
import { Button } from './ui/button';

// Fallback data if API is not configured
const mockWeatherData: WeatherData = {
  temp: 22,
  condition: 'sunny',
  location: 'Sample City',
  windSpeed: 10
};

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData>(mockWeatherData);
  const [coords, setCoords] = useState<{lat: number, lon: number}>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const fetchWeatherData = async (latitude: number, longitude: number) => {
    setLoading(true);
    try {
      const weatherData = await fetchWeather(latitude, longitude);
      setWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather(mockWeatherData);
      toast({
        title: "Failed to fetch weather",
        description: "Using mock data as fallback",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const position = await getCurrentLocation();
        setCoords(position);
        await fetchWeatherData(position.lat, position.lon);
      } catch (error) {
        console.error('Location error:', error);
        toast({
          title: "Location detection failed",
          description: "Please enter your location manually",
          variant: "destructive",
        });
      }
    };

    detectLocation();
  }, []);

  return (
    <div className="p-4 rounded-lg bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Weather</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => coords && fetchWeatherData(coords.lat, coords.lon)}
          disabled={loading}
        >
          <MapPin className="w-4 h-4" />
        </Button>
      </div>

      {weather && (
        <WeatherForecast 
          temp={weather.temp}
          condition={weather.condition}
          windSpeed={weather.windSpeed}
        />
      )}
    </div>
  );
};

export default WeatherWidget;