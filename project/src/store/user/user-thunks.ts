import { dropToken, setToken } from '../../services/token';
import { AuthStatus, BackendRoute } from '../../constants';
import { SignInForm } from '../../types/sign-in-form';
import { ServerUser } from '../../types/user';
import { AsyncAction } from '../../types/action';
import { adaptUserToClient } from '../../services/adapter';
import { setAuthStatus, setUserData } from './user-actions';

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

export {
  login,
  logout
};
