const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';
const API_KEY = '1b18ce13c84e21faafb19c931bb29331';

export interface WeatherData {
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  location?: string;
  forecast?: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
}

export const getWeatherCondition = (apiCondition: string): WeatherData['condition'] => {
  if (apiCondition.toLowerCase().includes('rain')) return 'rainy';
  if (apiCondition.toLowerCase().includes('cloud')) return 'cloudy';
  return 'sunny';
};

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(
    `${WEATHER_API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Weather API error: ${errorData.message}`);
  }
  
  const data = await response.json();
  
  return {
    temp: Math.round(data.main.temp),
    condition: getWeatherCondition(data.weather[0].main),
    location: data.name
  };
};

export const fetchForecast = async (lat: number, lon: number): Promise<ForecastDay[]> => {
  const response = await fetch(
    `${WEATHER_API_BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Weather API error: ${errorData.message}`);
  }
  
  const data = await response.json();
  
  // Get one forecast per day
  const dailyForecasts = data.list.filter((item: any) => 
    item.dt_txt.includes('12:00:00')
  ).slice(0, 5);

  return dailyForecasts.map((forecast: any) => ({
    date: new Date(forecast.dt * 1000).toLocaleDateString(),
    temp: Math.round(forecast.main.temp),
    condition: getWeatherCondition(forecast.weather[0].main)
  }));
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