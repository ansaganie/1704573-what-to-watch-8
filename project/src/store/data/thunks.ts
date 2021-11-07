import { BackendRoute } from '../../constants';
import { adaptFilmToClient } from '../../services/adaptor';
import { AsyncAction } from '../../types/action';
import { Film, ServerFilm } from '../../types/film';
import { setFilms, setPromoFilm } from '../action';

const fetchFilms = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerFilm[]>(BackendRoute.Films);
    dispatch(setFilms(data.map(adaptFilmToClient)));
  };

const fetchPromoFilm = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerFilm>(BackendRoute.PromoFilm);
    dispatch(setPromoFilm(adaptFilmToClient(data)));
  };

const fetchFavorites = (): AsyncAction<Promise<Film[]>> =>
  async (dispatch, _getState, api): Promise<Film[]> => {
    const { data } = await api.get<ServerFilm[]>(BackendRoute.Favorite);

    return data.map(adaptFilmToClient);
  };

export {
  fetchFilms,
  fetchPromoFilm,
  fetchFavorites
};
