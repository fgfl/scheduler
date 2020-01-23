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
const CREATE = 'CREATE';
const SHOW = 'SHOW';
const SAVING = 'SAVING';

const CONFIRM = 'CONFIRM';
const ERROR = 'ERROR';

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

    transition(SAVING);

    bookInterview(id, interview)
      .then((res) => {
        transition(SHOW);
      })
      .catch((err) => {
        console.error('Failed to book interview', err.message);
      });
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
      {mode === SAVING && (
        <Status message="Saving" />
      )}

      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={() => {}}
          onCancel={() => {}}
        />
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