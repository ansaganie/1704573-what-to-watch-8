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
  Player = '/player/:id',
}

const BackendRoute = {
  Films: '/films',
  PromoFilm: '/promo',
  Favorite: '/favorite',
  FavoritePost: (filmId: string, status: Favorite): string => `/favorite/${filmId}/${status}`,
  Login: '/login',
  Logout: '/logout',
  Similar(filmId: string): string {
    return `${this.Films}/${filmId}/similar`;
  },
  Film(filmId: string): string {
    return `${this.Films}/${filmId}`;
  },
  Reviews: (filmId: string): string => `/comments/${filmId}`,
};

enum HttpCode {
  Unauthorized = 401,
}

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
  HttpCode,
  Favorite,
  ReducerNameSpace,
  FILMS_INITIAL_COUNT,
  FILMS_STEP,
  ALL_GENRE
};
