/**
 * 
 * @param {{
 *    day: 'selected day',
 *    days: [{
 *      id: number,
 *      name: 'day name',
 *      appointments: [number]
 *    }],
 *    appointments: {
 *      key: {
 *        id: number,
 *        time: '',
 *        interview: {student: '', interviewer: number, avatar: 'url'}}
 *    }
 * }} state 
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