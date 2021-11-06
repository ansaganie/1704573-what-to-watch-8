import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './app/app-reducer';
import { dataReducer } from './data/data-reducer';
import { userReducer } from './user/user-reducer';

export enum NameSpace {
  data = 'data',
  app = 'app',
  user = 'user',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: dataReducer,
  [NameSpace.app]: appReducer,
  [NameSpace.user]: userReducer,
});

export type State = ReturnType<typeof rootReducer>;
