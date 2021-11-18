import { Review, ReviewForm } from '../types/review';
import { Film, FilmId, ServerFilm } from '../types/film';
import { BackendRoute } from '../constants';
import { adaptFilmToClient, adaptReviewToClient } from './adapter';
import { api } from '../store/store';
import { toast } from 'react-toastify';

const POST_REVIEW_ERROR = 'Could not post your review, please try later';
const RELATED_FILMS_ERROR = 'Could not post your review, please try later';

const postReview = async (filmId: FilmId, comment: ReviewForm): Promise<Review[] | undefined> => {
  try {
    const { data } = await api.post<Review[]>(BackendRoute.getReviewsLink(filmId), comment);

    return data.map(adaptReviewToClient);
  } catch (error) {
    toast.info(POST_REVIEW_ERROR);
  }
};

const fetchRelatedFilms = async (filmId: FilmId): Promise<Film[] | undefined> => {
  try {
    const { data } = await api.get<ServerFilm[]>(BackendRoute.getRelatedFilmsLink(filmId));

    return data.map(adaptFilmToClient);
  } catch (error) {
    toast.info(RELATED_FILMS_ERROR);
  }
};

export {
  fetchRelatedFilms,
  postReview
};
