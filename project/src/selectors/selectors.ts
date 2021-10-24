import { State } from '../types/state';
import { createSelector } from 'reselect';
import { Genres as GenreTypes } from '../types/genres';

const getFilms = (state: State) => state.films;
const getGenre = (state: State) => state.genre;

const getFavoriteFilms = createSelector(
  [ getFilms ],
  (films) => films.filter((film) => film.isFavorite),
);

const getFilteredFilms = createSelector(
  [ getFilms, getGenre ],
  (films, genre) => {
    if (genre === GenreTypes.AllGenres) {
      return films;
    }

    return films.filter((film) => film.genre === genre);
  },
);

export { getFilteredFilms, getFavoriteFilms };
