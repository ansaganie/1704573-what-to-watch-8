import { Review } from '../types/review';
import { getRandomElement, getRandomFloat } from '../utils/random';
import { films } from './films';

const filmIds = films.map(({ id }) => id);

const reviews: Review[] = [
  {
    filmId: getRandomElement(filmIds),
    text: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed films in years.',
    author: 'Kate Muir',
    date: new Date(),
    rating: getRandomFloat(1, 10, 1),
  },
  {
    filmId: getRandomElement(filmIds),
    text: 'The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.',
    author: 'Matthew Lickona',
    date: new Date(),
    rating: getRandomFloat(1, 10, 1),
  },
  {
    filmId: getRandomElement(filmIds),
    text: 'Anderson\'s films are too precious for some, but for those of us willing to lose ourselves in them, they\'re a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.',
    author: 'Bill Goodykoontz',
    date: new Date(),
    rating: getRandomFloat(1, 10, 1),
  },
  {
    filmId: getRandomElement(filmIds),
    text: 'I didn\'t find it amusing, and while I can appreciate the creativity, it\'s an hour and 40 minutes I wish I could take back.',
    author: 'Amanda Greever',
    date: new Date(),
    rating: getRandomFloat(1, 10, 1),
  },
  {
    filmId: getRandomElement(filmIds),
    text: 'The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.',
    author: 'Matthew Lickona',
    date: new Date(),
    rating: getRandomFloat(1, 10, 1),
  },
  {
    filmId: getRandomElement(filmIds),
    text: 'It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.',
    author: 'Paula Fleri-Soler',
    date: new Date(),
    rating: getRandomFloat(1, 10, 1),
  },
  {
    text: 'It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.',
    author: 'Paula Fleri-Soler',
    filmId: getRandomElement(filmIds),
    date: new Date(),
    rating: getRandomFloat(1, 10, 1),
  },
  {
    author: 'Oleg Calhoun',
    text: 'mi fringilla mi lacinia mattis. Integer eu lacus. Quisque imperdiet,',
    filmId: getRandomElement(filmIds),
    date: new Date(),
    rating: getRandomFloat(1, 10, 1),
  },
  {
    author: 'Macaulay Barnes',
    text: 'tristique pellentesque, tellus sem mollis dui, in sodales elit erat',
    filmId: getRandomElement(filmIds),
    date: new Date(),
    rating: getRandomFloat(1, 10, 1),
  },
  {
    author: 'Todd Holloway',
    text: 'fringilla euismod enim. Etiam gravida molestie arcu. Sed eu nibh',
    filmId: getRandomElement(filmIds),
    date: new Date(),
    rating: getRandomFloat(1, 10, 1),
  },
  {
    author: 'Lane Leon',
    text: 'dapibus id, blandit at, nisi. Cum sociis natoque penatibus et',
    filmId: getRandomElement(filmIds),
    date: new Date(),
    rating: getRandomFloat(1, 10, 1),
  },
  {
    author: 'Vincent Gonzales',
    text: 'mollis. Duis sit amet diam eu dolor egestas rhoncus. Proin',
    filmId: getRandomElement(filmIds),
    date: new Date(),
    rating: getRandomFloat(1, 10, 1),
  },
];

export { reviews };
