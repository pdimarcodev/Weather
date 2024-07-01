import { FC } from 'react';

/**
 * Types
 */

interface Props {
  temperature?: number;
  description?: string;
  datetime?: string;
}

/**
 * Loader Component
 */
const Loader = () => (
  <div className="mt-8 w-[340px] h-[150px] bg-gray-600 rounded-lg animate-pulse" />
);

export const WeatherInfo: FC<Props> = ({
  temperature,
  description,
  datetime,
}) => {
  if (!temperature || !description || !datetime) return <Loader />;

  return (
    <>
      <span className="text-6xl text-gray-300">{temperature}°C</span>
      <span className="text-4xl text-gray-300 my-2">{description}</span>
      <span className="text-2xl text-gray-300 mt-2">{datetime}</span>
    </>
  );
};
