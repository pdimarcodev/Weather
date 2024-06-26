import { Suspense, useEffect, useState } from 'react';
import { useFetchWeatherData } from '../../../hooks/useFetchWeatherData';
import { WeatherIcon } from '../../../components/weatherIcon/WeatherIcon';
import { CityResponse } from '../../../interfaces';
import { Dropdown } from '../../../components/dropdown/Dropdown';

const CITIES = ['Milan', 'New York', 'Sydney'];

interface ICity {
  city: string;
  lat: string;
  lon: string;
}

export const Dashboard = () => {
  const [cities, setCities] = useState<Array<ICity>>();

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

  // useEffect(() => {
  //   fetchCitiesData();
  // }, []);

  // const { data } = useFetchWeatherData(45.46, 9.18);
  const { data } = useFetchWeatherData(-33.86, 151.21);
  // const { data } = useFetchWeatherData(-6.2, 106.82);

  // console.log(data);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex justify-center flex-col m-auto h-screen place-items-center bg-gradient-to-r from-sky-600 to-indigo-600">
        <h4>Temp: {data?.current_weather?.temperature}</h4>
        <Dropdown />
        <div>
          <WeatherIcon
            code={data?.current_weather?.weathercode}
            isDay={data?.current_weather?.is_day}
          />
        </div>
        <h3 className="">Dashboard</h3>
      </div>
    </Suspense>
  );
};
