import { State } from '../root-reducer';
import { createSelector } from 'reselect';
import { ALL_GENRE } from '../../constants';
import { distinctFilter } from '../../utils/film';

const getFilms = (state: State) => state.data.films;
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

    return genres;
  },
);

export {
  getFilteredFilms,
  getGenres
};
