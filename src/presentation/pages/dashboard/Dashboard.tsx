import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { WeatherIcon } from '../../../components/weatherIcon/WeatherIcon';
import { Dropdown } from '../../../components/dropdown/Dropdown';
import ErrorBoundary from '../../../components/errorBoundary/ErrorBoundary';
import { useFetchWeatherData } from '../../../hooks/useFetchWeatherData';
import { CityResponse, ICity } from '../../../interfaces';
import { WMOCodesMapper } from '../../../helpers';

const CITIES = ['Milan', 'New York', 'Sydney'];
const backgroundColor = {
  day: 'bg-gradient-to-r from-sky-600 to-indigo-600',
  night: 'bg-gradient-to-r from-night-600 to-night-800',
};

export const Dashboard = () => {
  const [cities, setCities] = useState<Array<ICity>>();
  const [options, setOptions] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<ICity>();
  const { data: weatherData, error } = useFetchWeatherData(selectedCity);
  const description =
    WMOCodesMapper[weatherData?.current_weather?.weathercode || 0]?.description;
  const temperature = useMemo(
    () => Math.round(weatherData?.current_weather?.temperature || 0),
    [weatherData?.current_weather?.temperature]
  );

  const onSelect = useCallback(
    (city: string) => {
      if (!!cities?.length) {
        setSelectedCity(cities.find((c) => c.city === city));
      }
    },
    [cities]
  );

  const getBackgroundColor = useCallback(
    () =>
      weatherData?.current_weather?.is_day
        ? backgroundColor.day
        : backgroundColor.night,
    [weatherData?.current_weather?.is_day]
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

      setCities(citiesData);
    } catch (error) {
      console.error('An error occurred while fetching the data.');
    }
  };

  useEffect(() => {
    fetchCitiesData();
  }, []);

  useEffect(() => {
    if (!!cities?.length && !selectedCity) {
      setSelectedCity(cities[0]);

      const list = cities.map((city) => city.city);
      setOptions(list);
    }
  }, [cities]);

  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col m-auto h-screen place-items-center bg-gradient-to-r from-sky-600 to-indigo-600">
          {/* <div
          data-color={getBackgroundColor()}
          className={`flex justify-center flex-col m-auto h-screen place-items-center ${getBackgroundColor()}`}
        > */}
          <h1 className="my-8 text-6xl text-gray-300">Current Weather</h1>
          <Dropdown
            list={options}
            value={selectedCity?.city}
            onSelect={onSelect}
          />
          <div className="mt-6">
            <WeatherIcon
              code={weatherData?.current_weather?.weathercode}
              isDay={weatherData?.current_weather?.is_day}
            />
          </div>
          <span className="text-6xl text-gray-300">{temperature}°C</span>
          <span className="text-4xl text-gray-300">{description}</span>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};
