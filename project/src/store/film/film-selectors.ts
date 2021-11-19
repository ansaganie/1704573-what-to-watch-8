import { createSelector } from 'reselect';
import { FilmId } from '../../types/film';
import { FilmReview } from '../../types/review';
import { State } from '../store';

const getMyListButtonDisabled = (state: State): boolean => state.film.myListButtonDisabled;
const getIsFilmLoading = (state: State): boolean => state.film.isFilmLoading;
const getReviews = (state: State): FilmReview  => state.film.reviews;
const getIsReviewsLoading = (state: State): boolean  => state.film.isReviewsLoading;
const getNotFoundFilmId = (state: State): string  => state.film.notFoundFilmId;

const getReviewsByFilmId = createSelector(
  [
    getReviews,
    (state: State, filmId: FilmId) => filmId,
  ],
  (reviews, filmId) => reviews[filmId],
);

export {
  getMyListButtonDisabled,
  getIsFilmLoading,
  getIsReviewsLoading,
  getNotFoundFilmId,
  getReviewsByFilmId
};

