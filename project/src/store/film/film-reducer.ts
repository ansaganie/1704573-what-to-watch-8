import { Film } from '../../types/film';
import { Actions } from '../store';
import { FilmActionType } from './film-actions';

export type FilmState = {
  myListButtonDisabled: boolean,
  isFilmLoading: boolean,
  filmInFocus: Film | null,
};

const initialState: FilmState = {
  myListButtonDisabled: false,
  filmInFocus: null,
  isFilmLoading: false,
};

export const filmReducer = (state: FilmState = initialState, action: Actions): FilmState => {
  switch (action.type) {
    case FilmActionType.SetMyListButtonDisabled:
      return {
        ...state,
        myListButtonDisabled: action.payload.status,
      };
    case FilmActionType.SetFilmInFocus:
      return {
        ...state,
        filmInFocus: action.payload.filmInFocus,
      };
    case FilmActionType.SetIsFilmLoading:
      return {
        ...state,
        isFilmLoading: action.payload.value,
      };
    default:
      return state;
  }
};
