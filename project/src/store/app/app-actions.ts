enum AppActionType {
  SetGenre = 'app/set-genre',
  SetAppInitialized = 'app/set-app-initialized',
  SetServerNotWorking = 'app/set-server-not-working',
}

const setGenre = (genre: string) => ({
  type: AppActionType.SetGenre,
  payload: { genre },
} as const);

const setAppInitialized = () => ({
  type: AppActionType.SetAppInitialized,
} as const);

const setServerNotWorking = () => ({
  type: AppActionType.SetServerNotWorking,
} as const);

export type AppActions =
  | ReturnType<typeof setServerNotWorking>
  | ReturnType<typeof setGenre>
  | ReturnType<typeof setAppInitialized>;

export {
  setGenre,
  setAppInitialized,
  setServerNotWorking,
  AppActionType
};
