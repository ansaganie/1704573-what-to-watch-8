import { Review, ReviewForm } from '../types/review';
import { Film, ServerFilm } from '../types/film';
import { BackendRoute } from '../constants';
import { adaptFilmToClient, adaptReviewToClient } from './adapter';
import { api } from '../store/store';

const postReview = async (filmId: string, comment: ReviewForm): Promise<Review[] | undefined> => {
  try {
    const { data } = await api.post<Review[]>(BackendRoute.Reviews(filmId), comment);

    return data.map(adaptReviewToClient);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const fetchRelatedFilms = async (filmId: string): Promise<Film[] | undefined> => {
  try {
    const { data } = await api.get<ServerFilm[]>(BackendRoute.Similar(filmId));

    return data.map(adaptFilmToClient);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

export {
  fetchRelatedFilms,
  postReview
};
