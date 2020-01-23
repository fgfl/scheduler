/**
 * 
 * @param {{
 *    day: 'selected day',
 *    days: [{
 *      id: number,
 *      name: 'day name',
 *      appointments: [number]
 *      interviewers: [number]
 *    }],
 *    appointments: {
 *      key: {
 *        id: number,
 *        time: '',
 *        interview: {student: '', interviewer: number}
 *      }
 *    },
 *    interviewers: {
 *      'id#': {
 *        id: number,
 *        name: 'interviewer name',
 *        avatar: 'url'
 *      }
 *    }
 * }} state 
 * @param {''} day 
 * @return {[]} appointment id array
 */
const getAppointmentsForDay = (state, day) => {
  const [filteredDay] = state.days.filter((dayState) => {
    return dayState.name.toLowerCase() === day.toLowerCase();
  });

  if(!filteredDay || filteredDay.appointments.length === 0) {
    return [];
  }

  return filteredDay.appointments.map((aptId) => {
    return state.appointments[aptId];
  });
};

/**
 * 
 * @param {{
 *    day: 'selected day',
 *    days: [{
 *      id: number,
 *      name: 'day name',
 *      appointments: [number]
 *      interviewers: [number]
 *    }],
 *    appointments: {
 *      key: {
 *        id: number,
 *        time: '',
 *        interview: {student: '', interviewer: number}
 *      }
 *    },
 *    interviewers: {
 *      'id#': {
 *        id: number,
 *        name: 'interviewer name',
 *        avatar: 'url'
 *      }
 *    }
 * }} state 
 * @param {''} day 
 * @return {[{}]} array of interviewer objects for a given day
 */
const getInterviewersForDay = (state, day) => {
  const [filteredDay] = state.days.filter((dayState) => {
    return dayState.name.toLowerCase() === day.toLowerCase();
  });

  if(!filteredDay || filteredDay.interviewers.length === 0) {
    return [];
  }

  return filteredDay.interviewers.map((interviewerId) => {
    return state.interviewers[interviewerId];
  });

};

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
 *        interview: {student: '', interviewer: number}
 *      }
 *    },
 *    interviewers: {
 *      'id#': {
 *        id: number,
 *        name: 'interviewer name',
 *        avatar: 'url'
 *      }
 *    }
 * }} state 
 * @param {{}} interview 
 * @return {{}} 
 */
const getInterview = (state, interview) => {
  if (
    !state ||
    !state.interviewers ||
    !interview || 
    !interview.interviewer
  ) {
    return null;
  }

  const parsedInterview = {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
  return parsedInterview;
};

export {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
};