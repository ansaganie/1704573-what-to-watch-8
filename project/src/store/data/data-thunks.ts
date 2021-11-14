import { BackendRoute, Favorite } from '../../constants';
import { adaptFilmToClient } from '../../services/adapter';
import { ServerFilm } from '../../types/film';
import { setIsFilmLoading, setMyListButtonDisabled } from '../film/film-actions';
import { AsyncAction } from '../store';
import {
  setFilms,
  setFilmsLoaded,
  setPromoFilmId,
  updateFilm
} from './data-actions';

const fetchFilms = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ServerFilm[]>(BackendRoute.Films);
      dispatch(setFilms(data.map(adaptFilmToClient)));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      dispatch(setFilmsLoaded());
    }
  };

const fetchPromoFilm = (): AsyncAction =>
  async (dispatch, getState, api): Promise<void> => {
    const previousId = getState().data.promoFilmId;

    if (!previousId) {
      dispatch(setIsFilmLoading(true));
    }

    try {
      const { data } = await api.get<ServerFilm>(BackendRoute.PromoFilm);
      const currentId = data.id.toString();
      if (previousId !== currentId) {
        dispatch(setPromoFilmId(currentId));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      dispatch(setIsFilmLoading(false));
    }
  };

const postToggleFavorite = (filmId: string, status: Favorite): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(setMyListButtonDisabled(true));
      const { data } = await api.post<ServerFilm>(BackendRoute.FavoritePost(filmId, status));
      dispatch(updateFilm(adaptFilmToClient(data)));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      dispatch(setMyListButtonDisabled(false));
    }
  };

export {
  fetchFilms,
  fetchPromoFilm,
  postToggleFavorite
};
