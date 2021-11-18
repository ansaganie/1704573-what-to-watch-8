import { Film, FilmId } from '../../types/film';

enum DataActionType {
  SetFilms = 'data/set-films',
  SetPromoFilmId = 'data/set-promo-film-id',
  SetFilmsLoaded = 'data/set-films-loaded',
  SetIsPromoFilmLoading = 'data/set-promo-film-is-loading',
  AddFilm = 'data/add-film',
  UpdateFilm = 'data/update-film',
}

const setFilms = (films: Film[]) => ({
  type: DataActionType.SetFilms,
  payload: { films },
} as const);

const setPromoFilmId = (promoFilmId: FilmId) => ({
  type: DataActionType.SetPromoFilmId,
  payload: { promoFilmId },
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
  setPromoFilmId,
  setIsPromoFilmLoading,
  updateFilm,
  addFilm,
  DataActionType
};

export type DataActions =
  | ReturnType<typeof setFilms>
  | ReturnType<typeof setPromoFilmId>
  | ReturnType<typeof setFilmsLoaded>
  | ReturnType<typeof updateFilm>
  | ReturnType<typeof addFilm>
  | ReturnType<typeof setIsPromoFilmLoading>;
