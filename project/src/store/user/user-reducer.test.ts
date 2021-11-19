import { AuthStatus } from '../../constants';
import { getFakeFilms, getFakeUser } from '../../utils/mock';
import { unknownAction } from '../../setupTests';
import { setAuthStatus, setIsMyListLoading, setMyList, setUserData } from './user-actions';
import { userReducer } from './user-reducer';

const initialState = {
  authStatus: AuthStatus.Unknown,
  user: null,
  myList: [],
  isMyListLoading: false,
};

describe('User reducer', () => {
  it('should return state unchanged with unknown action', () => {
    expect( userReducer( undefined, unknownAction())).toEqual(  {
      ...initialState,
    });
  });

  it('should update authorization status with given value', () => {
    expect( userReducer( undefined, setAuthStatus(AuthStatus.NoAuth))).toEqual({
      ...initialState,
      authStatus: AuthStatus.NoAuth,
    });
  });

  it('should set user data', () => {
    const user = getFakeUser();

    expect( userReducer( undefined, setUserData(user))).toEqual({
      ...initialState,
      user,
    });
  });

  it('should set my films list', () => {
    const films = getFakeFilms();

    expect( userReducer( undefined, setMyList(films))).toEqual({
      ...initialState,
      myList: [...films],
    });
  });

  it('should set my films list loading to "true"', () => {
    expect( userReducer( undefined, setIsMyListLoading(true))).toEqual({
      ...initialState,
      isMyListLoading: true,
    });
  });

  it('should set my films list loading to "false"', () => {
    const state = {
      ...initialState,
      isMyListLoading: true,
    };

    expect( userReducer( state, setIsMyListLoading(false))).toEqual({
      ...initialState,
      isMyListLoading: false,
    });
  });
});
