import { memo, useMemo } from 'react';
import { IconContext } from 'react-icons/lib';
import { BsHeartArrow as Arrow } from 'react-icons/bs';
import { getCardinalWindDirection } from '../../../helpers';

/**
 * Types
 */
interface Props {
  direction?: number;
  speed?: number;
}

/**
 * Constants
 */
const ICON_INITIAL_POSITION = 90;

/**
 * Loader Component
 */
const Loader = () => (
  <div className="mt-2 w-[340px] h-[30px] bg-gray-600 rounded-lg animate-pulse" />
);

/**
 * WindInfo Component
 */
export const WindInfo = memo(({ direction, speed }: Props) => {
  const rotate = useMemo(() => {
    if (direction !== undefined) {
      if (direction < ICON_INITIAL_POSITION) {
        return `rotate(${direction + 360 - ICON_INITIAL_POSITION}deg)`;
      }

      return `rotate(${direction - ICON_INITIAL_POSITION}deg)`;
    }
  }, [direction]);

  const cardinal = useMemo(
    () => getCardinalWindDirection(direction || 0),
    [direction]
  );

  if (direction === undefined || speed === undefined) return <Loader />;

  return (
    <IconContext.Provider
      value={{
        style: {
          transform: rotate,
        },
        className: 'mt-2 mx-4 text-4xl text-gray-300',
      }}
    >
      <div className="flex items-center mt-2">
        <span className="text-2xl text-gray-300">Wind:</span>
        <Arrow />
        <span className="text-2xl text-gray-300">{cardinal}</span>
        <span className="text-2xl text-gray-300 ml-4">{speed} Km/h</span>
      </div>
    </IconContext.Provider>
  );
});
