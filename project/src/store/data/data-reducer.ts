import { Film, FilmId } from '../../types/film';
import { Actions } from '../store';
import { DataActionType } from './data-actions';

export type DataState = {
  films: Film[];
  promoFilmId: FilmId;
  isFilmsLoading: boolean;
};

const initialState: DataState = {
  films: [],
  promoFilmId: '',
  isFilmsLoading: true,
};

export const dataReducer = (state: DataState = initialState, action: Actions): DataState => {
  switch (action.type) {
    case DataActionType.SetFilms:
      return {
        ...state,
        films: action.payload.films,
      };
    case DataActionType.SetPromoFilmId:
      return {
        ...state,
        promoFilmId: action.payload.promoFilmId,
      };
    case DataActionType.SetFilmsLoaded:
      return {
        ...state,
        isFilmsLoading: false,
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
