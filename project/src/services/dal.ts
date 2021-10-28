import { Review } from '../types/review';
import { Film, ServerFilm } from '../types/film';
import { BackendRoute } from '../constants';
import { adaptFilmToClient } from './adaptor';
import { api } from '../index';

const fetchFilm = async (filmId: string): Promise<Film> => {
  const { data } = await api.get<ServerFilm>(BackendRoute.Film(filmId));

  return adaptFilmToClient(data);
};

const fetchComments = async (filmId: string): Promise<Review[]> => {
  const { data } = await api.get<Review[]>(BackendRoute.Comments(filmId));

  return data;
};

const fetchRelatedFilms = async (filmId: string): Promise<Film[]> => {
  const { data } = await api.get<ServerFilm[]>(BackendRoute.Similar(filmId));

  return data.map(adaptFilmToClient);
};

export { fetchFilm, fetchRelatedFilms, fetchComments };
