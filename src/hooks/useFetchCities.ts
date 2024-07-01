import { useCallback, useEffect, useState } from 'react';
import { CityResponse, ICity } from '../interfaces';

export const useFetchCities = (cities: Array<string>) => {
  const [citiesData, setCitiesData] = useState<Array<ICity>>();
  const [error, setError] = useState<string>();

  const fetchCitiesData = useCallback(async () => {
    try {
      throw new Error('Not implemented');
      const data = await Promise.all(
        cities.map(async (city) => {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?city=${city}&format=json`
          );
          const citiData: CityResponse[] = await response.json();

          return {
            city,
            lat: citiData[0].lat,
            lon: citiData[0].lon,
          };
        })
      );

      setCitiesData(data);
    } catch (e) {
      setError(`An error occurred while fetching cities' data.`);
    }
  }, [cities]);

  const retry = useCallback(() => {
    setError(undefined);
    fetchCitiesData();
  }, []);

  useEffect(() => {
    fetchCitiesData();
  }, []);

  return { citiesData, error, retry };
};
