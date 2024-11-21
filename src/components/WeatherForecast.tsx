import { Cloud, Sun, CloudRain, Wind } from 'lucide-react';

interface WeatherProps {
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  windSpeed?: number;
}

export const WeatherForecast = ({ temp, condition, windSpeed }: WeatherProps) => {
  const getWeatherIcon = (weatherCondition: WeatherProps['condition']) => {
    switch (weatherCondition) {
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
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex items-center gap-4">
        {getWeatherIcon(condition)}
        <div className="text-2xl font-bold">{temp}°C</div>
      </div>
      {windSpeed && (
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4" />
          <span>{windSpeed} km/h</span>
        </div>
      )}
    </div>
  );
};