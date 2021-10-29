const FILMS_INITIAL_COUNT = 8;
const FILMS_STEP = 8;
const ALL_GENRE = 'All genres';

enum AuthStatus {
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

const BackendRoute = {
  Films: '/films',
  PromoFilm: '/promo',
  Favorite: '/favorite',
  Login: '/login',
  Logout: '/logout',
  Similar: (id: string): string => `/films/${id}/similar`,
  Film: (id: string): string => `/films/${id}`,
  Comments: (id: string): string => `/comments/${id}`,
};

enum HttpCode {
  Unauthorized = 401,
}

export {
  AuthStatus,
  AppRoute,
  BackendRoute,
  HttpCode,
  FILMS_INITIAL_COUNT,
  FILMS_STEP,
  ALL_GENRE
};
