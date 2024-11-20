import { ForecastDay } from '@/lib/weatherService';
import { Cloud, Sun, CloudRain } from 'lucide-react';

interface WeatherForecastProps {
  forecast: ForecastDay[];
}

export const WeatherForecast = ({ forecast }: WeatherForecastProps) => {
  const getWeatherIcon = (condition: ForecastDay['condition']) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-6 h-6" />;
      case 'cloudy':   
        return <Cloud className="w-6 h-6" />;   
      case 'rainy':       
        return <CloudRain className="w-6 h-6" />;   
    }
  };

  return (
    <div className="grid grid-cols-5 gap-2 mt-4">
      {forecast.map((day) => (
        <div key={day.date} className="text-center p-2">
          <div className="text-sm text-muted-foreground">{day.date}</div>
          {getWeatherIcon(day.condition)}
          <div className="text-sm font-semibold">{day.temp}°C</div>
        </div>
      ))}
    </div>
  );
};