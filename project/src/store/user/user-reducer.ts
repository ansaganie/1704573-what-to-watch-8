import { AuthStatus } from '../../constants';
import { Actions, ActionType } from '../../types/action';
import { UserState } from './type';

const initialState: UserState = {
  authStatus: AuthStatus.Unknown,
  user: null,
};

export const userReducer = (state: UserState = initialState, action: Actions): UserState => {
  switch (action.type) {
    case ActionType.SetAuthStatus:
      return {
        ...state,
        authStatus: action.payload.authStatus,
      };
    case ActionType.SetUserData:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
