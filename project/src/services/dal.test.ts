import MockAdapter from 'axios-mock-adapter';
import { BackendRoute } from '../constants';
import { api } from '../store/store';
import { adaptFilmToClient } from './adapter';
import { ReviewForm } from '../types/review';
import {
  fetchComments,
  fetchFavorites,
  fetchFilm,
  fetchRelatedFilms,
  postComment
} from './dal';
import {
  getFakeFilm,
  getFakeReview,
  getFakeReviews,
  getFakeServerFilm,
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

  it('should fetch and return the film by id', async () => {
    const film = getFakeServerFilm();
    const expected = adaptFilmToClient({...film});

    mockApi
      .onGet(BackendRoute.Film(film.id))
      .reply(200, film);

    const response = await fetchFilm(film.id);

    expect(response).toEqual(expected);
    expect(response.id).toEqual(expected.id);
  });

  it('should fetch similar films by filmId and return it', async () => {
    const films = getFakeServerFilms();
    const film = films[0];
    const expected = films.map(adaptFilmToClient);

    mockApi
      .onGet(BackendRoute.Similar(film.id))
      .reply(200, films);

    const response = await fetchRelatedFilms(film.id);

    expect(response).toEqual(expected);
  });

  it('should fetch favorite films by user token and return it', async () => {
    const films = getFakeServerFilms();
    const expected = films.map(adaptFilmToClient);

    mockApi
      .onGet(BackendRoute.Favorite)
      .reply(200, films);

    const response = await fetchFavorites();

    expect(response).toEqual(expected);
  });

  it('should fetch comments by filmId and return it', async () => {
    const reviews = getFakeReviews();
    const film = getFakeFilm();
    const expected = reviews.slice();

    mockApi
      .onGet(BackendRoute.Comments(film.id))
      .reply(200, reviews);

    const response = await fetchComments(film.id);

    expect(response).toEqual(expected);
  });

  it('should post comment by filmId and return processed comment', async () => {
    const review = getFakeReview();
    const reviewForm: ReviewForm = {
      comment: review.comment,
      rating: review.rating,
    };
    const film = getFakeFilm();
    const expected = { ...review };

    mockApi
      .onPost(BackendRoute.Comments(film.id))
      .reply(201, review);

    const response = await postComment(film.id, reviewForm);

    expect(response).toEqual(expected);
  });
});