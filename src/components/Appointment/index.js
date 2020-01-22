import React from 'react';

import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm'
import Status from './Status'
import Error from './Error'
import Form from './Form'

import './styles.scss';

const Appointment = (props) => {
  const {time, interview} = props;

  return (
    <article className="appointment">
      <Header time={time} />
      {interview ?
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        /> :
        <Empty />}
    </article>
  );
};

export {
  Appointment,
  Header,
  Empty,
  Show,
  Confirm,
  Status,
  Error,
  Form,
};