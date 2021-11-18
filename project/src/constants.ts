const getFilmsLink = (filmId: string): string => `/films/${filmId}`;

const ALL_GENRE = 'All genres';

enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const AppRoute = {
  Main: '/',
  SignIn: '/login',
  MyList: '/mylist',
  FilmPage: '/films/:id',
  AddReview: '/films/:id/review',
  Player: '/player/:id',
  getFilmsLink,
};

const BackendRoute = {
  Films: '/films',
  PromoFilm: '/promo',
  Favorite: '/favorite',
  Login: '/login',
  Logout: '/logout',
  getFavoriteLink: (filmId: string, status: Favorite): string => `/favorite/${filmId}/${status}`,
  getRelatedFilmsLink: (filmId: string): string => `/films/${filmId}/similar`,
  getReviewsLink: (filmId: string): string => `/comments/${filmId}`,
  getFilmsLink,
};

enum Favorite {
  SET = 1,
  UNSET = 0,
}

enum ReducerNameSpace {
  data = 'data',
  app = 'app',
  user = 'user',
  film = 'film',
}

export {
  AuthStatus,
  AppRoute,
  BackendRoute,
  Favorite,
  ReducerNameSpace,
  ALL_GENRE
};
