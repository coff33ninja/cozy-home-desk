import { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { WeatherData, fetchWeather, fetchForecast, getCurrentLocation } from '@/lib/weatherService';
import { WeatherForecast } from './WeatherForecast';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Fallback data if API is not configured
const mockWeatherData: WeatherData = {
  temp: 22,
  condition: 'sunny',
  location: 'Sample City'
};

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData>(mockWeatherData);
  const [forecast, setForecast] = useState<WeatherData['forecast']>([]);
  const [coords, setCoords] = useState<{lat: number, lon: number}>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const fetchWeatherData = async (latitude: number, longitude: number) => {
    setLoading(true);
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(latitude, longitude),
        fetchForecast(latitude, longitude)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
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

      {weather.temp && (
        <>
          <div className="flex items-center gap-4">
            {getWeatherIcon()}
            <div>
              <p className="text-2xl font-bold">{weather.temp}°C</p>
              <p className="text-sm text-muted-foreground capitalize">
                {weather.condition} - {weather.location}
              </p>
            </div>
          </div>
          
          {forecast && <WeatherForecast forecast={forecast} />}
        </>
      )}
    </div>
  );
};

export default WeatherWidget;