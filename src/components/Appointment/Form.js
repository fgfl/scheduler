import React, { useState } from 'react';

import InterviewerList from '../InterviewerList';
import Button from '../Button';

/**
 *
 * @param {{
 *  name: '',
 *  interviewers: [],
 *  interviewer: Number,
 *  onSave: (),
 *  onCancel: ()
 * }} props
 */
const Form = props => {
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  const reset = () => {
    setName('');
    setInterviewer(null);
  };

  const cancel = onCancel => {
    reset();
    onCancel();
  };

  const validate = () => {
    if (name === '') {
      setError('Student name cannot be blank');
      return;
    }
    if (!interviewer) {
      setError('Interviewer is not selected');
      return;
    }

    props.onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={event => cancel(props.onCancel)}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
