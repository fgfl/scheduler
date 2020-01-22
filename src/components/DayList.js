import React from 'react';

import DayListItem from './DayListItem';

/**
 * 
 * @param {{
 *  days: [{id: number, name: '', spots: number}],
 *  day: '',
 *  setDay: {}
 * }} props 
*/
const DayList = (props) => {
  return (
    <ul>
      {props.days.map((day) => {
        return (
          <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            selected={day.name === props.day}
            setDay={props.setDay}
          />
      )})}
    </ul>
  );
};

export default DayList;