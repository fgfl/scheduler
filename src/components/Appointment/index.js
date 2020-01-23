import React from 'react';

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
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

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
 *  cancelInterview: Function
 * }} props 
 */
const Appointment = (props) => {
  const {
    id,
    time,
    interview,
    interviewers,
    bookInterview,
    cancelInterview,
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
        transition(ERROR_SAVE, true);
      });
  };

  const cancel = (id) => {
    transition(DELETING, true);

    cancelInterview(id)
      .then((res) => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE, true);
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
          onCancel={(event) => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={(event) => back()}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={(event) => transition(EDIT)}
          onDelete={(event) => transition(CONFIRM)}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={(event) => cancel(id)}
          onCancel={(event) => back()}
        />
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment"
          onClose={() => back()}
        />
      )} 
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment"
          onClose={() => back()}
        />
      )} 
    </article>
  );
};

export default Appointment;