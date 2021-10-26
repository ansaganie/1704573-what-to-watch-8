import { Review } from './review';
import { Film } from './film';
import { AuthStatus } from '../constants';
import { User } from './user';

export type State = {
  genre: string,
  films: Film[],
  reviews: Review[],
  promoFilm: Film | null,
  authStatus: AuthStatus,
  isFilmsLoading: boolean,
  isPromoFilmLoading: boolean,
  user: User | null,
  appInitialized: boolean,
}
