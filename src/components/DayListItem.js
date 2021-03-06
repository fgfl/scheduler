import React from 'react';
import classNames from 'classnames';

import './DayListItem.scss';

const formatSpots = (spots) => {
  let spotsString = spots ? `${spots}` : 'no';
  spotsString += ` spot${spots !== 1 ? 's' : ''} remaining`;

  return spotsString;
};

/**
 *
 * @param {{
 *  name: String,
 *  spots: Number
 *  selected: Boolean
 *  setDay: ()}} props
 */
const DayListItem = (props) => {
  const dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};

export default DayListItem;
