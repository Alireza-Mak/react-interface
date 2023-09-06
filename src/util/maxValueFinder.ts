import { Appointment } from '../App';

const maxValueFinder = (array: Appointment): number => {
  let max = -Infinity;
  if (array.length === 0) {
    max = -1;
  } else {
    array.forEach((element) => {
      if (Number(element.id) > max) max = Number(element.id);
    });
  }
  return max;
};
export default maxValueFinder;