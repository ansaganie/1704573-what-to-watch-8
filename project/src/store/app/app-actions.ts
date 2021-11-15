enum AppActionType {
  SetGenre = 'app/set-genre',
  SetAppInitialized = 'app/set-app-initialized',
}

const setGenre = (genre: string) => ({
  type: AppActionType.SetGenre,
  payload: { genre },
} as const);

const setAppInitialized = () => ({
  type: AppActionType.SetAppInitialized,
} as const);

export type AppActions =
  | ReturnType<typeof setGenre>
  | ReturnType<typeof setAppInitialized>;

export {
  setGenre,
  setAppInitialized,
  AppActionType
};
