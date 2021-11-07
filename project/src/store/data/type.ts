import { Film } from '../../types/film';

export type DataState = {
  films: Film[];
  promoFilm: Film | null;
  isFilmsLoading: boolean;
  isPromoFilmLoading: boolean;
};
