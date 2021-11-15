import { Actions } from '../../types/action';
import { FilmActionType } from './film-actions';

export type FilmState = {
  myListButtonDisabled: boolean,
};

const initialState: FilmState = {
  myListButtonDisabled: false,
};

export const filmReducer = (state: FilmState = initialState, action: Actions): FilmState => {
  switch (action.type) {
    case FilmActionType.SetMyListButtonDisabled:
      return {
        ...state,
        myListButtonDisabled: action.payload.status,
      };
    default:
      return state;
  }
};
