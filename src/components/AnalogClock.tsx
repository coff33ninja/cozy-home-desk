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
    <div className="relative w-28 h-28">
      <div className="absolute w-full h-full rounded-full border-2 border-gray-600">
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-2 bg-gray-400"
            style={{
              transform: `rotate(${i * 30}deg) translateY(3px)`,
              transformOrigin: '50% 100%',
              left: 'calc(50% - 1px)',
            }}
          />
        ))}
        
        {/* Clock hands */}
        <div
          className="absolute w-0.5 h-10 bg-white"
          style={{
            transform: `rotate(${hourDegrees}deg)`,
            transformOrigin: 'bottom center',
            left: 'calc(50% - 0.5px)',
            bottom: '50%',
          }}
        />
        <div
          className="absolute w-0.5 h-12 bg-white"
          style={{
            transform: `rotate(${minuteDegrees}deg)`,
            transformOrigin: 'bottom center',
            left: 'calc(50% - 0.5px)',
            bottom: '50%',
          }}
        />
        <div
          className="absolute w-0.5 h-14 bg-red-500"
          style={{
            transform: `rotate(${secondDegrees}deg)`,
            transformOrigin: 'bottom center',
            left: 'calc(50% - 0.5px)',
            bottom: '50%',
          }}
        />
        <div className="absolute w-2 h-2 bg-red-500 rounded-full" style={{ left: 'calc(50% - 4px)', top: 'calc(50% - 4px)' }} />
      </div>
    </div>
  );
};