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
 *  time: 'time string',
 *  interview: {
 *    student: 'name',
 *    interviewer: {
 *      id: number,
 *      name: 'interviewer name',
 *      avatar: 'url'umber
 *    }
 *  }
 * }} props 
 */
const Appointment = (props) => {
  const {time, interview} = props;
  const {
    mode,
    transition,
    back,
  } = useVisualMode(interview ? SHOW : EMPTY);


  // useEffect(() => {
  //   if (interview) {
  //     transition(SHOW);
  //   } else {
  //     transition(EMPTY);
  //   }

  // }, []);


  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          interviewer={3}
          onSave={() => {}}
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