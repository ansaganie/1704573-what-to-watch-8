import { Film } from '../../types/film';

enum DataActionType {
  SetFilms = 'data/set-films',
  SetPromoFilm = 'data/set-promo-film',
  SetFilmsLoaded = 'data/set-films-loaded',
  SetPromoFilmLoaded = 'data/set-promo-film-loaded',
  UpdateFilm = 'data/update-film',
}

const setFilms = (films: Film[]) => ({
  type: DataActionType.SetFilms,
  payload: { films },
} as const);

const setPromoFilm = (promoFilm: Film) => ({
  type: DataActionType.SetPromoFilm,
  payload: { promoFilm },
} as const);

const setFilmsLoaded = () => ({
  type: DataActionType.SetFilmsLoaded,
} as const);

const setPromoFilmLoaded = () => ({
  type: DataActionType.SetPromoFilmLoaded,
} as const);

const updateFilm = (film: Film) => ({
  type: DataActionType.UpdateFilm,
  payload: { film },
} as const);

export {
  setFilms,
  setFilmsLoaded,
  setPromoFilm,
  setPromoFilmLoaded,
  updateFilm,
  DataActionType
};

export type DataActions =
  | ReturnType<typeof setFilms>
  | ReturnType<typeof setPromoFilm>
  | ReturnType<typeof setFilmsLoaded>
  | ReturnType<typeof updateFilm>
  | ReturnType<typeof setPromoFilmLoaded>;
