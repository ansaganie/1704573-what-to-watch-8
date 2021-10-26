import { Film, ServerFilm } from '../types/film';

const adaptFilmToClient = (film: ServerFilm): Film => {
  const {
    'preview_image': previewImage,
    'poster_image': posterImage,
    'background_image': backgroundImage,
    'scores_count': scoresCount,
    'video_link': videoLink,
    'preview_video_link': previewVideoLink,
    'run_time': runTime,
    'is_favorite': isFavorite,
  } = film;

  return {
    id: film.id,
    name: film.name,
    genre: film.genre,
    released: film.released,
    rating: film.rating,
    description: film.description,
    director: film.director,
    starring: film.starring,
    previewImage,
    posterImage,
    backgroundImage,
    scoresCount,
    videoLink,
    previewVideoLink,
    runTime,
    isFavorite,
  } as Film;
};

export { adaptFilmToClient };
