import { BiSearch } from 'react-icons/bi';
import Dropdown from './Dropdown';
import { ChangeEvent } from 'react';

type Props = {
  onQueryAppointment: (q: string) => void;
  query: string;
  sort: string;
  onSortChange: (sort: string) => void;
  order: string;
  onOrderChange: (sort: string) => void;
};

export interface dropdownObjecttype {
  id: number;
  label: string;
  value: string;
}
export type DropdownDataType = dropdownObjecttype[];

const data: DropdownDataType = [
  { id: 1, label: 'Pet Name', value: 'petName' },
  { id: 2, label: 'Owner Name', value: 'ownerName' },
  { id: 3, label: 'Date', value: 'aptDate' },
];
const Search = ({
  query,
  onQueryAppointment,
  sort,
  onSortChange,
  order,
  onOrderChange,
}: Props) => {
  const OnQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryAppointment(event.target!.value);
  };

  return (
    <div className="my-3 relative">
      <div className="relative">
        <input
          autoComplete="off"
          onChange={(event) => OnQueryChange(event)}
          className="shadow rounded border-2 border-gray-400 py-3 px-10 w-full placeholder:font-medium focus:outline-none focus:bg-gray-100 focus:border-gray-100"
          placeholder="Search"
          value={query}
          type="search"
          name="query"
          id="query"
        />
        <BiSearch className="absolute top-[17px] left-4 text-xl" />
      </div>
      <div className="shadow-lg absolute top-0 right-0">
        <Dropdown
          onOrderChange={onOrderChange}
          onSortChange={onSortChange}
          order={order}
          sort={sort}
          defLabel="Sort By"
          data={data}
        />
      </div>
    </div>
  );
};

export default Search;
