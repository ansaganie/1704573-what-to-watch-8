import { setGenre, setShownFilmsCount } from '../store/action';

export enum ActionType {
  SetGenre = 'main/set-genre',
  SetShownFilmsCount = 'main/set-shown-films-count',
}

export type Actions =
  | ReturnType<typeof setGenre>
  | ReturnType<typeof setShownFilmsCount>;
