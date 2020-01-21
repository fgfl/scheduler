import React from 'react';
import classNames from 'classnames';

import './InterviewerListItem.scss'

/**
 * 
 * @param {{
 *  name: String,
 *  avatar: URL,
 *  selected: Boolean,
 *  setInterviewer: Function}} props 
 */
const InterviewerListItem = (props) => {
  const {name, avatar, selected, setInterviewer} = props;

  const interviewerClass = classNames({
    'interviewers__item': true,
    'interviewers__item--selected': selected,
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;