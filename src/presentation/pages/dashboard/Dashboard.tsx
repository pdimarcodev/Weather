import { useCallback, useEffect, useMemo, useState } from 'react';
import { WeatherIcon } from '../../components/weatherIcon/WeatherIcon';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { useFetchCities } from '../../../hooks/useFetchCities';
import { useFetchWeatherData } from '../../../hooks/useFetchWeatherData';
import { WMOCodesMapper } from '../../../helpers';
import { ICity } from '../../../interfaces';

const CITIES = ['Milan', 'New York', 'Sydney'];
const backgroundColor = {
  day: 'bg-gradient-to-r from-sky-600 to-indigo-600',
  night: 'bg-gradient-to-r from-night-600 to-night-800',
};

export const Dashboard = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<ICity>();
  const { citiesData: cities, error: citiesError } = useFetchCities(CITIES);
  const { weatherData: weather, error: weatherError } =
    useFetchWeatherData(selectedCity);
  const description =
    WMOCodesMapper[weather?.current_weather?.weathercode || 0]?.description;
  const temperature = useMemo(
    () => Math.round(weather?.current_weather?.temperature || 0),
    [weather?.current_weather?.temperature]
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
      weather?.current_weather?.is_day
        ? backgroundColor.day
        : backgroundColor.night,
    [weather?.current_weather?.is_day]
  );

  useEffect(() => {
    if (!!cities?.length && !selectedCity) {
      setSelectedCity(cities[0]);

      const list = cities.map((city) => city.city);
      setOptions(list);
    }
  }, [cities]);

  return (
    <div className="flex flex-col m-auto h-screen place-items-center bg-gradient-to-r from-sky-600 to-indigo-600">
      {/* <div
          data-color={getBackgroundColor()}
          className={`flex justify-center flex-col m-auto h-screen place-items-center ${getBackgroundColor()}`}
        > */}
      <h1 className="my-8 text-6xl text-gray-300">Current Weather</h1>

      <Dropdown list={options} value={selectedCity?.city} onSelect={onSelect} />

      <div className="mt-6">
        <WeatherIcon
          code={weather?.current_weather?.weathercode}
          isDay={weather?.current_weather?.is_day}
        />
      </div>
      <span className="text-6xl text-gray-300">{temperature}°C</span>
      <span className="text-4xl text-gray-300">{description}</span>
    </div>
  );
};
