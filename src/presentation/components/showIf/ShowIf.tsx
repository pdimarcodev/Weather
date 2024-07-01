import { FC } from 'react';

/**
 * Types
 */
interface Props {
  condition?: boolean;
  children: React.ReactNode;
}

/**
 * ShowIf Component
 */
export const ShowIf: FC<Props> = ({ condition = false, children }) => {
  if (condition) {
    return <>{children}</>;
  }
  return null;
};
