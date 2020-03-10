const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

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

    const [interviewDayData] = [...newState.days].filter((day) =>
      day.appointments.includes(action.id)
    );

    const newSpots = interviewDayData.appointments.reduce(
      (spots, appointmentId) => {
        spots -= newState.appointments[appointmentId].interview ? 1 : 0;
        return spots;
      },
      interviewDayData.appointments.length
    );

    const days = [...state.days].map((day) => {
      if (interviewDayData.id === day.id) {
        return { ...interviewDayData, spots: newSpots };
      } else {
        return day;
      }
    });

    return { ...newState, days };
  },
  default: (action) => {
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  },
};

const reducer = (state, action) => {
  return (
    (reducerLookup[action.type] && reducerLookup[action.type](state, action)) ||
    reducerLookup.default(action)
  );
};

export default reducer;

export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW };
