import React, {useEffect} from 'react';

import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm'
import Status from './Status'
import Error from './Error'
import Form from './Form'

import useVisualMode from 'hooks/useVisualMode';


import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CONFIRM = 'CONFIRM';
const STATUS = 'STATUS';
const ERROR = 'ERROR';
const CREATE = 'CREATE';

/**
 * 
 * @param {{
 *  id: number,
 *  time: 'time string',
 *  interview: {
 *    student: 'name',
 *    interviewer: {
 *      id: number,
 *      name: 'interviewer name',
 *      avatar: 'url'umber
 *    }
 *  },
 *  interviewers: [{}],
 *  bookInterview: Function
 * }} props 
 */
const Appointment = (props) => {
  const {
    id,
    time,
    interview,
    interviewers,
    bookInterview,
  } = props;

  const {
    mode,
    transition,
    back,
  } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview);
    transition(SHOW);
  };


  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={() => {}}
          onCancel={() => {}}
        />
      )}
      {mode === STATUS && (
        <Status message="Saving" />
      )}
      {mode === ERROR && (
        <Error
          message="Could not save appointment"
          onClose={() => {}}
        />
      )}
    </article>
  );
};

export default Appointment;