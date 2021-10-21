import { Genres } from './genres';

export type Film = {
  id: string,
  previewImage: string,
  posterImage: string,
  backgroundImage: string,
  name: string,
  genre: Genres,
  released: number,
  rating: number,
  scoresCount: number,
  description: string[],
  director: string,
  starring: string[],
  videoLink: string,
  runTime: number,
  isFavorite: boolean,
}
