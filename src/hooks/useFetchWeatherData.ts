import { useEffect, useState } from 'react';
import { ForecastResponse, ICity } from '../interfaces';

// API:
// https://open-meteo.com/en/docs/dwd-api

export const useFetchWeatherData = (city?: ICity) => {
  const [data, setData] = useState<ForecastResponse>();
  const [error, setError] = useState<string>();

  const fetchWeatherData = async () => {
    const { lon, lat } = city || {};
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError('An error occurred while fetching the data.');
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  return { data, error };
};
