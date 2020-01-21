import React, {useState} from "react";

import "components/Application.scss";

import DayList from 'components/DayList';
import {Appointment} from 'components/Appointment/index'

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

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


const Application = () => {
  const [day, setDay] = useState('Monday');
  const appointmentItems = 
    appointments.map((appointment) => (
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