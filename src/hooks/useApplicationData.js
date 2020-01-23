import {useState, useEffect} from 'react';
import axios from 'axois';

const useApplication = (initial) => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  useEffect(() => {
    const getDaysPromise = axios.get('/api/days');
    const getAppointmentsPromise = axios.get('/api/appointments');
    const getInterviewersPromise = axios.get('/api/interviewers');

    Promise.all([getDaysPromise, getAppointmentsPromise, getInterviewersPromise])
      .then(([days, apts, interviewers]) => {
        setState(prev => (
          {
            ...prev,
            days: days.data,
            appointments: apts.data,
            interviewers: interviewers.data
          }
        ));
      })
      .catch((err) => {
        console.error('Failed to GET request.', err.message);
      })
  }, []);

  /**
   * 
   * @param {'selected day'} day 
   */
  const setDay = (day) => setState(prev => ({...prev, day}));

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
        setState({
          ...state,
          appointments
        });
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
          setState({
            ...state,
            appointments
          });
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