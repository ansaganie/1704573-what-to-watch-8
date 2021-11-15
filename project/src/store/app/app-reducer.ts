import { Actions } from '../store';
import { AppActionType } from './app-actions';

export type AppState = {
  genre: string,
  appInitialized: boolean,
  serverNotWorking: boolean,
};

const initialState: AppState = {
  genre: 'All genres',
  appInitialized: false,
  serverNotWorking: false,
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
    case AppActionType.SetServerNotWorking:
      return {
        ...state,
        serverNotWorking: true,
      };
    default:
      return state;
  }
};
