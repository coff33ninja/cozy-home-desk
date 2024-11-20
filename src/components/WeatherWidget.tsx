import { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';

type WeatherCondition = 'sunny' | 'cloudy' | 'rainy';

interface WeatherData {
  temp?: number;
  condition?: WeatherCondition;
}

// Mock data to avoid API errors
const mockWeatherData: WeatherData = {
  temp: 22,
  condition: 'sunny'
};

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData>({});

  useEffect(() => {
    // Simulate API call with mock data
    const fetchWeather = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWeather(mockWeatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun />;
      case 'cloudy':   
        return <Cloud />;   
      case 'rainy':       
        return <CloudRain />;   
      default:
        return <Sun />;
    }
  };

  return (
    <div>
      <h2>Weather</h2>
      {weather.temp && (
        <div>
          <p>Temperature: {weather.temp}°C</p>
          <p>{getWeatherIcon()}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;