import { FilmId } from '../../types/film';
import { Review } from '../../types/review';

enum FilmActionType {
  SetMyListButtonDisabled = 'film/set-my-list-button-disabled',
  SetIsFilmLoading = 'film/set-is-film-loading',
  SetIsReviewsLoading = 'film/set-is-reviews-loading',
  SetReviews = 'film/set-reviews',
  AddReview = 'film/add-review',
  SetFilmNotFound = 'film/set-film-not-found'
}

const setMyListButtonDisabled = (status: boolean) => ({
  type: FilmActionType.SetMyListButtonDisabled,
  payload: { status },
} as const);

const setIsFilmLoading = (isFilmLoading: boolean) => ({
  type: FilmActionType.SetIsFilmLoading,
  payload: { isFilmLoading },
} as const);

const setReviews = (filmId: FilmId, reviews: Review[]) => ({
  type: FilmActionType.SetReviews,
  payload: { filmId, reviews },
} as const);

const addReview = (filmId: FilmId, review: Review) => ({
  type: FilmActionType.AddReview,
  payload: { filmId, review },
} as const);

const setIsReviewsLoading = (isReviewsLoading: boolean) => ({
  type: FilmActionType.SetIsReviewsLoading,
  payload: { isReviewsLoading },
} as const);

const setFilmNotFound = (filmId: FilmId) => ({
  type: FilmActionType.SetFilmNotFound,
  payload: { filmId },
} as const);

export {
  setMyListButtonDisabled,
  setIsFilmLoading,
  setReviews,
  addReview,
  setIsReviewsLoading,
  setFilmNotFound,
  FilmActionType
};

export type FilmActions =
  | ReturnType<typeof setReviews>
  | ReturnType<typeof setIsReviewsLoading>
  | ReturnType<typeof setMyListButtonDisabled>
  | ReturnType<typeof setIsFilmLoading>
  | ReturnType<typeof addReview>
  | ReturnType<typeof setFilmNotFound>;
