import { State } from '../types/state';
import { createSelector } from 'reselect';
import { ALL_GENRE } from '../constants';

const filterUnique = <T>(value: T, index: number, array: T[]) =>
  array.findIndex((genre) => genre === value) === index;

const getFilms = (state: State) => state.films;
const getGenre = (state: State) => state.genre;

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
      .filter(filterUnique)
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
