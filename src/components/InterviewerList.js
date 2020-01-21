import React, {useState} from 'react';

import './InterviewerList.scss';

import InterviewerListItem from './InterviewerListItem';

/**
 * 
 * @param {{
 *  interviewers: [{id, name, avatar}]
 *  interviewer: Number
 *  setInterviewer: Function}} props 
 */
const InterviewList = (props) => {
  const [values, onChange] = useState(props.interviewer);
  
  const interviewerItems =
    props.interviewers.map((interviewer) => (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === values}
        setInterviewer={(event) => onChange(interviewer.id)}
      />
    ));


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerItems}
      </ul>
    </section>
  );
};

export default InterviewList;