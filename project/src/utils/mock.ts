import { name, datatype, music, lorem, image, internet, date  } from 'faker';
import { Film, ServerFilm } from '../types/film';
import { Review, ReviewUser } from '../types/review';
import { ServerUser, User } from '../types/user';

const MAX_YEAR = 1930;
const MIN_YEAR = 2021;
const MAX_RATING = 10;
const MIN_RATING = 1;
const RATING_PRECISION = 1;
const FILM_DESC_COUNT = 5;
const MAX_STARRING = 10;
const MIN_STARRING = 3;
const MAX_SCORE_COUNT = 0;
const MIN_SCORE_COUNT = 5000;
const MAX_RUN_TIME = 1000;
const MIN_RUN_TIME = 10000;
const FILMS_COUNT = 18;
const MAX_REVIEW_COUNT = 5;
const MIN_REVIEW_COUNT = 10;


const getFakeFilm = (): Film => ({
  name: name.title(),
  id: datatype.uuid(),
  genre: music.genre(),
  released: datatype.number({
    min: MIN_YEAR,
    max: MAX_YEAR,
  }),
  rating: datatype.number({
    min: MIN_RATING,
    max: MAX_RATING,
    precision: RATING_PRECISION,
  }),
  description: [lorem.paragraph(FILM_DESC_COUNT)],
  director: name.title(),
  starring: new Array(datatype.number({
    min: MIN_STARRING,
    max: MAX_STARRING,
  })).fill('').map(() => name.title()),
  previewImage: image.imageUrl(),
  posterImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  scoresCount: datatype.number({
    min: MIN_SCORE_COUNT,
    max: MAX_SCORE_COUNT,
  }),
  videoLink: internet.url(),
  previewVideoLink: internet.url(),
  runTime: datatype.number({
    min: MIN_RUN_TIME,
    max: MAX_RUN_TIME,
  }),
  isFavorite: datatype.boolean(),
} as Film);

const getFakeServerFilm = (): ServerFilm => ({
  name: name.title(),
  id: datatype.uuid(),
  genre: music.genre(),
  released: datatype.number({
    min: MIN_YEAR,
    max: MAX_YEAR,
  }),
  rating: datatype.number({
    min: MIN_RATING,
    max: MAX_RATING,
    precision: RATING_PRECISION,
  }),
  description: [lorem.paragraph(FILM_DESC_COUNT)],
  director: name.title(),
  starring: new Array(datatype.number({
    min: MIN_STARRING,
    max: MAX_STARRING,
  })).fill('').map(() => name.title()),
  'preview_image': image.imageUrl(),
  'poster_image': image.imageUrl(),
  'background_image': image.imageUrl(),
  'scores_count': datatype.number({
    min: MIN_SCORE_COUNT,
    max: MAX_SCORE_COUNT,
  }),
  'video_link': internet.url(),
  'preview_video_link': internet.url(),
  'run_time': datatype.number({
    min: MIN_RUN_TIME,
    max: MAX_RUN_TIME,
  }),
  'is_favorite': datatype.boolean(),
} as ServerFilm);

const getFakeFilms = (): Film[] =>
  new Array(FILMS_COUNT)
    .fill(null)
    .map(() => getFakeFilm());

const getFakeServerFilms = (): ServerFilm[] =>
  new Array(FILMS_COUNT)
    .fill(null)
    .map(() => getFakeServerFilm());

const getFakeUser = (): User => ({
  avatarUrl: image.avatar(),
  email: internet.email(),
  id: datatype.uuid(),
  name: name.firstName(),
  token: datatype.uuid(),
} as User);

const getFakeServerUser = (): ServerUser => ({
  'avatar_url': image.avatar(),
  email: internet.email(),
  id: datatype.uuid(),
  name: name.firstName(),
  token: datatype.uuid(),
} as ServerUser);

const getFakeReview = (): Review => ({
  rating: datatype.number({
    min: MIN_RATING,
    max: MAX_RATING,
    precision: RATING_PRECISION,
  }),
  comment: lorem.paragraph(FILM_DESC_COUNT),
  id: datatype.uuid(),
  user: ({
    id: datatype.uuid(),
    name: name.firstName(),
  } as ReviewUser),
  date: date.past(),
});

const getFakeReviews = (): Review[] => new Array(datatype.number({
  min: MIN_REVIEW_COUNT,
  max: MAX_REVIEW_COUNT,
})).fill(null).map(getFakeReview);

export {
  getFakeFilm,
  getFakeFilms,
  getFakeUser,
  getFakeServerUser,
  getFakeServerFilm,
  getFakeServerFilms,
  getFakeReview,
  getFakeReviews
};
