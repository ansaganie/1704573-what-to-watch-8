enum FilmActionType {
  SetMyListButtonDisabled = 'film/set-my-list-button-disabled',
}

const setMyListButtonDisabled = (status: boolean) => ({
  type: FilmActionType.SetMyListButtonDisabled,
  payload: { status },
} as const);

export {
  setMyListButtonDisabled,
  FilmActionType
};

export type FilmActions =
  | ReturnType<typeof setMyListButtonDisabled>;
