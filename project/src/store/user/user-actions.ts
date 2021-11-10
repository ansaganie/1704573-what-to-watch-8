import { AuthStatus } from '../../constants';
import { User } from '../../types/user';

enum UserActionType {
  SetAuthStatus = 'user/set-auth-status',
  SetUserData = 'user/set-user-data',
}

const setAuthStatus = (authStatus: AuthStatus) => ({
  type: UserActionType.SetAuthStatus,
  payload: { authStatus },
} as const);

const setUserData = (data: User | null) => ({
  type: UserActionType.SetUserData,
  payload: { user: data},
} as const);

export type UserActions =
  | ReturnType<typeof setAuthStatus>
  | ReturnType<typeof setUserData>;

export {
  setAuthStatus,
  setUserData,
  UserActionType
};
