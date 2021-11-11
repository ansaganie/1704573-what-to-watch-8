import { name, datatype, music, lorem, image, internet  } from 'faker';
import { Film } from '../types/film';
import { User } from '../types/user';

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

const getFakeFilms = (): Film[] =>
  new Array(FILMS_COUNT)
    .fill(null)
    .map(() => getFakeFilm());

const getFakeUser = (): User => ({
  avatarUrl: image.avatar(),
  email: internet.email(),
  id: datatype.uuid(),
  name: name.firstName(),
  token: datatype.uuid(),
} as User);

export {
  getFakeFilm,
  getFakeFilms,
  getFakeUser
};
