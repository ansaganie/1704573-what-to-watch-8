import { dropToken, setToken } from '../../services/token';
import { AuthStatus, BackendRoute } from '../../constants';
import { SignInForm } from '../../types/sign-in-form';
import { ServerUser } from '../../types/user';
import { adaptFilmToClient, adaptUserToClient } from '../../services/adapter';
import { setAuthStatus, setIsMyListLoading, setMyList, setUserData } from './user-actions';
import { AsyncAction } from '../store';
import { ServerFilm } from '../../types/film';
import { toast } from 'react-toastify';

const LOGIN_ERROR = 'Could not sign you in, please try again';
const LOGOUT_ERROR = 'Could not log you out, please try again';
const LOGOUT_SUCCESS = 'You successfully logged out';
const FETCH_MY_LIST_ERROR = 'Could not load you favorite films. Please try again';

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
      toast.info(LOGIN_ERROR);
    }
  };

const logout = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.delete(BackendRoute.Logout);

      dispatch(setAuthStatus(AuthStatus.NoAuth));
      dispatch(setUserData(null));

      dropToken();

      toast.success(LOGOUT_SUCCESS);
    } catch (error) {
      toast.info(LOGOUT_ERROR);
    }
  };

const fetchMyList = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setIsMyListLoading(true));

    try {
      const { data } = await api.get<ServerFilm[]>(BackendRoute.Favorite);
      dispatch(setMyList(data.map(adaptFilmToClient)));
    } catch (error) {
      toast.info(FETCH_MY_LIST_ERROR);
    } finally {
      dispatch(setIsMyListLoading(false));
    }
  };

export {
  fetchMyList,
  login,
  logout
};
