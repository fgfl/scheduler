import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  getByTestId,
} from '@testing-library/react';

import axios from 'axios';

import Application from 'components/Application';

describe('Appliction', () => {
  afterEach(cleanup);

  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText('Monday'));

    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointments = getAllByTestId(container, 'appointment');
    const firstAppointment = appointments[0];

    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );

    fireEvent.click(getByAltText(firstAppointment, 'Add'));

    await waitForElement(() =>
      getByPlaceholderText(firstAppointment, 'Enter Student Name')
    );

    fireEvent.change(
      getByPlaceholderText(firstAppointment, 'Enter Student Name'),
      {
        target: {
          value: 'Lydia Mill-Jones',
        },
      }
    );
    fireEvent.click(getByAltText(firstAppointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(firstAppointment, 'Save'));
    expect(getByText(firstAppointment, 'Saving')).toBeInTheDocument();

    await waitForElement(() => getByText(firstAppointment, 'Lydia Mill-Jones'));
    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointments = getAllByTestId(container, 'appointment');
    const [bookedAppt] = appointments.filter(appt =>
      queryByText(appt, 'Archie Cohen')
    );

    fireEvent.click(getByAltText(bookedAppt, 'Delete'));

    const deletePrompt = await waitForElement(
      () => getByText(bookedAppt, 'Delete the appointment?'),
      { container: bookedAppt }
    );

    expect(deletePrompt).toBeInTheDocument();

    fireEvent.click(getByText(bookedAppt, 'Confirm'));

    expect(getByText(bookedAppt, 'Deleting')).toBeInTheDocument();

    const emptyView = await waitForElement(
      () => getByAltText(bookedAppt, 'Add'),
      { container: bookedAppt }
    );
    expect(emptyView).toBeInTheDocument();

    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const newName = 'Test Chicken';
    const oldName = 'Archie Cohen';

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, oldName));
    const [bookedAppt] = getAllByTestId(container, 'appointment').filter(appt =>
      queryByText(appt, oldName)
    );

    fireEvent.click(getByAltText(bookedAppt, 'Edit'));

    const saveButton = getByText(bookedAppt, 'Save');
    expect(saveButton).toBeInTheDocument();

    const inputField = getByTestId(bookedAppt, 'student-name-input');

    fireEvent.change(inputField, { target: { value: newName } });

    fireEvent.click(saveButton);

    expect(getByText(bookedAppt, 'Saving'));

    expect(
      await waitForElement(() => getByText(bookedAppt, newName))
    ).toBeInTheDocument();

    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });

  it('shows the save error when failing to save an appointment', async () => {
    const saveErrorText = /Could not save appointment/i;

    axios.put.mockRejectedValueOnce({
      status: 500,
      statusText: 'Internal Server Error',
    });

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointments = getAllByTestId(container, 'appointment');
    const firstAppointment = appointments[0];

    fireEvent.click(getByAltText(firstAppointment, 'Add'));

    await waitForElement(() =>
      getByPlaceholderText(firstAppointment, 'Enter Student Name')
    );

    fireEvent.change(
      getByPlaceholderText(firstAppointment, 'Enter Student Name'),
      { target: { value: 'Lydia Mill-Jones' } }
    );
    fireEvent.click(getByAltText(firstAppointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(firstAppointment, 'Save'));
    expect(getByText(firstAppointment, 'Saving')).toBeInTheDocument();

    expect(
      await waitForElement(() => getByText(firstAppointment, saveErrorText))
    ).toBeInTheDocument();

    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();

    fireEvent.click(getByAltText(firstAppointment, 'Close'));
    expect(getByPlaceholderText(firstAppointment, 'Enter Student Name'));
  });

  it('shows the delete error when failing to delete an existing appointment', async () => {
    const oldName = 'Archie Cohen';
    const deleteErrorText = /Could not delete appointment/i;

    axios.delete.mockRejectedValueOnce({
      status: 500,
      statusText: 'Internal Server Error',
    });
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, oldName));
    const [bookedAppt] = getAllByTestId(container, 'appointment').filter(appt =>
      queryByText(appt, oldName)
    );

    fireEvent.click(getByAltText(bookedAppt, 'Delete'));

    expect(
      await waitForElement(
        () => getByText(bookedAppt, 'Delete the appointment?'),
        { container: bookedAppt }
      )
    ).toBeInTheDocument();

    fireEvent.click(getByText(bookedAppt, 'Confirm'));

    expect(getByText(bookedAppt, 'Deleting')).toBeInTheDocument();

    expect(
      await waitForElement(() => getByText(bookedAppt, deleteErrorText), {
        container: bookedAppt,
      })
    ).toBeInTheDocument();

    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();

    fireEvent.click(getByAltText(bookedAppt, 'Close'));
    expect(getByText(bookedAppt, oldName));
  });
});
