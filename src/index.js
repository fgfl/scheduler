import React from 'react';
import ReactDOM from 'react-dom';

import 'index.scss';

import Application from 'components/Application';

import axios from 'axios';

console.log('base url:', process.env);
if (process.env.REACT_APP_API_BASE_URL) {
  console.log(process.env.REACT_APP_API_BASE_URL);
  axios.defaults.baseURL = process.REACT_APP_API_BASE_URL;
}

ReactDOM.render(<Application />, document.getElementById('root'));
