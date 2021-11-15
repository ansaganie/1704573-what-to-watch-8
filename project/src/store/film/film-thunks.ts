import { toast } from 'react-toastify';
import { BackendRoute } from '../../constants';
import { adaptFilmToClient, adaptReviewToClient } from '../../services/adapter';
import { ServerFilm } from '../../types/film';
import { Review } from '../../types/review';
import { addFilm } from '../data/data-actions';
import { AsyncAction } from '../store';
import {
  setIsFilmLoading,
  setIsReviewsLoading,
  setReviews
} from './film-actions';

const FETCH_FILM_ERROR = 'Could not load the film';
const FETCH_REVIEWS_ERROR = 'Could not load reviews for this film';

const fetchFilm = (filmId: string): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setIsFilmLoading(true));

    try {
      const { data } = await api.get<ServerFilm>(BackendRoute.Film(filmId));

      dispatch(addFilm(adaptFilmToClient(data)));
    } catch (error) {
      toast.info(FETCH_FILM_ERROR);
    } finally {
      dispatch(setIsFilmLoading(false));
    }
  };

const fetchReviews = (filmId: string): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setIsReviewsLoading(true));

    try {
      const { data } = await api.get<Review[]>(BackendRoute.Reviews(filmId));

      dispatch(setReviews(filmId, data.map(adaptReviewToClient)));
    } catch (error) {
      toast.info(FETCH_REVIEWS_ERROR);
    } finally {
      dispatch(setIsReviewsLoading(false));
    }
  };

export {
  fetchFilm,
  fetchReviews
};
