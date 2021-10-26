import { ActionType } from '../types/action';
import { Genres } from '../types/genres';
import { AuthStatus } from '../constants';
import { Film } from '../types/film';

const setGenre = (genre: Genres) => ({
  type: ActionType.SetGenre,
  payload: { genre },
} as const);

const setAuthStatus = (authStatus: AuthStatus) => ({
  type: ActionType.SetAuthStatus,
  payload: { authStatus },
} as const);

const setFilms = (films: Film[]) => ({
  type: ActionType.SetFilms,
  payload: { films },
} as const);

const setPromoFilm = (promoFilm: Film) => ({
  type: ActionType.SetPromoFilm,
  payload: { promoFilm },
} as const);

const setFilmsLoaded = () => ({
  type: ActionType.SetFilmsLoaded,
} as const);

const setPromoFilmLoaded = () => ({
  type: ActionType.SetPromoFilmLoaded,
} as const);

export {
  setGenre,
  setAuthStatus,
  setFilms,
  setPromoFilm,
  setFilmsLoaded,
  setPromoFilmLoaded
};
