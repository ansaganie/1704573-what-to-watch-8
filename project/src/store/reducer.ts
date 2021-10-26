import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';
import { AuthStatus } from '../constants';

const initialState: State = {
  genre: 'All genres',
  films: [],
  reviews: [],
  promoFilm: null,
  authStatus: AuthStatus.Unknown,
  isFilmsLoading: true,
  isPromoFilmLoading: true,
  user: null,
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SetGenre:
      return {
        ...state,
        genre: action.payload.genre,
      };
    case ActionType.SetAuthStatus:
      return {
        ...state,
        authStatus: action.payload.authStatus,
      };
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
    case ActionType.SetUserData:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
