import { Review } from './review';
import { Film } from './film';
import { Genres } from './genres';

export type State = {
  genre: Genres,
  films: Film[],
  reviews: Review[],
  promoFilm: Film,
  shownFilmsCount: number,
}
