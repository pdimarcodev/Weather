import { memo, useCallback, useLayoutEffect, useState } from 'react';
import { WMOCodesMapper } from '../../../helpers';

/**
 * Types
 */
interface Props {
  code?: number;
  isDay?: number;
}

/**
 * Loader Component
 */
const Loader = () => (
  <div className="w-[250px] h-[250px] shrink-0 bg-gray-400 rounded-full animate-pulse" />
);

/**
 * Empty State Component
 */
const EmptyState = () => (
  <div className="w-[250px] h-[250px] flex justify-center items-center">
    <span className="text-2xl text-gray-300">No image available.</span>
  </div>
);

/**
 * WeatherIcon Component
 */
export const WeatherIcon = memo(({ code, isDay }: Props) => {
  const [iconUrl, setIconUrl] = useState<string>();

  const getUrl = useCallback(() => {
    const iconCode = WMOCodesMapper[code!]?.icon;

    if (iconCode === undefined) {
      setIconUrl('');
      return;
    }

    const url = new URL(
      `../../../assets/icons/${iconCode}${isDay ? 'd' : 'n'}.svg`,
      import.meta.url
    ).href;

    setIconUrl(url);
  }, [code, isDay]);

  useLayoutEffect(() => {
    if (code !== undefined && isDay !== undefined) {
      getUrl();
    }
  }, [code, isDay]);

  if (iconUrl === undefined) return <Loader />;
  if (iconUrl === '') return <EmptyState />;

  return <img src={iconUrl} width={250} height={250} />;
});
