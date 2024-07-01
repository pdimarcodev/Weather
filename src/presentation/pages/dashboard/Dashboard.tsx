import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { WeatherIcon } from '../../components/weatherIcon/WeatherIcon';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { WindInfo } from '../../components/windInfo/WindInfo';
import { useFetchCities } from '../../../hooks/useFetchCities';
import { useFetchWeatherData } from '../../../hooks/useFetchWeatherData';
import { WMOCodesMapper, dateTimeFormatter } from '../../../helpers';
import { CurrentWeather, ICity } from '../../../interfaces';

/**
 * Constants
 */
const CITIES = ['Milan', 'New York', 'Sydney'];
const backgroundColor = {
  day: 'bg-gradient-to-r from-sky-600 to-indigo-600',
  night: 'bg-gradient-to-r from-night-600 to-night-800',
};

/**
 * Loader Component
 */
const Loader = memo(() => (
  <div className="mt-8 w-[340px] h-[150px] bg-gray-600 rounded-lg animate-pulse" />
));

/**
 * Dashboard Component
 */
export const Dashboard = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<ICity>();
  const { citiesData: cities, error: citiesError } = useFetchCities(CITIES);
  const {
    weatherData: {
      current_weather: {
        weathercode: weatherCode,
        temperature,
        time,
        is_day: isDay,
        winddirection: windDirection,
        windspeed: windSpeed,
      } = {} as CurrentWeather,
    } = {},
    error: weatherError,
  } = useFetchWeatherData(selectedCity) || {};

  const description = useMemo(() => {
    if (weatherCode !== undefined) {
      return (
        WMOCodesMapper[weatherCode]?.description ?? 'No description available'
      );
    }
  }, [weatherCode]);

  const roundedTemperature = useMemo(() => {
    if (temperature !== undefined) {
      return Math.round(temperature) ?? 'N/A';
    }
  }, [temperature]);

  const datetime = useMemo(() => dateTimeFormatter(time), [time]);

  const onSelect = useCallback(
    (city: string) => {
      if (!!cities?.length) {
        setSelectedCity(cities.find((c) => c.city === city));
      }
    },
    [cities]
  );

  const getBackgroundColor = useCallback(
    () => (isDay ? backgroundColor.day : backgroundColor.night),
    [isDay]
  );

  useEffect(() => {
    if (!!cities?.length && !selectedCity) {
      setSelectedCity(cities[0]);

      const list = cities.map((city) => city.city);
      setOptions(list);
    }
  }, [cities]);

  console.log('Temp', temperature);

  return (
    <div className="flex flex-col m-auto h-screen place-items-center bg-gradient-to-r from-sky-600 to-indigo-600">
      {/* <div
          data-color={getBackgroundColor()}
          className={`flex justify-center flex-col m-auto h-screen place-items-center ${getBackgroundColor()}`}
        > */}
      <h1 className="my-8 text-6xl text-gray-300">Current Weather</h1>
      <Dropdown list={options} value={selectedCity?.city} onSelect={onSelect} />
      <div className="mt-6">
        <WeatherIcon code={weatherCode} isDay={isDay} />
      </div>
      {!roundedTemperature || !description || !datetime ? (
        <Loader />
      ) : (
        <>
          <span className="text-6xl text-gray-300">{roundedTemperature}°C</span>
          <span className="text-4xl text-gray-300 my-2">{description}</span>
          <span className="text-2xl text-gray-300 mt-2">{datetime}</span>
        </>
      )}
      <WindInfo direction={windDirection} speed={windSpeed} />
    </div>
  );
};
