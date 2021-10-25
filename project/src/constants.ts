enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  FilmPage = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id'
}

const FILMS_INITIAL_COUNT = 8;
const FILMS_STEP = 8;

export {
  AuthorizationStatus,
  AppRoute,
  FILMS_INITIAL_COUNT,
  FILMS_STEP
};
