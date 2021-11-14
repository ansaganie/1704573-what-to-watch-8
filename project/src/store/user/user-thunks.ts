import { dropToken, setToken } from '../../services/token';
import { AuthStatus, BackendRoute } from '../../constants';
import { SignInForm } from '../../types/sign-in-form';
import { ServerUser } from '../../types/user';
import { adaptFilmToClient, adaptUserToClient } from '../../services/adapter';
import { setAuthStatus, setIsMyListLoading, setMyList, setUserData } from './user-actions';
import { AsyncAction } from '../store';
import { ServerFilm } from '../../types/film';

const login = (signIn: SignInForm): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post<ServerUser>(BackendRoute.Login, signIn);

      if (data) {
        dispatch(setAuthStatus(AuthStatus.Auth));
        dispatch(setUserData(adaptUserToClient(data)));
        setToken(data.token);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

const logout = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.delete(BackendRoute.Logout);
      dispatch(setAuthStatus(AuthStatus.NoAuth));
      dispatch(setUserData(null));
      dropToken();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

const fetchMyList = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setIsMyListLoading(true));

    try {
      const { data } = await api.get<ServerFilm[]>(BackendRoute.Favorite);
      dispatch(setMyList(data.map(adaptFilmToClient)));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      dispatch(setIsMyListLoading(false));
    }
  };

export {
  fetchMyList,
  login,
  logout
};
