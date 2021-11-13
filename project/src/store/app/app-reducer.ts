import { Actions } from '../store';
import { AppActionType } from './app-actions';

export type AppState = {
  genre: string;
  appInitialized: boolean;
};

const initialState: AppState = {
  genre: 'All genres',
  appInitialized: false,
};

export const appReducer = (state: AppState = initialState, action: Actions): AppState => {
  switch (action.type) {
    case AppActionType.SetGenre:
      return {
        ...state,
        genre: action.payload.genre,
      };
    case AppActionType.SetAppInitialized:
      return {
        ...state,
        appInitialized: true,
      };
    default:
      return state;
  }
};
