import { useReducer, useEffect } from 'react';
import axios from 'axios';

const MAX_INTERVIEWS_PER_DAY = 5;

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
  [SET_DAY]: (state, action) => ({ ...state, day: action.value }),
  [SET_APPLICATION_DATA]: (state, action) => ({ ...state, ...action.value }),
  [SET_INTERVIEW]: (state, action) => {
    const appointment = {
      ...state.appointments[action.id],
      interview: action.interview,
    };
    const appointments = {
      ...state.appointments,
      [action.id]: appointment,
    };

    const newState = { ...state, appointments };

    const [interviewDayData] = [...newState.days].filter(day =>
      day.appointments.includes(action.id)
    );

    const newSpots = interviewDayData.appointments.reduce(
      (spots, appointmentId) => {
        spots -= newState.appointments[appointmentId].interview ? 1 : 0;
        return spots;
      },
      MAX_INTERVIEWS_PER_DAY
    );

    const days = [...state.days].map(day => {
      if (interviewDayData.id === day.id) {
        return { ...interviewDayData, spots: newSpots };
      } else {
        return day;
      }
    });

    return { ...newState, days };
  },
  default: action => {
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  },
};

const reducer = (state, action) => {
  return (
    (reducerLookup[action.type] && reducerLookup[action.type](state, action)) ||
    reducerLookup.default(state, action)
  );
};

const useApplication = () => {
  const [state, dispatchState] = useReducer(reducer, initialState);

  // Initial set up. Get data from database and open websocket
  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    webSocket.onopen = event => {
      // console.log('websocket open')
    };
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
