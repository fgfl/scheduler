import React from "react";

import "components/Application.scss";

import DayList from 'components/DayList';
import Appointment from 'components/Appointment/index'
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";
import useApplication from 'hooks/useApplicationData';


/**
 * @state {
 *  {
 *    day: 'selected day',
 *    days: [{
 *      id: number,
 *      name: 'day name',
 *      appointments: [number]
 *      interviewers: [number]
 *      spots: number
 *    }],
 *    appointments: {
 *      'id#': {
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
 *  }
 * }
 */
const Application = () => {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplication();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointmentItems = 
    getAppointmentsForDay(state, state.day).map((appointment) => {
      const interview = getInterview(state, appointment.interview);

      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    });


  return (
    <main className="layout">
      <section className="sidebar">
        {
          <React.Fragment>
            <img
              className="sidebar--centered"
              src="images/logo.png"
              alt="Interview Scheduler"
            />
            <hr className="sidebar__separator sidebar--centered" />
            <nav className="sidebar__menu">
              <DayList
                days={state.days}
                day={state.day}
                setDay={setDay}
              />
            </nav>
            <img
              className="sidebar__lhl sidebar--centered"
              src="images/lhl.png"
              alt="Lighthouse Labs"
            />
          </React.Fragment>
        }
      </section>
      <section className="schedule">
        {appointmentItems}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

export default Application;