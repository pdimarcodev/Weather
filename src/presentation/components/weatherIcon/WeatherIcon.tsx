import { memo, useCallback } from 'react';
import { WMOCodesMapper } from '../../../helpers';

interface Props {
  code?: number;
  isDay?: number;
}

const Loader = memo(() => (
  <div className="w-[250px] h-[250px] shrink-0 bg-gray-400 rounded-full animate-pulse" />
));

export const WeatherIcon = memo(({ code, isDay }: Props) => {
  if (code === undefined || isDay === undefined) return <Loader />;

  const getIconName = useCallback(
    () => `${WMOCodesMapper[code]?.icon}${isDay ? 'd' : 'n'}`,
    [code, isDay]
  );

  function getImageUrl() {
    return new URL(
      `../../../assets/icons/${getIconName()}.svg`,
      import.meta.url
    ).href;
  }

  return <img src={getImageUrl()} width={250} height={250} />;
});
