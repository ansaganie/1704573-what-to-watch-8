import { AsyncAction } from '../types/action';
import { ServerFilm, Film } from '../types/film';
import { AuthStatus, BackendRoute } from '../constants';
import { setAuthStatus, setFilms, setPromoFilm, setUserData } from './action';
import { adaptFilmToClient, adaptUserToClient } from '../services/adaptor';
import { dropToken, setToken } from '../services/token';
import { SignInForm } from '../types/sign-in-form';
import { ServerUser } from '../types/user';

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

const login = (signIn: SignInForm): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.post<ServerUser>(BackendRoute.Login, signIn);
    if (data) {
      dispatch(setAuthStatus(AuthStatus.Auth));
      dispatch(setUserData(adaptUserToClient(data)));
      setToken(data.token);
    }
  };

const logout = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.delete(BackendRoute.Logout);
    dispatch(setAuthStatus(AuthStatus.NoAuth));
    dispatch(setUserData(null));
    dropToken();
  };

const checkAuthStatus = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<ServerUser>(BackendRoute.Login);

    if (data) {
      dispatch(setAuthStatus(AuthStatus.Auth));
      dispatch(setUserData(adaptUserToClient(data)));
    }
  };

export {
  fetchFilms,
  fetchPromoFilm,
  fetchFavorites,
  login,
  logout,
  checkAuthStatus
};
