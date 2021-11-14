import { Film } from '../../types/film';

enum DataActionType {
  SetFilms = 'data/set-films',
  SetPromoFilm = 'data/set-promo-film',
  SetFilmsLoaded = 'data/set-films-loaded',
  SetIsPromoFilmLoading = 'data/set-promo-film-is-loading',
  AddFilm = 'data/add-film',
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

const setIsPromoFilmLoading = (isPromoFilmLoading: boolean) => ({
  type: DataActionType.SetIsPromoFilmLoading,
  payload: { isPromoFilmLoading },
} as const);

const addFilm = (newFilm: Film) => ({
  type: DataActionType.AddFilm,
  payload: { newFilm },
} as const);

const updateFilm = (film: Film) => ({
  type: DataActionType.UpdateFilm,
  payload: { film },
} as const);

export {
  setFilms,
  setFilmsLoaded,
  setPromoFilm,
  setIsPromoFilmLoading,
  updateFilm,
  addFilm,
  DataActionType
};

export type DataActions =
  | ReturnType<typeof setFilms>
  | ReturnType<typeof setPromoFilm>
  | ReturnType<typeof setFilmsLoaded>
  | ReturnType<typeof updateFilm>
  | ReturnType<typeof addFilm>
  | ReturnType<typeof setIsPromoFilmLoading>;
