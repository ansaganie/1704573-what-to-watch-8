import { combineReducers } from '@reduxjs/toolkit';
import { ReducerNameSpace } from '../constants';
import { appReducer } from './app/app-reducer';
import { dataReducer } from './data/data-reducer';
import { filmReducer } from './film/film-reducer';
import { userReducer } from './user/user-reducer';

export const rootReducer = combineReducers({
  [ReducerNameSpace.data]: dataReducer,
  [ReducerNameSpace.app]: appReducer,
  [ReducerNameSpace.user]: userReducer,
  [ReducerNameSpace.film]: filmReducer,
});
