import { createSelector } from 'reselect';
import { FilmReview } from '../../types/review';
import { State } from '../store';

const getIsFilmLoading = (state: State): boolean => state.film.isFilmLoading;

const getReviews = (state: State): FilmReview  => state.film.reviews;

const getIsReviewsLoading = (state: State): boolean  => state.film.isReviewsLoading;

const getNotFoundFilmId = (state: State): string  => state.film.notFoundFilmId;

const getReviewsByFilmId = createSelector(
  [
    getReviews,
    (state: State, filmId: string) => filmId,
  ],
  (reviews, filmId) => reviews[filmId],
);

export {
  getIsFilmLoading,
  getIsReviewsLoading,
  getNotFoundFilmId,
  getReviewsByFilmId
};
