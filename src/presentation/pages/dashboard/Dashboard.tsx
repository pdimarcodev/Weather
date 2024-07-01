import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Dropdown,
  Error,
  ShowIf,
  WeatherIcon,
  WeatherInfo,
  WindInfo,
} from '../../components';
import { useFetchCities, useFetchWeatherData } from '../../../hooks';
import { WMOCodesMapper, dateTimeFormatter } from '../../../helpers';
import { CurrentWeather, ICity } from '../../../interfaces';

/**
 * Constants
 */
const CITIES = ['Milan', 'New York', 'Sydney'];
const backgroundColor = {
  day: 'from-sky-600 to-indigo-600',
  night: 'from-gray-800 to-gray-950',
};

/**
 * Dashboard Page
 */
export const Dashboard = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<ICity>();
  const {
    citiesData: cities,
    error: citiesError,
    retry: retryCitiesData,
  } = useFetchCities(CITIES);
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
    retry: retryWeatherData,
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

  const retry = useCallback(() => {
    retryCitiesData();
    retryWeatherData();
  }, []);

  useEffect(() => {
    if (!!cities?.length && !selectedCity) {
      setSelectedCity(cities[0]);

      const list = cities.map((city) => city.city);
      setOptions(list);
    }
  }, [cities]);

  return (
    <div
      className={`flex flex-col m-auto h-screen place-items-center bg-gradient-to-r ${isDay === 0 ? backgroundColor.night : backgroundColor.day}`}
    >
      <h1 className="my-8 text-6xl text-gray-300">Current Weather</h1>
      <ShowIf condition={!citiesError && !weatherError}>
        <Dropdown
          list={options}
          value={selectedCity?.city}
          onSelect={onSelect}
        />
        <div className="mt-6">
          <WeatherIcon code={weatherCode} isDay={isDay} />
        </div>
        <WeatherInfo
          temperature={roundedTemperature}
          description={description}
          datetime={datetime}
        />
        <WindInfo direction={windDirection} speed={windSpeed} />
      </ShowIf>
      <ShowIf condition={!!citiesError || !!weatherError}>
        <Error errors={[citiesError || '', weatherError || '']} retry={retry} />
      </ShowIf>
    </div>
  );
};
