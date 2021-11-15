import { toast } from 'react-toastify';
import { AuthStatus, BackendRoute } from '../../constants';
import { adaptUserToClient } from '../../services/adapter';
import { ServerUser } from '../../types/user';
import { AsyncAction } from '../store';
import { setAuthStatus, setUserData } from '../user/user-actions';
import { setAppInitialized } from './app-actions';

const AUTH_FAIL_MESSAGE = 'Do not forget to sign in';

const initializeApp = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ServerUser>(BackendRoute.Login);

      if (data) {
        dispatch(setAuthStatus(AuthStatus.Auth));
        dispatch(setUserData(adaptUserToClient(data)));
      }
    } catch (error) {
      toast.info(AUTH_FAIL_MESSAGE);
    } finally {
      dispatch(setAppInitialized());
    }
  };

export { initializeApp };
