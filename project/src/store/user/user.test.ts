import { AuthStatus } from '../../constants';
import { getFakeUser } from '../../utils/mock';
import { unknownAction } from '../unknown';
import { setAuthStatus, setUserData } from './user-actions';
import { userReducer } from './user-reducer';

describe('User reducer', () => {
  it('should return state unchanged with unknown action', () => {
    expect( userReducer( undefined, unknownAction())).toEqual(  {
      authStatus: AuthStatus.Unknown,
      user: null,
    });
  });
  it('should update authorization status with given value', () => {
    expect( userReducer( undefined, setAuthStatus(AuthStatus.NoAuth))).toEqual({
      authStatus: AuthStatus.NoAuth,
      user: null,
    });
  });

  it('should update user data with given data', () => {
    const user = getFakeUser();

    expect( userReducer( undefined, setUserData(user))).toEqual({
      authStatus:  AuthStatus.Unknown,
      user,
    });
  });
});
