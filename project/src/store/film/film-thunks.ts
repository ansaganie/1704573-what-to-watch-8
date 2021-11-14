import { BackendRoute } from '../../constants';
import { adaptFilmToClient } from '../../services/adapter';
import { ServerFilm } from '../../types/film';
import { Review } from '../../types/review';
import { addFilm } from '../data/data-actions';
import { AsyncAction } from '../store';
import { setFilmInFocus, setIsFilmLoading, setIsReviewsLoading, setReviews } from './film-actions';

const fetchFilm = (filmId: string): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setIsFilmLoading(true));

    try {
      const { data } = await api.get<ServerFilm>(BackendRoute.Film(filmId));

      const film = adaptFilmToClient(data);

      dispatch(setFilmInFocus(film));
      dispatch(addFilm(film));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      dispatch(setIsFilmLoading(false));
    }
  };

const fetchReviews = (filmId: string): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setIsReviewsLoading(true));

    try {
      const { data } = await api.get<Review[]>(BackendRoute.Reviews(filmId));

      dispatch(setReviews(filmId, data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      dispatch(setIsReviewsLoading(false));
    }
  };

export {
  fetchFilm,
  fetchReviews
};
