import { useState } from 'react';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const list = ['Milan', 'New York', 'Sydney'];

  return (
    <div className="relative flex flex-col items-center w-[340px] h-[240px] rounded-lg">
      <button
        className="bg-blue-400 p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white"
        onClick={() => setIsOpen((v) => !v)}
      >
        Dropdown
        {isOpen ? (
          <AiOutlineCaretUp className="h-8" />
        ) : (
          <AiOutlineCaretDown className="h-8" />
        )}
      </button>
      {isOpen && (
        <div className="bg-blue-400 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full">
          {list.map((item) => (
            <div
              key={item}
              className="flex w-full justify-between p-4 hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
              onClick={() => console.log('Clicked', item)}
            >
              <h3 className="font-bold">{item}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};