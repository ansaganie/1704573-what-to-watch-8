import { setGenre } from '../store/action';

export enum ActionType {
  SetGenre = 'main/set-genre'
}

export type Actions =
  | ReturnType<typeof setGenre>;
