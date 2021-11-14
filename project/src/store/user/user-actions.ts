import { AuthStatus } from '../../constants';
import { Film } from '../../types/film';
import { User } from '../../types/user';

enum UserActionType {
  SetMyList = 'user/set-my-list',
  SetIsMyListLoading = 'user/set-is-my-list-loading',
  SetAuthStatus = 'user/set-auth-status',
  SetUserData = 'user/set-user-data',
}

const setMyList = (myList: Film[]) => ({
  type: UserActionType.SetMyList,
  payload: { myList },
} as const);

const setIsMyListLoading = (isMyListLoading: boolean) => ({
  type: UserActionType.SetIsMyListLoading,
  payload: { isMyListLoading },
} as const);

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
  | ReturnType<typeof setMyList>
  | ReturnType<typeof setIsMyListLoading>
  | ReturnType<typeof setUserData>;

export {
  setAuthStatus,
  setUserData,
  setMyList,
  setIsMyListLoading,
  UserActionType
};
