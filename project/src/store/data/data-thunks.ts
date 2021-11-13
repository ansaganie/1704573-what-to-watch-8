import { BackendRoute, Favorite } from '../../constants';
import { adaptFilmToClient } from '../../services/adapter';
import { ServerFilm } from '../../types/film';
import { setMyListButtonDisabled } from '../film/film-actions';
import { AsyncAction } from '../store';
import { setFilms, setFilmsLoaded, setPromoFilm, setPromoFilmLoaded, updateFilm } from './data-actions';

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
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ServerFilm>(BackendRoute.PromoFilm);

      dispatch(setPromoFilm(adaptFilmToClient(data)));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      dispatch(setPromoFilmLoaded());
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
