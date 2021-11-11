import { BackendRoute, Favorite } from '../../constants';
import { adaptFilmToClient } from '../../services/adapter';
import { AsyncAction } from '../../types/action';
import { ServerFilm } from '../../types/film';
import { setMyListButtonDisabled } from '../film/film-actions';
import { setFilms, setPromoFilm, setPromoFilmLoaded, updateFilm } from './data-actions';

const fetchFilms = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerFilm[]>(BackendRoute.Films);
    dispatch(setFilms(data.map(adaptFilmToClient)));
  };

const fetchPromoFilm = (): AsyncAction =>
  async (dispatch, getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ServerFilm>(BackendRoute.PromoFilm);
      const dataId = data.id.toString();
      if (getState().data.promoFilmId !== dataId) {
        dispatch(setPromoFilm(dataId));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      dispatch(setPromoFilmLoaded());
    }
  };

const postToggleFavorite = (filmId: string, status: Favorite): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setMyListButtonDisabled(true));
    const { data } = await api.post<ServerFilm>(BackendRoute.FavoritePost(filmId, status));
    dispatch(updateFilm(adaptFilmToClient(data)));
    dispatch(setMyListButtonDisabled(false));
  };

export {
  fetchFilms,
  fetchPromoFilm,
  postToggleFavorite
};
