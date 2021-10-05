import { Film } from '../types/film';

const promoFilm: Film = {
  id: 0,
  previewImage: 'img/the-grand-budapest-hotel-poster.jpg',
  backgroundImage: 'img/bg-the-grand-budapest-hotel.jpg',
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  released: 2014,
};

const films: Film[] = [
  {
    id: 1,
    previewImage: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    name: 'Fantastic Beasts: The Crimes of Grindelwald',
  },
  { id: 2, previewImage: 'img/bohemian-rhapsody.jpg', name: 'Bohemian Rhapsody' },
  {
    id: 3,
    previewImage: 'img/macbeth.jpg',
    name: 'Macbeth',
  },
  { id: 4, previewImage: 'img/aviator.jpg', name: 'Aviator' },
  {
    id: 5,
    previewImage: 'img/we-need-to-talk-about-kevin.jpg',
    name: 'We need to talk about Kevin',
  },
  {
    id: 6,
    previewImage: 'img/what-we-do-in-the-shadows.jpg',
    name: 'What We Do in the Shadows',
  },
  {
    id: 7,
    previewImage: 'img/revenant.jpg',
    name: 'Revenant',
  },
  { id: 8, previewImage: 'img/johnny-english.jpg', name: 'Johnny English' },
  {
    id: 9,
    previewImage: 'img/shutter-island.jpg',
    name: 'Shutter Island',
  },
  { id: 10, previewImage: 'img/pulp-fiction.jpg', name: 'Pulp Fiction' },
  {
    id: 11,
    previewImage: 'img/no-country-for-old-men.jpg',
    name: 'No Country for Old Men',
  },
  { id: 12, previewImage: 'img/snatch.jpg', name: 'Snatch' },
  {
    id: 13,
    previewImage: 'img/moonrise-kingdom.jpg',
    name: 'Moonrise Kingdom',
  },
  {
    id: 14,
    previewImage: 'img/seven-years-in-tibet.jpg',
    name: 'Seven Years in Tibet',
  },
  {
    id: 15,
    previewImage: 'img/midnight-special.jpg',
    name: 'Midnight Special',
  },
  { id: 16, previewImage: 'img/war-of-the-worlds.jpg', name: 'War of the Worlds' },
  {
    id: 17,
    previewImage: 'img/dardjeeling-limited.jpg',
    name: 'Dardjeeling Limited',
  },
  { id: 18, previewImage: 'img/orlando.jpg', name: 'Orlando' },
  {
    id: 19,
    previewImage: 'img/mindhunter.jpg',
    name: 'Mindhunter',
  },
  { id: 20, previewImage: 'img/midnight-special.jpg', name: 'Midnight Special' },
];

export { films, promoFilm };
