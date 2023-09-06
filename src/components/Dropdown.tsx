import { useState, useRef, useEffect } from 'react';
import { DropdownDataType, dropdownObjecttype } from './Search';
import { BiCaretDown, BiCaretLeft, BiCheck } from 'react-icons/bi';

type Props = {
  defLabel: string;
  data: DropdownDataType;
  sort: string;
  onSortChange: (sort: string) => void;
  order: string;
  onOrderChange: (sort: string) => void;
};

const orderData = [
  { id: 1, label: 'Asc', value: 'asc' },
  { id: 2, label: 'Desc', value: 'desc' },
];

const Dropdown = ({
  data,
  defLabel,
  sort,
  onSortChange,
  order,
  onOrderChange,
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const sign = isOpen ? <BiCaretDown /> : <BiCaretLeft />;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectSortOptions = (value: string) => {
    setIsOpen(!isOpen);
    onSortChange(value);
  };
  const handleSelectOrderOptions = (value: string) => {
    setIsOpen(!isOpen);
    onOrderChange(value);
  };
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () =>
      document.removeEventListener('click', handleOutsideClick, true);
  });

  const renderSortOptions = data.map(
    ({ label, id, value }: dropdownObjecttype) => (
      <div
        onClick={() => handleSelectSortOptions(value)}
        className={`${
          label.toLocaleLowerCase() === 'default' && 'border-b'
        } hover:bg-sky-100  cursor-pointer py-3 flex items-center justify-between w-full px-3`}
        key={id}
      >
        {label}
        {sort === value && <BiCheck className="text-xl" />}
      </div>
    )
  );
  const renderOrderOptions = orderData.map(({ label, id, value }) => (
    <div
      onClick={() => handleSelectOrderOptions(value)}
      className={`${
        label.toLocaleLowerCase() === 'asc' && 'border-t'
      } hover:bg-sky-100  cursor-pointer py-3 flex items-center justify-between w-full px-3`}
      key={id}
    >
      {label}
      {order === value && <BiCheck className="text-xl" />}
    </div>
  ));
  return (
    <div ref={dropdownRef} className="relative w-36">
      <div
        onClick={handleClick}
        className="flex items-center justify-center cursor-pointer px-4 py-3 rounded-r bg-blue-400 border-4 border-blue-400 text-sm text-white hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        {defLabel || 'Sort By'}
        <div className="ml-3">{sign}</div>
      </div>
      <div
        className={`absolute top-full right-0 rounded ${
          isOpen && 'border'
        } bg-white w-48 text-center`}
      >
        {isOpen && renderSortOptions}
        {isOpen && renderOrderOptions}
      </div>
    </div>
  );
};

export default Dropdown;
