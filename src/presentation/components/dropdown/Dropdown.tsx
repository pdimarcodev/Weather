import { FC, useEffect, useRef, useState } from 'react';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

/**
 * Types
 */
interface Props {
  list?: string[];
  value?: string;
  onSelect: (item: string) => void;
}

/**
 * Constants
 */
const ESCAPE = 'Escape';
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';

/**
 * Loader Component
 */
const Loader = () => (
  <div className="w-[340px] h-[75px] bg-gray-600 rounded-lg animate-pulse" />
);

/**
 * Dropdown Component
 */
export const Dropdown: FC<Props> = ({ list, value, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onSelectItem = (item: string) => {
    onSelect(item);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (key === ESCAPE || key === ARROW_UP) {
      setIsOpen(false);
    }

    if (key === ARROW_DOWN) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!list?.length || !value) return <Loader />;

  return (
    <div
      ref={dropdownRef}
      className="relative flex flex-col items-center w-[340px] h-[75px] rounded-lg"
    >
      <button
        className="bg-blue-400 p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white"
        onClick={() => setIsOpen((v) => !v)}
      >
        {value}
        {isOpen ? (
          <AiOutlineCaretDown className="h-8" />
        ) : (
          <AiOutlineCaretUp className="h-8" />
        )}
      </button>
      {isOpen && !!list?.length && (
        <div className="bg-blue-400 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full">
          {list.map(
            (item) =>
              item !== value && (
                <div
                  key={item}
                  className="flex w-full justify-between p-4 hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
                  onClick={() => onSelectItem(item)}
                >
                  <h3 className="font-bold">{item}</h3>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};
