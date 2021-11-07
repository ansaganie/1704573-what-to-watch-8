import { Actions, ActionType } from '../../types/action';
import { DataState } from './type';

const initialState: DataState = {
  films: [],
  promoFilm: null,
  isFilmsLoading: true,
  isPromoFilmLoading: true,
};

export const dataReducer = (state: DataState = initialState, action: Actions): DataState => {
  switch (action.type) {
    case ActionType.SetFilms:
      return {
        ...state,
        films: action.payload.films,
      };
    case ActionType.SetPromoFilm:
      return {
        ...state,
        promoFilm: action.payload.promoFilm,
      };
    case ActionType.SetFilmsLoaded:
      return {
        ...state,
        isFilmsLoading: false,
      };
    case ActionType.SetPromoFilmLoaded:
      return {
        ...state,
        isPromoFilmLoading: false,
      };
    default:
      return state;
  }
};
