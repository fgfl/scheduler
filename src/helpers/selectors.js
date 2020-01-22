/**
 * 
 * @param {[{
 *  id: number,
 *  name: 'day name',
 *  appointments: [number],
 *  interviewers: [number],
 *  sports: number}]} state 
 * @param {''} day 
 * @return {[]} appointment id array
 */
const getAppointmentsForDay = (state, day) => {
  const [filteredDay] = state.days.filter((dayState) => {
    return dayState.name.toLowerCase() === day.toLowerCase();
  });

  if(!filteredDay || !filteredDay.appointments) {
    return [];
  }

  return filteredDay.appointments.map((aptId) => {
    return state.appointments[aptId];
  });
};

export {getAppointmentsForDay};