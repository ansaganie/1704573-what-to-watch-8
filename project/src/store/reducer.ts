import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';
import { Genres } from '../types/genres';
import { AuthStatus } from '../constants';

const initialState: State = {
  genre: Genres.AllGenres,
  films: [],
  reviews: [],
  promoFilm: null,
  authStatus: AuthStatus.Unknown,
  isFilmsLoading: true,
  isPromoFilmLoading: true,
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
    default:
      return state;
  }
};
