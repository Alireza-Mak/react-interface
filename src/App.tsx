import AddAppointment from './components/AddAppointment';
import InfoAppointment from './components/InfoAppointment';
import Search from './components/Search';
import { BiArchive } from 'react-icons/bi';
import { useCallback, useEffect, useState } from 'react';
import maxValueFinder from './util/maxValueFinder';

export type SingleAppointmentProps = {
  id: string;
  petName: string;
  ownerName: string;
  aptNotes: string;
  aptDate: string;
};
export type Appointment = SingleAppointmentProps[];

function App() {
  const [appointments, setAppointments] = useState<Appointment | []>([]);
  const [query, setQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('');

  let filteredAppointment = appointments
    .filter((item: SingleAppointmentProps) => {
      return (
        item.aptDate.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.petName.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a: any, b: any) => {
      const order = orderBy.toLowerCase() === 'asc' ? 1 : -1;
      if (sortBy !== '' && orderBy !== '') {
        return a[sortBy].toLocaleLowerCase() < b[sortBy].toLocaleLowerCase()
          ? -1 * order
          : 1 * order;
      } else {
        return b;
      }
    });
  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then((response) => response.json())
      .then(setAppointments);
  }, []);

  const handleQueryAppointment = (q: string) => {
    setQuery(q);
  };
  const handleAddApp = (apt: SingleAppointmentProps) => {
    console.log(apt.id);
    setAppointments([...appointments, apt]);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleDeleteAppointment = (id: string) => {
    const newApp = appointments.filter(
      (item: SingleAppointmentProps) => item.id !== id
    );
    setAppointments(newApp);
  };

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <div className="sm:m-5 m-3">
        <h1 className="sm:text-5xl text-2xl my-2">
          <BiArchive className="inline-block text-red-400 mb-[5px]" />
          Your Appointment
        </h1>
        <AddAppointment
          onAddApp={handleAddApp}
          lastId={maxValueFinder(appointments).toString()}
        />
        <Search
          query={query}
          onQueryAppointment={handleQueryAppointment}
          onSortChange={(sortVal: string) =>
            setSortBy((curr) => (curr === sortVal ? '' : sortVal))
          }
          sort={sortBy}
          order={orderBy}
          onOrderChange={(orderVal: string) =>
            setOrderBy((curr) => (curr === orderVal ? '' : orderVal))
          }
        />

        {appointments.length > 0 && (
          <InfoAppointment
            onDeleteAppointment={handleDeleteAppointment}
            appointments={filteredAppointment}
          />
        )}
      </div>
    </div>
  );
}

export default App;
