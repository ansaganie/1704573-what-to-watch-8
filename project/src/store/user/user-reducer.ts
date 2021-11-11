import { AuthStatus } from '../../constants';
import { Actions } from '../../types/action';
import { User } from '../../types/user';
import { UserActionType } from './user-actions';

export type UserState = {
  authStatus: AuthStatus,
  user: User | null,
};

const initialState: UserState = {
  authStatus: AuthStatus.Unknown,
  user: null,
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
    default:
      return state;
  }
};
