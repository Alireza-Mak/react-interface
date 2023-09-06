import { BiTrash } from 'react-icons/bi';
import { SingleAppointmentProps } from '../App';

type Props = {
  appointments: SingleAppointmentProps[];
  onDeleteAppointment: (id: string) => void;
};
const InfoAppointment = ({ appointments, onDeleteAppointment }: Props) => {
  const handleDeleteAppointment = (id: string) => {
    onDeleteAppointment(id);
  };
  const renderAppInfo = appointments.map(
    ({ aptDate, aptNotes, id, ownerName, petName }: SingleAppointmentProps) => (
      <li className="px-3 py-3 flex items-start" key={id}>
        <button
          onClick={() => handleDeleteAppointment(id)}
          type="button"
          className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <BiTrash />
        </button>
        <div className="flex-grow">
          <div className="flex items-center">
            <span className="flex-none font-medium text-2xl text-blue-500">
              {petName}
            </span>
            <span className="flex-grow text-right">{aptDate}</span>
          </div>
          <div>
            <b className="font-bold text-blue-500">Owner:</b> {ownerName}
          </div>
          <div className="leading-tight">{aptNotes}</div>
        </div>
      </li>
    )
  );
  return <ul className="divide-y deivide-gray-200">{renderAppInfo}</ul>;
};

export default InfoAppointment;
