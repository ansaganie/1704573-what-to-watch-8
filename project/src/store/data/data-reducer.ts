import { Film } from '../../types/film';
import { Actions } from '../store';
import { DataActionType } from './data-actions';

export type DataState = {
  films: Film[];
  promoFilm: Film | null;
  isFilmsLoading: boolean;
  isPromoFilmLoading: boolean;
};

const initialState: DataState = {
  films: [],
  promoFilm: null,
  isFilmsLoading: true,
  isPromoFilmLoading: true,
};

export const dataReducer = (state: DataState = initialState, action: Actions): DataState => {
  switch (action.type) {
    case DataActionType.SetFilms:
      return {
        ...state,
        films: action.payload.films,
      };
    case DataActionType.SetPromoFilm:
      return {
        ...state,
        promoFilm: action.payload.promoFilm,
      };
    case DataActionType.SetFilmsLoaded:
      return {
        ...state,
        isFilmsLoading: false,
      };
    case DataActionType.SetIsPromoFilmLoading:
      return {
        ...state,
        isPromoFilmLoading: action.payload.isPromoFilmLoading,
      };
    case DataActionType.UpdateFilm:
      // eslint-disable-next-line no-case-declarations
      const index = state.films.findIndex((film) => film.id === action.payload.film.id);

      return {
        ...state,
        films: [
          ...state.films.slice(0, index),
          action.payload.film,
          ...state.films.slice(index + 1),
        ],
      };
    case DataActionType.AddFilm:
      return {
        ...state,
        films: [
          ...state.films,
          action.payload.newFilm,
        ],
      };
    default:
      return state;
  }
};
