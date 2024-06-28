import { Suspense, lazy, memo, useCallback } from 'react';
import { WMOCodesMapper } from '../../../helpers';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

interface Props {
  code?: number;
  isDay?: number;
}

export const WeatherIcon = memo(({ code, isDay }: Props) => {
  const Loader = () => (
    <div className="w-[250px] h-[250px] shrink-0 bg-gray-400 rounded-full animate-pulse" />
  );

  if (code === undefined || isDay === undefined) return <Loader />;

  const getIconName = useCallback(
    () => `${WMOCodesMapper[code]?.icon}${isDay ? 'd' : 'n'}`,
    [code, isDay]
  );

  const Icon = lazy(
    () => import(`../../../assets/icons/${getIconName()}.svg?react`)
  );

  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<Loader />}>
        <Icon width={250} height={250} />
      </Suspense>
    </ErrorBoundary>
  );
});
