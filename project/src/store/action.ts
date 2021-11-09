import { ActionType } from '../types/action';
import { AuthStatus } from '../constants';
import { User } from '../types/user';

const setGenre = (genre: string) => ({
  type: ActionType.SetGenre,
  payload: { genre },
} as const);

const setAuthStatus = (authStatus: AuthStatus) => ({
  type: ActionType.SetAuthStatus,
  payload: { authStatus },
} as const);

const setAppInitialized = () => ({
  type: ActionType.SetAppInitialized,
} as const);

const setUserData = (data: User | null) => ({
  type: ActionType.SetUserData,
  payload: { user: data},
} as const);

export {
  setGenre,
  setAuthStatus,
  setUserData,
  setAppInitialized
};
