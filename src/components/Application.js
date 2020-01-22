import React, {useState, useEffect} from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from 'components/DayList';
import {Appointment} from 'components/Appointment/index'
import { getAppointmentsForDay } from "helpers/selectors";


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
 *      key: {
 *        id: number,
 *        time: '',
 *        interview: {student: '', interviewer: number, avatar: 'url'}}
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
  });
  
  const setDay = (day) => setState(prev => ({...prev, day}));

  useEffect(() => {
    const getDaysPromise = axios.get('/api/days');
    const getAppointmentPromise = axios.get('/api/appointments');

    Promise.all([getDaysPromise, getAppointmentPromise])
      .then(([days, appointments]) => {
        setState(prev => (
          {
            ...prev,
            days: days.data,
            appointments: appointments.data
          }
        ));
      })
      .catch((err) => {
        console.error('Failed to get /api/days.', err.message);
      })
  }, []);

  const appointmentItems = 
    getAppointmentsForDay(state, state.day).map((appointment) => (
      <Appointment
        key={appointment.id}
        {...appointment}
      />
    ));


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