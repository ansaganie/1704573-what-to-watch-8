import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { api, State } from '../../store/store';
import { Action } from 'redux';
import { BackendRoute } from '../../constants';
import { getFakeServerFilm, getFakeServerFilms } from '../../utils/mock';
import { adaptFilmToClient } from '../../services/adapter';
import { fetchFilms, fetchPromoFilm, postToggleFavorite } from './data-thunks';
import { setFilms, setFilmsLoaded, setPromoFilmId, updateFilm } from './data-actions';
import { setIsFilmLoading, setMyListButtonDisabled } from '../film/film-actions';


describe('Data thunks', () => {
  const mockApi = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middleware);

  it('should fetch and save films into store', async () => {
    const films = getFakeServerFilms();
    const store = mockStore();
    mockApi.onGet(BackendRoute.Films).reply(200, films.slice());

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFilms());

    expect(store.getActions()).toEqual([
      setFilms(films.map(adaptFilmToClient)),
      setFilmsLoaded(),
    ]);
  });

  it('should fetch and save promo film into store', async () => {
    const film = getFakeServerFilm();
    const store = mockStore({
      data: {
        promoFilmId: '',
      },
    });
    mockApi.onGet(BackendRoute.PromoFilm).reply(200, film);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchPromoFilm());

    expect(store.getActions()).toEqual([
      setIsFilmLoading(true),
      setPromoFilmId(film.id.toString()),
      setIsFilmLoading(false),
    ]);
  });

  it('should post toggle favorite, and update film inside store', async () => {
    const films = getFakeServerFilms();
    const film = films[0];
    const changedStatus = !film['is_favorite'];
    const status = Number(changedStatus);
    const store = mockStore({
      data: {
        films: films.map(adaptFilmToClient),
      },
    });
    mockApi.onPost(BackendRoute.getFavoriteLink(film.id, status)).reply(200, {
      ...film,
      'is_favorite': changedStatus,
    });

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postToggleFavorite(
      film.id,
      status,
    ));

    expect(store.getActions()).toEqual([
      setMyListButtonDisabled(true),
      updateFilm({
        ...adaptFilmToClient(film),
        isFavorite: changedStatus,
      }),
      setMyListButtonDisabled(false),
    ]);
  });
});
