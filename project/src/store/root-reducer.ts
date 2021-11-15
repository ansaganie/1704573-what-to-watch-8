import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './app/app-reducer';
import { dataReducer } from './data/data-reducer';
import { filmReducer } from './film/film-reducer';
import { userReducer } from './user/user-reducer';

export enum NameSpace {
  data = 'data',
  app = 'app',
  user = 'user',
  film = 'film',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: dataReducer,
  [NameSpace.app]: appReducer,
  [NameSpace.user]: userReducer,
  [NameSpace.film]: filmReducer,
});

export type State = ReturnType<typeof rootReducer>;
