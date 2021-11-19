import { FilmId } from '../../types/film';
import { FilmReview } from '../../types/review';
import { Actions } from '../store';
import { FilmActionType } from './film-actions';

export type FilmState = {
  myListButtonDisabled: boolean,
  isFilmLoading: boolean,
  reviews: FilmReview,
  isReviewsLoading: boolean,
  notFoundFilmId: FilmId,
};

const initialState: FilmState = {
  myListButtonDisabled: false,
  isFilmLoading: false,
  reviews: {},
  isReviewsLoading: false,
  notFoundFilmId: '',
};

export const filmReducer = (state: FilmState = initialState, action: Actions): FilmState => {
  switch (action.type) {
    case FilmActionType.SetMyListButtonDisabled:
      return {
        ...state,
        myListButtonDisabled: action.payload.status,
      };
    case FilmActionType.SetIsFilmLoading:
      return {
        ...state,
        isFilmLoading: action.payload.isFilmLoading,
      };
    case FilmActionType.SetReviews:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.payload.filmId]: action.payload.reviews,
        },
      };
    case FilmActionType.SetIsReviewsLoading:
      return {
        ...state,
        isReviewsLoading: action.payload.isReviewsLoading,
      };
    case FilmActionType.AddReview:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.payload.filmId]: [
            ...state.reviews[action.payload.filmId],
            action.payload.review,
          ],
        },
      };
    case FilmActionType.SetFilmNotFound:
      return {
        ...state,
        notFoundFilmId: action.payload.filmId,
      };
    default:
      return state;
  }
};
