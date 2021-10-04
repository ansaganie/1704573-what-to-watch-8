import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { smallFilmCards } from "./mock/small-film-cards";

ReactDOM.render(
  <React.StrictMode>
    <App smallFilmCards={smallFilmCards} />
  </React.StrictMode>,
  document.getElementById('root'));
