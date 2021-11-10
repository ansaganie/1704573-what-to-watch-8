import { BackendRoute, Favorite } from '../../constants';
import { adaptFilmToClient } from '../../services/adaptor';
import { AsyncAction } from '../../types/action';
import { ServerFilm } from '../../types/film';
import { setFilms, setMyListButtonDisabled, setPromoFilm, setPromoFilmLoaded, updateFilm } from './data-actions';

const fetchFilms = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerFilm[]>(BackendRoute.Films);
    dispatch(setFilms(data.map(adaptFilmToClient)));
  };

const fetchPromoFilm = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerFilm>(BackendRoute.PromoFilm);
    dispatch(setPromoFilm(data.id));
    dispatch(setPromoFilmLoaded());
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
