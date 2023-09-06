import { FormEvent, useState } from 'react';

import { BiCalendarPlus } from 'react-icons/bi';
import InputHook from '../hook/InputHook';
import { SingleAppointmentProps } from '../App';
type Props = {
  onAddApp: (apt: SingleAppointmentProps) => void;
  lastId: string;
};
const AddAppointment = ({ onAddApp, lastId }: Props) => {
  const [toggle, setToggle] = useState<Boolean>(false);
  const [error, setError] = useState<string>('');
  const [ownerName, resetOwnerName] = InputHook('');
  const [petName, resetPetName] = InputHook('');
  const [aptDate, resetAptDate] = InputHook('');
  const [aptTime, resetAptTime] = InputHook('');
  const [aptNotes, resetAptNotes] = InputHook('');
  const handleAddAppointmentClick = () => {
    setToggle(!toggle);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !ownerName.value ||
      !petName.value ||
      !aptDate.value ||
      !aptTime.value ||
      !aptNotes.value
    ) {
      setError('Please fill out all fields.');
    } else {
      setError('');
      resetOwnerName();
      resetPetName();
      resetAptDate();
      resetAptTime();
      resetAptNotes();
      const apt: SingleAppointmentProps = {
        id: (Number(lastId) + 1).toString(),
        petName: petName.value,
        ownerName: ownerName.value,
        aptDate: `${aptDate.value} ${aptTime.value}`,
        aptNotes: aptNotes.value,
      };
      onAddApp(apt);
    }
  };
  return (
    <div>
      <button
        onClick={handleAddAppointmentClick}
        className={`bg-blue-400 text-white px-2 py-3 w-full text-left rounded-t-md ${
          !toggle && 'rounded-b-md'
        }`}
      >
        <div className="flex items-center">
          <BiCalendarPlus className="inline-block mr-3" /> Add Appointment
        </div>
      </button>
      {toggle && (
        <form
          onSubmit={handleSubmit}
          className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4"
        >
          <div className="flex items-center sm:pt-5 pt-2">
            <label
              htmlFor="ownerName"
              className="text-sm font-medium text-gray-700 sm:w-48 w-24"
            >
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              id="ownerName"
              value={ownerName.value}
              onChange={ownerName.onChange}
              className="flex-1 border border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md py-1 px-3"
            />
          </div>

          <div className="flex items-center sm:pt-5 pt-2">
            <label
              htmlFor="petName"
              className="text-sm font-medium text-gray-700 sm:w-48 w-24"
            >
              Pet Name
            </label>
            <input
              type="text"
              name="petName"
              id="petName"
              value={petName.value}
              onChange={petName.onChange}
              className="flex-1 border border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md py-1 px-3"
            />
          </div>

          <div className="flex items-center sm:pt-5 pt-2">
            <label
              htmlFor="aptDate"
              className="text-sm font-medium text-gray-700 sm:w-48 w-24"
            >
              Apt Date
            </label>
            <input
              type="date"
              name="aptDate"
              id="aptDate"
              value={aptDate.value}
              onChange={aptDate.onChange}
              className="flex-1 border border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md py-1 px-3"
            />
          </div>

          <div className="flex items-center sm:pt-5 pt-2">
            <label
              htmlFor="aptTime"
              className="text-sm font-medium text-gray-700 sm:w-48 w-24"
            >
              Apt Time
            </label>
            <input
              type="time"
              name="aptTime"
              id="aptTime"
              value={aptTime.value}
              onChange={aptTime.onChange}
              className="flex-1 border border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md py-1 px-3"
            />
          </div>

          <div className="flex items-center sm:pt-5 pt-2">
            <label
              htmlFor="aptNotes"
              className="text-sm font-medium text-gray-700 sm:w-48 w-24"
            >
              Appointment Notes
            </label>
            <textarea
              id="aptNotes"
              name="aptNotes"
              rows={3}
              value={aptNotes.value}
              onChange={aptNotes.onChange}
              className="flex-1 border border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block sm:text-sm border-gray-300 rounded-md py-1 px-3"
              placeholder="Detailed comments about the condition"
            ></textarea>
          </div>

          <div className="pt-5">
            <div className="flex justify-between items-center">
              <div className="text-red-700 font-bold text-xs">{error}</div>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddAppointment;
