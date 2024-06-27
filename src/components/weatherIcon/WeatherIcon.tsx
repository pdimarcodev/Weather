import { Suspense, lazy, memo, useCallback } from 'react';
import { WMOCodesMapper } from '../../helpers';

interface Props {
  code?: number;
  isDay?: number;
}

export const WeatherIcon = ({ code, isDay }: Props) => {
  if (!code || !isDay) return null;

  const getIconName = useCallback(
    () => `${WMOCodesMapper[code]?.icon}${isDay ? 'd' : 'n'}`,
    [code, isDay]
  );

  const Icon = lazy(
    () => import(`../../assets/icons/${getIconName()}.svg?react`)
  );

  return (
    <Suspense>
      <Icon width={200} height={200} />
    </Suspense>
  );
};
