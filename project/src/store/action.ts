import { ActionType } from '../types/action';
import { Genres } from '../types/genres';

const setGenre = (genre: Genres) => ({
  type: ActionType.SetGenre,
  payload: { genre },
} as const);

export { setGenre };
