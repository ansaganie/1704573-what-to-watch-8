import { Actions, ActionType } from '../../types/action';
import { AppState } from './type';

const initialState: AppState = {
  genre: 'All genres',
  appInitialized: false,
};

export const appReducer = (state: AppState = initialState, action: Actions): AppState => {
  switch (action.type) {
    case ActionType.SetGenre:
      return {
        ...state,
        genre: action.payload.genre,
      };
    case ActionType.SetAppInitialized:
      return {
        ...state,
        appInitialized: true,
      };
    default:
      return state;
  }
};
