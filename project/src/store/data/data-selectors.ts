import { createSelector } from 'reselect';
import { ALL_GENRE } from '../../constants';
import { Film } from '../../types/film';
import { distinctFilter } from '../../utils/film';
import { State } from '../store';

const getFilms = (state: State): Film[] => state.data.films;
const getGenre = (state: State) => state.app.genre;

const getFilteredFilms = createSelector(
  [ getFilms, getGenre ],
  (films, genre) => {
    if (genre === ALL_GENRE) {
      return films;
    }

    return films.filter((film) => film.genre === genre);
  },
);

const getGenres = createSelector(
  [ getFilms ],
  (films) => {
    const genres: string[] = [
      ALL_GENRE,
    ];

    films
      .map(({ genre }) => genre)
      .filter(distinctFilter)
      .forEach((value) => {
        genres.push(value);
      });

    return genres.slice(0, 10);
  },
);

export {
  getFilms,
  getFilteredFilms,
  getGenres
};
