import { toast } from 'react-toastify';
import { BackendRoute } from '../../constants';
import { adaptFilmToClient, adaptReviewToClient } from '../../services/adapter';
import { ServerFilm } from '../../types/film';
import { Review } from '../../types/review';
import { addFilm } from '../data/data-actions';
import { AsyncAction } from '../store';
import {
  setFilmNotFound,
  setIsFilmLoading,
  setIsReviewsLoading,
  setReviews
} from './film-actions';

const FILM_NOT_FOUND = 'Could not find the film with id: /id/';
const FETCH_REVIEWS_ERROR = 'Could not load reviews for this film';

const fetchFilm = (filmId: string): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setIsFilmLoading(true));

    try {
      const response = await api.get<ServerFilm>(BackendRoute.getFilmsLink(filmId));

      dispatch(addFilm(adaptFilmToClient(response.data)));
    } catch (error) {
      toast.error(FILM_NOT_FOUND.replace('/id/', filmId));
      dispatch(setFilmNotFound(filmId));
    } finally {
      dispatch(setIsFilmLoading(false));
    }
  };

const fetchReviews = (filmId: string): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setIsReviewsLoading(true));

    try {
      const { data } = await api.get<Review[]>(BackendRoute.getReviewsLink(filmId));

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
