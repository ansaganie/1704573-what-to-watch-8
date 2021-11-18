export type Genre = string;
export type FilmId = string;

type Common = {
  id: FilmId,
  name: string,
  genre: Genre,
  released: number,
  rating: number,
  description: string[],
  director: string,
  starring: string[],
}

export type Film = Common & {
  previewImage: string,
  posterImage: string,
  backgroundImage: string,
  scoresCount: number,
  videoLink: string,
  previewVideoLink: string,
  runTime: number,
  isFavorite: boolean,
}

export type ServerFilm = Common & {
  'preview_image': string,
  'poster_image': string,
  'background_image': string,
  'scores_count': number,
  'video_link': string,
  'preview_video_link': string,
  'run_time': number,
  'is_favorite': boolean,
}
