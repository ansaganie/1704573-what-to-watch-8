import { AsyncAction } from '../types/action';
import { ServerFilm } from '../types/film';
import { BackendRoute } from '../constants';
import { setFilms, setPromoFilm } from './action';
import { adaptFilmToClient } from '../services/adaptor';

const fetchFilms = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerFilm[]>(BackendRoute.Films);
    dispatch(setFilms(data.map(adaptFilmToClient)));
  };

const fetchPromoFilm = ():AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerFilm>(BackendRoute.PromoFilm);
    dispatch(setPromoFilm(adaptFilmToClient(data)));
  };

export {
  fetchFilms,
  fetchPromoFilm
};
