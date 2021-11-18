import { createSelector } from 'reselect';
import { ALL_GENRE } from '../../constants';
import { Film, FilmId } from '../../types/film';
import { distinctFilter } from '../../utils/film';
import { getGenre } from '../app/app-selector';
import { State } from '../store';

const MAX_GENRES_COUNT = 9;

const getFilms = (state: State): Film[] => state.data.films;
const getPromoFilmId = (state: State): FilmId => state.data.promoFilmId;
const getIsFilmsLoading = (state: State): boolean => state.data.isFilmsLoading;

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

    return genres.slice(0, MAX_GENRES_COUNT + 1);
  },
);

export {
  getFilms,
  getPromoFilmId,
  getIsFilmsLoading,
  getFilteredFilms,
  getGenres
};
