export type Film = {
  id: string,
  previewImage: string,
  posterImage: string,
  backgroundImage: string,
  name: string,
  genre: string,
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
