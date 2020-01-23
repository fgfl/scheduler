import React, {useState, useEffect} from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from 'components/DayList';
import Appointment from 'components/Appointment/index'
import {
  getAppointmentsForDay,
  getInterview,
} from "helpers/selectors";


/**
 * @state {
 *  {
 *    day: 'selected day',
 *    days: [{
 *      id: number,
 *      name: 'day name',
 *      appointments: [number]
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
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  const setDay = (day) => setState(prev => ({...prev, day}));

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
        console.error('Failed to get /api/days.', err.message);
      })
  }, []);

  const appointmentItems = 
    getAppointmentsForDay(state, state.day).map((appointment) => {
      const interview = getInterview(state, appointment.interview);

      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
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
      </section>
    </main>
  );
}

export default Application;