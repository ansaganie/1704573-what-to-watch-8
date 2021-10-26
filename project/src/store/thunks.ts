import { AsyncAction } from '../types/action';
import { ServerFilm } from '../types/film';
import { AuthStatus, BackendRoute } from '../constants';
import { setAuthStatus, setFilms, setPromoFilm, setUserData } from './action';
import { adaptFilmToClient } from '../services/adaptor';
import { SignInForm } from '../types/sign-in-form';
import { setToken } from '../services/token';
import { User } from '../types/user';

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

const login = (signIn: SignInForm): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.post<User>(BackendRoute.Login, signIn);
    dispatch(setAuthStatus(AuthStatus.Auth));
    dispatch(setUserData(data));
    setToken(data.token);
  };

export {
  fetchFilms,
  fetchPromoFilm,
  login
};
