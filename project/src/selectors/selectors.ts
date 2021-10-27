import { State } from '../types/state';
import { createSelector } from 'reselect';

const filterUnique = <T>(value: T, index: number, array: T[]) =>
  array.findIndex((genre) => genre === value) === index;

const getFilms = (state: State) => state.films;
const getGenre = (state: State) => state.genre;

const getFavoriteFilms = createSelector(
  [ getFilms ],
  (films) => films.filter((film) => film.isFavorite),
);

const getFilteredFilms = createSelector(
  [ getFilms, getGenre ],
  (films, genre) => {
    if (genre === 'All genres') {
      return films;
    }

    return films.filter((film) => film.genre === genre);
  },
);

const getGenres = createSelector(
  [ getFilms ],
  (films) => {
    const genres: string[] = [
      'All genres',
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
  getFavoriteFilms,
  getGenres
};
