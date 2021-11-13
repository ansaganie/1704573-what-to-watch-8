import { Film } from '../../types/film';

enum FilmActionType {
  SetMyListButtonDisabled = 'film/set-my-list-button-disabled',
  SetFilmInFocus = 'film/set-film-in-focus',
  SetIsFilmLoading = 'film/set-is-film-loading',
}

const setMyListButtonDisabled = (status: boolean) => ({
  type: FilmActionType.SetMyListButtonDisabled,
  payload: { status },
} as const);

const setFilmInFocus = (filmInFocus: Film) => ({
  type: FilmActionType.SetFilmInFocus,
  payload: { filmInFocus },
} as const);

const setIsFilmLoading = (value: boolean) => ({
  type: FilmActionType.SetIsFilmLoading,
  payload: { value },
} as const);

export {
  setMyListButtonDisabled,
  setFilmInFocus,
  setIsFilmLoading,
  FilmActionType
};

export type FilmActions =
  | ReturnType<typeof setMyListButtonDisabled>
  | ReturnType<typeof setIsFilmLoading>
  | ReturnType<typeof setFilmInFocus>;
