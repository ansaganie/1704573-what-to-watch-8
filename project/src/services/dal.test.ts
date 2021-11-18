import MockAdapter from 'axios-mock-adapter';
import { BackendRoute } from '../constants';
import { api } from '../store/store';
import { adaptFilmToClient } from './adapter';
import { ReviewForm } from '../types/review';
import { fetchRelatedFilms, postReview } from './dal';
import {
  getFakeFilm,
  getFakeReview,
  getFakeReviews,
  getFakeServerFilms
} from '../utils/mock';

describe('Data access layer', () => {
  let mockApi: MockAdapter;

  beforeAll(() => {
    mockApi = new MockAdapter(api);
  });

  afterEach(() => {
    mockApi.reset();
  });

  it('should fetch similar films by filmId and return it', async () => {
    const films = getFakeServerFilms();
    const film = films[0];
    const expected = films.map(adaptFilmToClient);

    mockApi
      .onGet(BackendRoute.getRelatedFilmsLink(film.id))
      .reply(200, films);

    const response = await fetchRelatedFilms(film.id);

    expect(response).toEqual(expected);
  });

  it('should post comment by filmId and return processed comment', async () => {
    const reviews = getFakeReviews();
    const review = getFakeReview();
    const reviewForm: ReviewForm = {
      comment: review.comment,
      rating: review.rating,
    };
    const film = getFakeFilm();
    const expected = [...reviews, { ...review }] ;

    mockApi
      .onPost(BackendRoute.getReviewsLink(film.id))
      .reply(201, [...reviews, review]);

    const response = await postReview(film.id, reviewForm);

    expect(response).toEqual(expected);
  });
});
