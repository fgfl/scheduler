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
  waitForDomChange,
  getByTestId,
} from '@testing-library/react';

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
    // render app
    const { container } = render(<Application />);
    // wait for data to populate
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointments = getAllByTestId(container, 'appointment');
    const [bookedAppt] = appointments.filter(appt =>
      queryByText(appt, 'Archie Cohen')
    );
    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(bookedAppt, 'Delete'));

    const deletePrompt = await waitForElement(
      () => getByText(bookedAppt, 'Delete the appointment?'),
      { container: bookedAppt }
    );

    // 4. Check that the confirmation message is shown.
    expect(deletePrompt).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(bookedAppt, 'Confirm'));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(bookedAppt, 'Deleting')).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    const emptyView = await waitForElement(
      () => getByAltText(bookedAppt, 'Add'),
      { container: bookedAppt }
    );
    expect(emptyView).toBeInTheDocument();

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const newName = 'Test Chicken';
    const oldName = 'Archie Cohen';

    const { container, debug } = render(<Application />);
    // 2. find booked appointment
    await waitForElement(() => getByText(container, oldName));
    const [bookedAppt] = getAllByTestId(container, 'appointment').filter(appt =>
      queryByText(appt, oldName)
    );
    // 3. click edit
    fireEvent.click(getByAltText(bookedAppt, 'Edit'));
    // 4. confirm edit screen is showing
    const saveButton = getByText(bookedAppt, 'Save');
    expect(saveButton).toBeInTheDocument();
    // 5. edit name
    const inputField = getByTestId(bookedAppt, 'student-name-input');

    fireEvent.change(inputField, { target: { value: newName } });
    // 6. click save
    fireEvent.click(saveButton);
    // confirm saving view is showing
    expect(getByText(bookedAppt, 'Saving'));
    // 7. confirm name was edited
    expect(
      await waitForElement(() => getByText(bookedAppt, newName))
    ).toBeInTheDocument();
    // 8. confirm spots is '1 spot remaining' in the dayListItem
    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });
});
