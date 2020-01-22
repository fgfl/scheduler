import React, {useState, useEffect} from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from 'components/DayList';
import {Appointment} from 'components/Appointment/index'


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: '2pm',
    interview: {
      student: 'Joe',
      interviewer: { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    }
  },
  {
    id: 4,
    time: '3pm',
    interview: {
      student: 'Swanson',
      interviewer: { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    }
  },
  {
    id: 5,
    time: '6pm',
    interview: {
      student: 'Peter Griffin',
      interviewer: { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
    }
  },
  {
    id: 6,
    time: 'last',
  }
];


/**
 * @state {'day name'} day 
 * @state {[{
 *  id: number,
 *  name: 'day name',
 *  appointment: [number] apt id,
 *  interviewers: [number] interviewer id,
 *  sports: number}]} days
 */
const Application = () => {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);
  
  const appointmentItems = 
    appointments.map((appointment) => (
      <Appointment
        key={appointment.id}
        {...appointment}
      />
    ));

  useEffect(() => {
    axios.get('/api/days')
      .then((res) => {
        setDays(res.data);
      })
      .catch((err) => {
        console.error('Failed to get /api/days.', err.message);
      })
  }, [])

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
                days={days}
                day={day}
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