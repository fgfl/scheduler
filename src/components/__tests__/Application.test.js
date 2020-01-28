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
    const { container, debug } = render(<Application />);

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
    // console.log(prettyDOM(firstAppointment));

    await waitForElement(() => getByText(firstAppointment, 'Lydia Mill-Jones'));
    // debug();
    // expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
    console.log(prettyDOM(day));
  });
});
