import { Review, ReviewForm } from '../types/review';
import { Film, ServerFilm } from '../types/film';
import { BackendRoute } from '../constants';
import { adaptFilmToClient, adaptReviewToClient } from './adapter';
import { api } from '../store/store';

const fetchComments = async (filmId: string): Promise<Review[]> => {
  const { data } = await api.get<Review[]>(BackendRoute.Comments(filmId));

  return data.map(adaptReviewToClient);
};

const postComment = async (filmId: string, comment: ReviewForm): Promise<Review | undefined> => {
  try {
    const { data } = await api.post<Review>(BackendRoute.Comments(filmId), comment);

    return adaptReviewToClient(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const fetchRelatedFilms = async (filmId: string): Promise<Film[]> => {
  const { data } = await api.get<ServerFilm[]>(BackendRoute.Similar(filmId));

  return data.map(adaptFilmToClient);
};

export {
  fetchRelatedFilms,
  fetchComments,
  postComment
};
