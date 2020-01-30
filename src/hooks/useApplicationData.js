import { useReducer, useEffect } from 'react';
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from 'reducers/application';

const initialState = {
  day: 'Monday',
  days: [],
  appointments: {},
  interviewers: {},
};

const useApplication = () => {
  const [state, dispatchState] = useReducer(reducer, initialState);

  // Initial set up. Get data from database and open websocket
  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    webSocket.onopen = event => {};

    webSocket.onmessage = e => {
      dispatchState({ ...JSON.parse(e.data) });
    };

    const getDaysPromise = axios.get('/api/days');
    const getAppointmentsPromise = axios.get('/api/appointments');
    const getInterviewersPromise = axios.get('/api/interviewers');

    Promise.all([
      getDaysPromise,
      getAppointmentsPromise,
      getInterviewersPromise,
    ])
      .then(([days, apts, interviewers]) => {
        dispatchState({
          type: SET_APPLICATION_DATA,
          value: {
            days: days.data,
            appointments: apts.data,
            interviewers: interviewers.data,
          },
        });
      })
      .catch(err => {
        console.error('Failed to GET request.', err.message);
      });

    return () => {
      webSocket.close();
    };
  }, []);

  /**
   *
   * @param {'selected day'} day
   */
  const setDay = day => dispatchState({ type: SET_DAY, value: day });

  /**
   *
   * @param {Number} id - appointment id
   * @param {{student: '' , interviewer: number}} interview - student name, interviewer id
   */
  const bookInterview = (id, interview) => {
    return axios
      .put(`/api/appointments/${id}`, {
        interview: interview,
      })
      .then(res => {
        dispatchState({
          type: SET_INTERVIEW,
          id,
          interview,
        });
        return res;
      });
  };

  /**
   *
   * @param {Number} id - appointment id
   */
  const cancelInterview = id => {
    return axios.delete(`/api/appointments/${id}`).then(res => {
      dispatchState({
        type: SET_INTERVIEW,
        id,
        interview: null,
      });
      return res;
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplication;
