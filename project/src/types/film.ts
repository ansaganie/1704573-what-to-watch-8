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
  previewVideoLink: string,
  runTime: number,
  isFavorite: boolean,
}

export type ServerFilm = {
  ['preview_image']: string,
  ['poster_image']: string,
  ['background_image']: string,
  ['scores_count']: number,
  ['video_link']: string,
  ['preview_video_link']: string,
  ['run_time']: number,
  ['is_favorite']: boolean,
  id: string,
  name: string,
  genre: Genres,
  released: number,
  rating: number,
  description: string[],
  director: string,
  starring: string[],
}
