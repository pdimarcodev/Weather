import { Suspense, lazy, useCallback } from 'react';
import { WMOCodesMapper } from '../../../helpers';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

interface Props {
  code?: number;
  isDay?: number;
}

export const WeatherIcon = ({ code, isDay }: Props) => {
  if (code === undefined || isDay === undefined) return null;

  const getIconName = useCallback(
    () => `${WMOCodesMapper[code]?.icon}${isDay ? 'd' : 'n'}`,
    [code, isDay]
  );

  const Icon = lazy(
    () => import(`../../../assets/icons/${getIconName()}.svg?react`)
  );

  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <Icon width={250} height={250} />
      </Suspense>
    </ErrorBoundary>
  );
};
