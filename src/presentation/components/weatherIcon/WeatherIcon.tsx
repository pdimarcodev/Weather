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
const Loader = memo(() => (
  <div className="w-[250px] h-[250px] shrink-0 bg-gray-400 rounded-full animate-pulse" />
));

/**
 * WeatherIcon Component
 */
export const WeatherIcon = memo(({ code, isDay }: Props) => {
  const [iconUrl, setIconUrl] = useState<string>();

  const getUrl = useCallback(() => {
    // TODO: check empty state
    const url = new URL(
      `../../../assets/icons/${WMOCodesMapper[code as number]?.icon}${isDay ? 'd' : 'n'}.svg`,
      import.meta.url
    ).href;
    setIconUrl(url);
  }, [code, isDay]);

  useLayoutEffect(() => {
    if (code !== undefined && isDay !== undefined) {
      getUrl();
    }
  }, [code, isDay]);

  if (!iconUrl) return <Loader />;

  return <img src={iconUrl} width={250} height={250} />;
});
