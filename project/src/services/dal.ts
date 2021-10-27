import { AsyncAction } from '../types/action';
import { Review } from '../types/review';
import { Film, ServerFilm } from '../types/film';
import { BackendRoute } from '../constants';
import { adaptFilmToClient } from './adaptor';

const fetchFilm = (filmId: string): AsyncAction<Promise<Film>> =>
  async (dispatch, _getState, api): Promise<Film> => {
    const { data } = await api.get<ServerFilm>(BackendRoute.Film(filmId));

    return adaptFilmToClient(data);
  };

const fetchComments = (filmId: string): AsyncAction<Promise<Review[]>> =>
  async (dispatch, _getState, api): Promise<Review[]> => {
    const { data } = await api.get<Review[]>(BackendRoute.Comments(filmId));

    return data;
  };

const fetchRelatedFilms = (filmId: string): AsyncAction<Promise<Film[]>> =>
  async (dispatch, _getState, api): Promise<Film[]> => {
    const { data } = await api.get<ServerFilm[]>(BackendRoute.Similar(filmId));

    return data.map(adaptFilmToClient);
  };

export { fetchFilm, fetchRelatedFilms, fetchComments };
