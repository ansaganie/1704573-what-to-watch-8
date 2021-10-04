import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { films, promoFilm } from './mock/films';

ReactDOM.render(
  <React.StrictMode>
    <App smallFilmCards={films} promoFilm={promoFilm}/>
  </React.StrictMode>,
  document.getElementById('root'));
