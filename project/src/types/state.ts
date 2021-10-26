import { Review } from './review';
import { Film } from './film';
import { Genres } from './genres';
import { AuthStatus } from '../constants';

export type State = {
  genre: Genres,
  films: Film[],
  reviews: Review[],
  promoFilm: Film | null,
  authStatus: AuthStatus,
  isDataLoaded: boolean,
}
