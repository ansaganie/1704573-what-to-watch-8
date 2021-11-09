import { AuthStatus } from '../../constants';
import { User } from '../../types/user';
import { UserActions, UserActionType } from './user-actions';

export type UserState = {
  authStatus: AuthStatus,
  user: User | null,
};

const initialState: UserState = {
  authStatus: AuthStatus.Unknown,
  user: null,
};

export const userReducer = (state: UserState = initialState, action: UserActions): UserState => {
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
    default:
      return state;
  }
};
