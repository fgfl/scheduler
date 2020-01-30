import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import Form from 'components/Appointment/Form';

afterEach(cleanup);

describe('Form', () => {
  const interviewers = [
    {
      id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png',
    },
  ];

  it('renders without student name if not provided', () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });

  it('renders with initial student name', () => {
    const { getByTestId } = render(
      <Form name="Lydia Miller-Jones" interviewers={interviewers} />
    );
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
  });

  it('validates that the student name is not blank', () => {
    const onSave = jest.fn(() => {});
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    fireEvent.click(getByText('Save'));

    // 1. validation is shown
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    // 2. onSave is not called
    expect(onSave).not.toHaveBeenCalled();
  });

  it('calls onSave function when the name is defined', () => {
    const onSave = jest.fn(() => {});
    const { queryByText } = render(
      <Form
        name="Lydia Miller-Jones"
        interviewers={interviewers}
        interviewer={interviewers[0].id}
        onSave={onSave}
      />
    );

    fireEvent.click(queryByText('Save'));

    // 3. validation is shown
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    // 4. onSave is called once
    expect(onSave).toHaveBeenCalledTimes(1);

    // 5. onSave is called with the correct arguments
    expect(onSave).toHaveBeenCalledWith(
      'Lydia Miller-Jones',
      interviewers[0].id
    );
  });

  it('submits the name entered by the user', () => {
    const onSave = jest.fn();
    const { getByText, getByAltText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    const input = getByPlaceholderText(/Enter Student Name/i);

    fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });
    fireEvent.click(getByAltText(interviewers[0].name));
    fireEvent.click(getByText('Save'));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith(
      'Lydia Miller-Jones',
      interviewers[0].id
    );
  });

  it('can successfully save after trying to submit an empty student name', () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        name="Lydia Mill-Jones"
        interviewers={interviewers}
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(getByText('Save'));

    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Lydia Mill-Jones' },
    });

    fireEvent.click(getByText('Cancel'));

    expect(queryByText(/Student name cannot by blank/i)).toBeNull();
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  // it('does not trigger the form submission if "enter" is press with the student input field selected', () => {
  //   // checking if preventDefault is called: https://gist.github.com/blairg/b6575a23ce96603a120d841f70463f76
  //   // doesn't work
  //   const event = { preventDefault: jest.fn() };

  //   const enterKeyPress = {
  //     preventDefault: jest.fn(),
  //     key: 'Enter',
  //     charCode: 13,
  //     code: 13,
  //   };
  //   jest.spyOn(enterKeyPress, 'preventDefault');

  //   const { getByPlaceholderText } = render(
  //     <Form interviewers={interviewers} />
  //   );

  //   getByPlaceholderText('Enter Student Name').focus();
  //   fireEvent.keyDown(
  //     getByPlaceholderText('Enter Student Name'),
  //     enterKeyPress
  //   );
  //   expect(enterKeyPress.preventDefault).toHaveBeenCalled();
  // });
});
