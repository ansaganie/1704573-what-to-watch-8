import { Film } from '../../types/film';
import { Review } from '../../types/review';

enum FilmActionType {
  SetMyListButtonDisabled = 'film/set-my-list-button-disabled',
  SetFilmInFocus = 'film/set-film-in-focus',
  SetIsFilmLoading = 'film/set-is-film-loading',
  SetIsReviewsLoading = 'film/set-is-reviews-loading',
  SetReviews = 'film/set-reviews',
  AddReview = 'film/add-review',
}

const setMyListButtonDisabled = (status: boolean) => ({
  type: FilmActionType.SetMyListButtonDisabled,
  payload: { status },
} as const);

const setFilmInFocus = (filmInFocus: Film) => ({
  type: FilmActionType.SetFilmInFocus,
  payload: { filmInFocus },
} as const);

const setIsFilmLoading = (isFilmLoading: boolean) => ({
  type: FilmActionType.SetIsFilmLoading,
  payload: { isFilmLoading },
} as const);

const setReviews = (filmId: string, reviews: Review[]) => ({
  type: FilmActionType.SetReviews,
  payload: { filmId, reviews },
} as const);

const addReview = (filmId: string, review: Review) => ({
  type: FilmActionType.AddReview,
  payload: { filmId, review },
} as const);

const setIsReviewsLoading = (isReviewsLoading: boolean) => ({
  type: FilmActionType.SetIsReviewsLoading,
  payload: { isReviewsLoading },
} as const);

export {
  setMyListButtonDisabled,
  setFilmInFocus,
  setIsFilmLoading,
  setReviews,
  addReview,
  setIsReviewsLoading,
  FilmActionType
};

export type FilmActions =
  | ReturnType<typeof setReviews>
  | ReturnType<typeof setIsReviewsLoading>
  | ReturnType<typeof setMyListButtonDisabled>
  | ReturnType<typeof setIsFilmLoading>
  | ReturnType<typeof addReview>
  | ReturnType<typeof setFilmInFocus>;
