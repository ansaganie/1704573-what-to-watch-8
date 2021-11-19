import { AuthStatus } from '../../constants';
import { Film } from '../../types/film';
import { User } from '../../types/user';
import { Actions } from '../store';
import { UserActionType } from './user-actions';

export type UserState = {
  authStatus: AuthStatus,
  user: User | null,
  myList: Film[],
  isMyListLoading: boolean,
};

const initialState: UserState = {
  authStatus: AuthStatus.Unknown,
  user: null,
  myList: [],
  isMyListLoading: false,
};

export const userReducer = (state: UserState = initialState, action: Actions): UserState => {
  switch (action.type) {
    case UserActionType.SetAuthStatus:
      return {
        ...state,
        authStatus: action.payload.authStatus,
      };
    case UserActionType.SetUserData:
      return {
        ...state,
        user: action.payload.user,
      };
    case UserActionType.SetMyList:
      return {
        ...state,
        myList: action.payload.myList,
      };
    case UserActionType.SetIsMyListLoading:
      return {
        ...state,
        isMyListLoading: action.payload.isMyListLoading,
      };
    default:
      return state;
  }
};
