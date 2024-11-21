import { useState, useEffect } from 'react';
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { WeatherForecast } from './WeatherForecast';
import { Card } from '@/components/ui/card';
import { ColorPicker } from './settings/ColorPicker';
import { fetchWeather, getCurrentLocation } from '@/lib/weatherService';
import { useToast } from '@/hooks/use-toast';

interface WeatherCalendarClockProps {
  className?: string;
}

export const WeatherCalendarClock = ({ className }: WeatherCalendarClockProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>('');
  const [bgColor, setBgColor] = useState('rgba(255, 255, 255, 0.1)');
  const [weather, setWeather] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const position = await getCurrentLocation();
        const weatherData = await fetchWeather(position.lat, position.lon);
        setWeather(weatherData);
      } catch (error) {
        toast({
          title: "Weather data fetch failed",
          description: "Could not load weather information",
          variant: "destructive",
        });
      }
    };

    fetchWeatherData();
  }, [toast]);

  return (
    <Card 
      className={`relative h-full transition-all duration-300 ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="absolute top-2 right-2">
        <ColorPicker color={bgColor} onChange={setBgColor} />
      </div>

      <div className="p-4 space-y-4 h-full flex flex-col">
        <div className="text-3xl font-bold text-center">{time}</div>

        <div className="flex-grow">
          <CalendarUI
            mode="single"
            selected={date}
            onSelect={(newDate) => setDate(newDate || new Date())}
            className="rounded-md w-full"
          />
        </div>

        {weather && (
          <WeatherForecast 
            temp={Math.round(weather.temp)}
            condition={weather.condition}
            windSpeed={weather.windSpeed}
          />
        )}
      </div>
    </Card>
  );
};