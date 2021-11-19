import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { api, State } from '../store';
import { Action } from 'redux';
import { BackendRoute } from '../../constants';
import { getFakeReviews, getFakeServerFilm } from '../../utils/mock';
import { adaptFilmToClient, adaptReviewToClient } from '../../services/adapter';
import { fetchFilm, fetchReviews } from './film-thunks';
import { setIsFilmLoading, setIsReviewsLoading, setReviews } from './film-actions';
import { addFilm } from '../data/data-actions';


describe('Data thunks', () => {
  const mockApi = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middleware);

  it('should fetch and save the film into store', async () => {
    const film = getFakeServerFilm();
    const store = mockStore();
    mockApi
      .onGet(BackendRoute.getFilmsLink(film.id))
      .reply(200, { ...film });

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFilm(film.id));

    expect(store.getActions()).toEqual([
      setIsFilmLoading(true),
      addFilm(adaptFilmToClient(film)),
      setIsFilmLoading(false),
    ]);
  });

  it('should fetch and save reviews into store by film id', async () => {
    const film = getFakeServerFilm();
    const reviews = getFakeReviews();
    const store = mockStore({
      film: {
        reviews: {},
      },
    });

    mockApi
      .onGet(BackendRoute.getReviewsLink(film.id))
      .reply(200, reviews);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchReviews(film.id));

    expect(store.getActions()).toEqual([
      setIsReviewsLoading(true),
      setReviews(film.id, reviews.map(adaptReviewToClient)),
      setIsReviewsLoading(false),
    ]);
  });
});
