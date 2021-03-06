import React, {Fragment} from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'index.scss';

import Button from '../src/components/Button';
import DayListItem from '../src/components/DayListItem';
import DayList from '../src/components/DayList';
import InterviewerListItem from '../src/components/InterviewerListItem';
import InterviewerList from '../src/components/InterviewerList';
import Appointment from '../src/components/Appointment/index';
import Header from '../src/components/Appointment/Header'
import Empty from '../src/components/Appointment/Empty'
import Show from '../src/components/Appointment/Show'
import Confirm from '../src/components/Appointment/Confirm'
import Status from '../src/components/Appointment/Status'
import Error from '../src/components/Appointment/Error'
import Form from '../src/components/Appointment/Form'

// === Buttton === 
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

// === DayList ===
storiesOf('DayListItem', module)
  .addParameters({
    backgrounds: [{name: 'dark', value: '#222f3e', default: true}]
  })
  .add('Unselected', () => <DayListItem name='Monday' spots={1}_ />)
  .add('Selected', () => <DayListItem name='Monday' spots={5} selected />)
  .add('Full', () => <DayListItem name='Monday' spots={0} />)
  .add('Clickable', () => (
    <DayListItem name='Tuesday' setDay={action('SetDay')} spots={5} />
  ));

// === DayList === 
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

storiesOf('DayList', module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add('Monday', () => (
    <DayList days={days} day={'Monday'} setDay={action('setDay')} />
  ))
  .add('Tuesday', () => (
    <DayList days={days} day={'Tuesday'} setDay={action('setDay')} />
  ));

// === InterviewerListItem ===
const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={(event) => action("setInterviewer")(interviewer.id)}
    />
  ));

// === InterviewerList ===
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      setInterviewer={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      interviewer={3}
      setInterviewer={action("setInterviewer")}
    />
  ));

// === Appointment ===
storiesOf("Appointment", module)
  .addParameters({
      backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment With Time", () => <Appointment time="12PM" />)
  .add("Header", () => <Header time="12PM"/>)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", () => (
    <Show
      student="Lydia Miller-Jones"
      interviewer={interviewer}
      onEdit={action("onEdit")}
      onDelete={action("onDelete")}
    />
  ))
  .add("Confirm", () => (
    <Confirm
      message="Delete the appointment?"
      onConfirm={action("onConfirm")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Status-Saving", () => <Status message="Saving" />)
  .add("Status-Deleteing", () => <Status message="Deleting" />)
  .add("Error-Saving", () => (
    <Error
      message="Could not save appointment"
      onClose={action("onClose")}
    />
  ))
  .add("Error-Deleting", () => (
    <Error
      message="Could not delete appointment"
      onClose={action("onClose")}
    />
  ))
  .add("Form-Edit", () => (
    <Form
      name="Frederick"
      interviewers={interviewers}
      interviewer={3}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Form-Create", () => (
    <Form
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="12pm" />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ))
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="12pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ))

