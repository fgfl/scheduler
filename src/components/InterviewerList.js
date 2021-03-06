import React from 'react';
import PropTypes from 'prop-types';

import './InterviewerList.scss';

import InterviewerListItem from './InterviewerListItem';

/**
 * 
 * @param {{
 *  interviewers: [{id, name, avatar}]
 *  interviewer: Number
 *  setInterviewer: ()}} props 
 */
const InterviewList = (props) => {
  
  const interviewerItems =
    props.interviewers.map((interviewer) => (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={(event) => props.setInterviewer(interviewer.id)}
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

InterviewList.propTypes = {
  interviewer: PropTypes.number,
  setInterviewer: PropTypes.func.isRequired,
};

export default InterviewList;