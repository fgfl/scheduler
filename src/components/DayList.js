import React from 'react';

import DayListItem from './DayListItem';

/**
 * 
 * @param {{
 *  days: [{id, name, spots}],
 *  day: string,
 *  setDay: function
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