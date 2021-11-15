import { Film, ServerFilm } from '../types/film';
import { Review } from '../types/review';
import { ServerUser, User } from '../types/user';

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
    id: film.id.toString(),
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

const adaptUserToClient = (user: ServerUser): User => {
  const { 'avatar_url': avatarUrl } = user;

  return {
    email: user.email,
    id: user.id.toString(),
    name: user.name,
    token: user.token,
    avatarUrl,
  };
};

const adaptReviewToClient = (review: Review): Review => ({
  ...review,
  date: new Date(review.date),
});

export {
  adaptFilmToClient,
  adaptUserToClient,
  adaptReviewToClient
};
