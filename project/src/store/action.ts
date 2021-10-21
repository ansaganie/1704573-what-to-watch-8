import { ActionType } from '../types/action';
import { Genres } from '../types/genres';

export const setGenre = (genre: Genres) => ({
  type: ActionType.SetGenre,
  payload: { genre },
} as const);

