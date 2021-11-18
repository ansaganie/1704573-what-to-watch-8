import { AuthStatus } from '../../constants';
import { Film } from '../../types/film';
import { User } from '../../types/user';
import { State } from '../store';

const getAuthStatus = (state: State): AuthStatus => state.user.authStatus;
const getUser =  (state: State): User | null => state.user.user;
const getMyList = (state: State): Film[] => state.user.myList;
const getIsMyListLoading = (state: State): boolean => state.user.isMyListLoading;

export {
  getAuthStatus,
  getUser,
  getMyList,
  getIsMyListLoading
};
