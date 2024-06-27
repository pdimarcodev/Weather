import { Suspense, useCallback, useEffect, useState } from 'react';
import { WeatherIcon } from '../../../components/weatherIcon/WeatherIcon';
import { Dropdown } from '../../../components/dropdown/Dropdown';
import ErrorBoundary from '../../../components/errorBoundary/ErrorBoundary';
import { useFetchWeatherData } from '../../../hooks/useFetchWeatherData';
import { CityResponse, ICity } from '../../../interfaces';

const CITIES = ['Milan', 'New York', 'Sydney'];

export const Dashboard = () => {
  const [cities, setCities] = useState<Array<ICity>>();
  const [options, setOptions] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<ICity>();
  const { data: weatherData, error } = useFetchWeatherData(selectedCity);

  const onSelect = useCallback(
    (city: string) => {
      setSelectedCity(cities?.find((c) => c.city === city));
    },
    [cities]
  );

  const fetchCitiesData = async () => {
    try {
      const citiesData = await Promise.all(
        CITIES.map(async (city) => {
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

      console.log('citiesData', citiesData);
      setCities(citiesData);
    } catch (error) {
      console.error('An error occurred while fetching the data.');
    }
  };

  useEffect(() => {
    fetchCitiesData();
  }, []);

  useEffect(() => {
    if (!!cities?.length) {
      setSelectedCity(cities[0]);

      const list = cities.map((city) => city.city);
      setOptions(list);
    }
  }, [cities]);

  return (
    <div className="flex justify-center flex-col m-auto h-screen place-items-center bg-gradient-to-r from-sky-600 to-indigo-600">
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <h4>Temp: {weatherData?.current_weather?.temperature}</h4>
          <Dropdown
            list={options}
            value={selectedCity?.city}
            onSelect={onSelect}
          />
          <div>
            <WeatherIcon
              code={weatherData?.current_weather?.weathercode}
              isDay={weatherData?.current_weather?.is_day}
            />
          </div>
          <h3 className="">Dashboard</h3>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
