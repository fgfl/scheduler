import {useReducer, useEffect} from 'react';
import axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

const initialState = {
  day: 'Monday',
  days: [],
  appointments: {},
  interviewers: {},
};

const reducerLookup = {
  [SET_DAY]: (state, action) => ({...state, day: action.value}),
  [SET_APPLICATION_DATA]: (state, action) => ({...state, ...action.value}),
  [SET_INTERVIEW]: (state, action) => ({...state, appointments: action.value}),
  default: (state, action) => {
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  }
};

const reducer = (state, action) => {
  return (
    (reducerLookup[action.type] && reducerLookup[action.type](state, action)) ||
    (reducerLookup.default(state, action))
  ); 
};

const useApplication = () => {
  
  const [state, dispatchState] = useReducer(reducer, initialState);

  useEffect(() => {
    const getDaysPromise = axios.get('/api/days');
    const getAppointmentsPromise = axios.get('/api/appointments');
    const getInterviewersPromise = axios.get('/api/interviewers');

    Promise.all([getDaysPromise, getAppointmentsPromise, getInterviewersPromise])
      .then(([days, apts, interviewers]) => {
        dispatchState({
          type: SET_APPLICATION_DATA,
          value: {
            days: days.data,
            appointments: apts.data,
            interviewers: interviewers.data
          } 
        });
      })
      .catch((err) => {
        console.error('Failed to GET request.', err.message);
      })
  }, []);

  /**
   * 
   * @param {'selected day'} day 
   */
  const setDay = (day) => dispatchState({type: SET_DAY, value: day}); 

  /**
   * 
   * @param {Number} id - appointment id
   * @param {{student: '' , interviewer: number}} interview - student name, interviewer id
   */
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview},
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(
      `/api/appointments/${id}`,
      {
        interview: appointment.interview
      })
      .then((res) => {
        dispatchState({
          type: SET_INTERVIEW,
          value: appointments}
        );
        return res;
      });
  };

  /**
   * 
   * @param {Number} id - appointment id
   */
  const cancelInterview = (id) => {
    console.log(id)
    console.log(state);
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return (
      axios.delete(`/api/appointments/${id}`)
        .then((res) => {
          dispatchState({
            type: SET_INTERVIEW,
            value: appointments}
          );
          return res;
        })
    );
  };


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplication;