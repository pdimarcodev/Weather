import { useEffect, useState } from 'react';
import { ForecastResponse, ICity } from '../interfaces';

// API:
// https://open-meteo.com/en/docs/dwd-api

export const useFetchWeatherData = (city?: ICity) => {
  const [weatherData, setWeatherData] = useState<ForecastResponse>();
  const [error, setError] = useState<string>();

  const fetchWeatherData = async () => {
    const { lon, lat } = city || {};
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (e) {
      setError(`An error occurred while fetching weather's data.`);
      console.log(e);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  return { weatherData, error };
};
