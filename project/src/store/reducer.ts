import { films } from '../mock/films';
import { reviews } from '../mock/reviews';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';
import { Genres } from '../types/genres';

const initialState: State = {
  genre: Genres.AllGenres,
  films: films.slice(1),
  reviews,
  promoFilm: films[0],
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SetGenre:
      return {
        ...state,
        genre: action.payload.genre,
      };
    default:
      return state;
  }
};
