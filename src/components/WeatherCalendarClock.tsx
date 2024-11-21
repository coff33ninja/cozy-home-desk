import { useState, useEffect } from 'react';
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { WeatherForecast } from './WeatherForecast';
import { Card } from '@/components/ui/card';
import { ColorPicker } from './settings/ColorPicker';
import { fetchWeather, getCurrentLocation } from '@/lib/weatherService';
import { useToast } from '@/hooks/use-toast';
import { AnalogClock } from './AnalogClock';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface WeatherCalendarClockProps {
  className?: string;
}

export const WeatherCalendarClock = ({ className }: WeatherCalendarClockProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>('');
  const [bgColor, setBgColor] = useState('rgba(17, 17, 17, 0.7)');
  const [weather, setWeather] = useState<any>(null);
  const [isAnalog, setIsAnalog] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
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
      className={`relative h-full transition-all duration-300 bg-[#111111] text-white p-dynamic-4 ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="absolute top-dynamic-2 right-dynamic-2 flex items-center gap-dynamic-4">
        <div className="flex items-center space-x-dynamic-2">
          <Label htmlFor="clock-type" className="text-dynamic-sm text-gray-300">Analog</Label>
          <Switch
            id="clock-type"
            checked={isAnalog}
            onCheckedChange={setIsAnalog}
          />
        </div>
        <ColorPicker color={bgColor} onChange={setBgColor} />
      </div>

      <div className="p-dynamic-4 space-y-dynamic-4 h-full flex flex-col items-center">
        <div className="flex justify-center items-center h-48">
          {isAnalog ? (
            <AnalogClock />
          ) : (
            <div className="text-dynamic-2xl font-bold text-center font-mono">{time}</div>
          )}
        </div>

        <div className="flex-grow w-full max-w-md">
          <CalendarUI
            mode="single"
            selected={date}
            onSelect={(newDate) => setDate(newDate || new Date())}
            className="rounded-md w-full bg-[#1a1a1a] text-white border-gray-700"
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