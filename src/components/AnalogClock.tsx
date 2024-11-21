import React, { useEffect, useState } from 'react';

export const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const secondDegrees = (time.getSeconds() / 60) * 360;
  const minuteDegrees = ((time.getMinutes() + time.getSeconds() / 60) / 60) * 360;
  const hourDegrees = ((time.getHours() + time.getMinutes() / 60) / 12) * 360;

  return (
    <div className="relative w-48 h-48">
      <div className="absolute w-full h-full rounded-full border-2 border-gray-600">
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-4 bg-gray-400"
            style={{
              transform: `rotate(${i * 30}deg) translateY(5px)`,
              transformOrigin: '50% 100%',
              left: 'calc(50% - 2px)',
            }}
          />
        ))}
        
        {/* Clock hands */}
        <div
          className="absolute w-1 h-16 bg-white"
          style={{
            transform: `rotate(${hourDegrees}deg)`,
            transformOrigin: 'bottom center',
            left: 'calc(50% - 2px)',
            bottom: '50%',
          }}
        />
        <div
          className="absolute w-1 h-20 bg-white"
          style={{
            transform: `rotate(${minuteDegrees}deg)`,
            transformOrigin: 'bottom center',
            left: 'calc(50% - 1px)',
            bottom: '50%',
          }}
        />
        <div
          className="absolute w-0.5 h-24 bg-red-500"
          style={{
            transform: `rotate(${secondDegrees}deg)`,
            transformOrigin: 'bottom center',
            left: 'calc(50% - 0.5px)',
            bottom: '50%',
          }}
        />
        <div className="absolute w-3 h-3 bg-red-500 rounded-full" style={{ left: 'calc(50% - 6px)', top: 'calc(50% - 6px)' }} />
      </div>
    </div>
  );
};