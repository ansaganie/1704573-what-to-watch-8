import './css/main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { films } from './mock/films';

ReactDOM.render(
  <React.StrictMode>
    <App films={films}/>
  </React.StrictMode>,
  document.getElementById('root'));
