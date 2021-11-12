import { Review, ReviewForm } from '../types/review';
import { Film, ServerFilm } from '../types/film';
import { BackendRoute } from '../constants';
import { adaptFilmToClient } from './adapter';
import { api } from '../store/store';

const fetchFilm = async (filmId: string): Promise<Film> => {
  const { data } = await api.get<ServerFilm>(BackendRoute.Film(filmId));

  return adaptFilmToClient(data);
};

const fetchComments = async (filmId: string): Promise<Review[]> => {
  const { data } = await api.get<Review[]>(BackendRoute.Comments(filmId));

  return data;
};

const postComments = async (filmId: string, comment: ReviewForm): Promise<void> => {
  try {
    await api.post<Review[]>(BackendRoute.Comments(filmId), comment);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const fetchRelatedFilms = async (filmId: string): Promise<Film[]> => {
  const { data } = await api.get<ServerFilm[]>(BackendRoute.Similar(filmId));

  return data.map(adaptFilmToClient);
};

const fetchFavorites = async (): Promise<Film[]> => {
  const { data } = await api.get<ServerFilm[]>(BackendRoute.Favorite);

  return data.map(adaptFilmToClient);
};

export {
  fetchFilm,
  fetchRelatedFilms,
  fetchComments,
  fetchFavorites,
  postComments
};
