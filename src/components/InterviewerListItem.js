import React from 'react';
import classNames from 'classnames';

import './InterviewerListItem.scss'

/**
 * 
 * @param {{
 *  id: Number,
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
    <li className={interviewerClass} onClick={() => setInterviewer(name)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {name}
    </li>
  );
};

export default InterviewerListItem;