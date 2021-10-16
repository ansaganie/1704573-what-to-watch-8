import { Review } from '../types/review';
import { getRandomElement, getRandomFloat } from '../utils/random';
import { FILM_IDS } from './films';

const MAX_RATING = 9;
const MIN_RATING = 1;
const RATING_SCALE = 1;

const reviews: Review[] = [
  {
    filmId: getRandomElement(FILM_IDS),
    text: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed films in years.',
    author: 'Kate Muir',
    date: new Date(),
    rating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_SCALE),
  },
  {
    filmId: getRandomElement(FILM_IDS),
    text: 'The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.',
    author: 'Matthew Lickona',
    date: new Date(),
    rating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_SCALE),
  },
  {
    filmId: getRandomElement(FILM_IDS),
    text: 'Anderson\'s films are too precious for some, but for those of us willing to lose ourselves in them, they\'re a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.',
    author: 'Bill Goodykoontz',
    date: new Date(),
    rating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_SCALE),
  },
  {
    filmId: getRandomElement(FILM_IDS),
    text: 'I didn\'t find it amusing, and while I can appreciate the creativity, it\'s an hour and 40 minutes I wish I could take back.',
    author: 'Amanda Greever',
    date: new Date(),
    rating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_SCALE),
  },
  {
    filmId: getRandomElement(FILM_IDS),
    text: 'The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.',
    author: 'Matthew Lickona',
    date: new Date(),
    rating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_SCALE),
  },
  {
    filmId: getRandomElement(FILM_IDS),
    text: 'It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.',
    author: 'Paula Fleri-Soler',
    date: new Date(),
    rating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_SCALE),
  },
  {
    text: 'It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.',
    author: 'Paula Fleri-Soler',
    filmId: getRandomElement(FILM_IDS),
    date: new Date(),
    rating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_SCALE),
  },
  {
    author: 'Oleg Calhoun',
    text: 'mi fringilla mi lacinia mattis. Integer eu lacus. Quisque imperdiet,',
    filmId: getRandomElement(FILM_IDS),
    date: new Date(),
    rating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_SCALE),
  },
  {
    author: 'Macaulay Barnes',
    text: 'tristique pellentesque, tellus sem mollis dui, in sodales elit erat',
    filmId: getRandomElement(FILM_IDS),
    date: new Date(),
    rating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_SCALE),
  },
  {
    author: 'Todd Holloway',
    text: 'fringilla euismod enim. Etiam gravida molestie arcu. Sed eu nibh',
    filmId: getRandomElement(FILM_IDS),
    date: new Date(),
    rating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_SCALE),
  },
  {
    author: 'Lane Leon',
    text: 'dapibus id, blandit at, nisi. Cum sociis natoque penatibus et',
    filmId: getRandomElement(FILM_IDS),
    date: new Date(),
    rating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_SCALE),
  },
  {
    author: 'Vincent Gonzales',
    text: 'mollis. Duis sit amet diam eu dolor egestas rhoncus. Proin',
    filmId: getRandomElement(FILM_IDS),
    date: new Date(),
    rating: getRandomFloat(MIN_RATING, MAX_RATING, RATING_SCALE),
  },
];

export { reviews };
