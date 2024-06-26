import { useState, useEffect } from 'react';
import { ForecastResponse } from '../interfaces';

// API:
// https://open-meteo.com/en/docs/dwd-api

export const useFetchWeatherData = (
  latitude,
  longitude
): { data?: ForecastResponse; error: string } => {
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
      try {
        const response = await fetch(url);
        if (response.status === 429) {
          setError('Too many requests. Please try again later.');
          return;
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError('An error occurred while fetching the data.');
      }
    };

    fetchData();
  }, [latitude, longitude]); // Re-fetch when coordinates change

  return { data: weatherData, error };
};
