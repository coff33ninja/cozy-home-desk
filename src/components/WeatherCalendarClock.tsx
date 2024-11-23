import { useState, useEffect } from 'react';
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { WeatherForecast } from './WeatherForecast';
import { Card } from '@/components/ui/card';
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
    <Card className={`relative h-full transition-all duration-300 bg-background text-foreground p-dynamic-2 ${className}`}>
      <div className="absolute top-dynamic-1 right-dynamic-1 flex items-center gap-dynamic-2">
        <div className="flex items-center space-x-dynamic-1">
          <Label htmlFor="clock-type" className="text-dynamic-xs text-gray-300">Analog</Label>
          <Switch
            id="clock-type"
            checked={isAnalog}
            onCheckedChange={setIsAnalog}
          />
        </div>
      </div>

      <div className="p-dynamic-2 space-y-dynamic-2 h-full flex flex-col items-center">
        <div className="flex justify-center items-center h-32">
          {isAnalog ? (
            <AnalogClock />
          ) : (
            <div className="text-dynamic-xl font-bold text-center font-mono">{time}</div>
          )}
        </div>

        <div className="w-full max-w-xs">
          <CalendarUI
            mode="single"
            selected={date}
            onSelect={(newDate) => setDate(newDate || new Date())}
            className="rounded-md w-full scale-90 transform-origin-top"
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