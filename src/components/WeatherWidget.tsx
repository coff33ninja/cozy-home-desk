import { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';

type WeatherCondition = 'sunny' | 'cloudy' | 'rainy';

interface WeatherData {
  temp?: number;
  condition?: WeatherCondition;
}

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData>({});

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.weather.com/data');
        const data: WeatherData = await response.json();
        setWeather(data);
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