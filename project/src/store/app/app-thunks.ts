import { AuthStatus, BackendRoute } from '../../constants';
import { adaptUserToClient } from '../../services/adapter';
import { AsyncAction } from '../../types/action';
import { ServerUser } from '../../types/user';
import { setAuthStatus, setUserData } from '../user/user-actions';
import { setAppInitialized } from './app-actions';

const initializeApp = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ServerUser>(BackendRoute.Login);

      if (data) {
        dispatch(setAuthStatus(AuthStatus.Auth));
        dispatch(setUserData(adaptUserToClient(data)));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      dispatch(setAppInitialized());
    }
  };

export { initializeApp };
