import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WeatherCalendarClock } from './WeatherCalendarClock';
import { ScrollArea } from "@/components/ui/scroll-area";

export const TimeWeatherPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
      >
        <Clock className="w-6 h-6" />
      </Button>

      {isOpen && (
        <div 
          className="absolute top-16 left-0 w-[90vw] sm:w-96 p-4 bg-dark-card rounded-lg animate-fade-in shadow-lg border border-dark-border"
        >
          <h3 className="text-lg font-semibold mb-4">Time & Weather</h3>
          
          <div className="h-[500px]">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-6">
                <div className="text-3xl font-mono font-bold">{time}</div>
                <WeatherCalendarClock className="h-auto" />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
};