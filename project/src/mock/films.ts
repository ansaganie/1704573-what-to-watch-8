import { nanoid } from '@reduxjs/toolkit';
import { getRandomElement, getRandomFloat, getRandomNumber } from '../utils/random';

const FILM_LINKS = [
  'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
];
const POSTERS_IMAGES = [ 'the-grand-budapest-hotel-poster.jpg' ];
const BACKGROUND_IMAGES = [ 'bg-the-grand-budapest-hotel.jpg' ];
const PREVIEW_IMAGES = [
  'fantastic-beasts-the-crimes-of-grindelwald.jpg',
  'bohemian-rhapsody.jpg',
  'macbeth.jpg',
  'aviator.jpg',
  'we-need-to-talk-about-kevin.jpg',
  'what-we-do-in-the-shadows.jpg',
  'revenant.jpg',
  'johnny-english.jpg',
  'shutter-island.jpg',
  'pulp-fiction.jpg',
  'no-country-for-old-men.jpg',
  'snatch.jpg',
  'moonrise-kingdom.jpg',
  'seven-years-in-tibet.jpg',
  'midnight-special.jpg',
  'war-of-the-worlds.jpg',
  'dardjeeling-limited.jpg',
  'orlando.jpg',
  'mindhunter.jpg',
  'midnight-special.jpg',
];
const FILM_NAMES = [
  'Fantastic Beasts: The Crimes of Grindelwald',
  'Bohemian Rhapsody',
  'Macbeth',
  'Aviator',
  'We need to talk about Kevin',
  'What We Do in the Shadows',
  'Revenant',
  'Johnny English',
  'Shutter Island',
  'Pulp Fiction',
  'No Country for Old Men',
  'Snatch',
  'Moonrise Kingdom',
  'Seven Years in Tibet',
  'Midnight Special',
  'War of the Worlds',
  'Dardjeeling Limited',
  'Orlando',
  'Mindhunter',
  'Midnight Special',
];
const GENRES = [
  'Comedies',
  'Crime',
  'Documentary',
  'Dramas',
  'Horror',
  'Kids & Family',
  'Romance',
  'Sci-Fi',
  'Thrillers',
];
const MAX_RATING = 10;
const MIN_RATING = 1;
const RATING_SCALE = 1;
const MAX_COUNT = 100;
const MIN_COUNT = 400;
const MAX_YEAR = 1950;
const MIN_YEAR = 2020;
const MAX_ARRAY_LENGTH = 20;
const IMG_FOLDER = '/img/';

const films = new Array(MAX_ARRAY_LENGTH)
  .fill(null)
  .map(() => ({
    id: nanoid(),
    posterImage: `${IMG_FOLDER}${getRandomElement(POSTERS_IMAGES)}`,
    previewImage: `${IMG_FOLDER}${getRandomElement(PREVIEW_IMAGES)}`,
    backgroundImage: `${IMG_FOLDER}${getRandomElement(BACKGROUND_IMAGES)}`,
    name: getRandomElement(FILM_NAMES),
    genre: getRandomElement(GENRES),
    released: getRandomNumber(MIN_YEAR, MAX_YEAR),
    videoLink: getRandomElement(FILM_LINKS),
    description: [
      'In the 1930s the Grand Budapest Hotel is a popular European ski resort presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.',
      'Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.',
    ],
    director: 'Wes Anderson',
    starring: [ 'Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe' ],
    rating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_SCALE),
    scoresCount: getRandomNumber(MIN_COUNT, MAX_COUNT),
  }));

export { films };
