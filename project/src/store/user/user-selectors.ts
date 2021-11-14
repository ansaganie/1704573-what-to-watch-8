import { Film } from '../../types/film';
import { State } from '../store';

const getMyList = (state: State): Film[] => state.user.myList;
const getIsMyListLoading = (state: State): boolean => state.user.isMyListLoading;

export {
  getMyList,
  getIsMyListLoading
};
