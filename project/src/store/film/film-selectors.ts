import { Film } from '../../types/film';
import { State } from '../store';

const getFilmInFocus = (state: State): Film | null => state.film.filmInFocus;
const getIsFilmLoading = (state: State): boolean => state.film.isFilmLoading;

export {
  getFilmInFocus,
  getIsFilmLoading
};
