import { setAuthStatus, setUserData } from '../action';
import { dropToken, setToken } from '../../services/token';
import { AuthStatus, BackendRoute } from '../../constants';
import { SignInForm } from '../../types/sign-in-form';
import { ServerUser } from '../../types/user';
import { AsyncAction } from '../../types/action';
import { adaptUserToClient } from '../../services/adaptor';

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
  login,
  logout,
  checkAuthStatus
};
