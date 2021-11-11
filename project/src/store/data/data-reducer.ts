import { Actions } from '../../types/action';
import { Film } from '../../types/film';
import { DataActionType } from './data-actions';

export type DataState = {
  films: Film[];
  promoFilmId: string;
  isFilmsLoading: boolean;
  isPromoFilmLoading: boolean;
  myListButtonDisabled: boolean,
};

const initialState: DataState = {
  films: [],
  promoFilmId: '',
  isFilmsLoading: true,
  isPromoFilmLoading: true,
  myListButtonDisabled: false,
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
        promoFilmId: action.payload.promoFilmId,
      };
    case DataActionType.SetFilmsLoaded:
      return {
        ...state,
        isFilmsLoading: false,
      };
    case DataActionType.SetPromoFilmLoaded:
      return {
        ...state,
        isPromoFilmLoading: false,
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
    case DataActionType.SetMyListButtonDisabled:
      return {
        ...state,
        myListButtonDisabled: action.payload.status,
      };
    default:
      return state;
  }
};
