const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '1b18ce13c84e21faafb19c931bb29331';

export interface WeatherData {
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  location?: string;
  windSpeed?: number;
}

export const getWeatherCondition = (apiCondition: string): WeatherData['condition'] => {
  if (apiCondition.toLowerCase().includes('rain')) return 'rainy';
  if (apiCondition.toLowerCase().includes('cloud')) return 'cloudy';
  return 'sunny';
};

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${WEATHER_API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      temp: Math.round(data.main.temp),
      condition: getWeatherCondition(data.weather[0].main),
      location: data.name,
      windSpeed: Math.round(data.wind.speed * 3.6) // Convert m/s to km/h
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const getCurrentLocation = (): Promise<{lat: number, lon: number}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};