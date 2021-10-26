import { ActionType } from '../types/action';
import { AuthStatus } from '../constants';
import { Film } from '../types/film';
import { User } from '../types/user';

const setGenre = (genre: string) => ({
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

const setUserData = (data: User | null) => ({
  type: ActionType.SetUserData,
  payload: { user: data},
} as const);

export {
  setGenre,
  setAuthStatus,
  setFilms,
  setPromoFilm,
  setFilmsLoaded,
  setPromoFilmLoaded,
  setUserData
};
