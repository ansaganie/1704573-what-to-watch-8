import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { BackendRoute } from '../constants';
import { adaptFilmToClient } from '../services/adapter';
import { api } from '../store/store';
import { getFakeFilms, getFakeServerFilm } from '../utils/mock';
import { useLoadFilm } from './use-load-film';

describe('Hook: useLoadFilm', () => {
  let mockApi: MockAdapter;

  beforeAll(() => {
    mockApi = new MockAdapter(api);
  });

  afterEach(() => {
    mockApi.reset();
  });

  it('should return film from an given array', () => {
    const films = getFakeFilms();
    const expected = films[5];
    const setIsFilmLoading = jest.fn();

    const { result } = renderHook(() =>
      useLoadFilm(expected.id, films, setIsFilmLoading));

    const { film } = result.current;

    expect(film).toEqual(expected);
    expect(setIsFilmLoading).toBeCalled();
  });

  it('should return fetched film if could not find in array', () => {
    const setIsFilmLoading = jest.fn();
    const fakeFilm = getFakeServerFilm();
    const expected = adaptFilmToClient(fakeFilm);

    mockApi
      .onGet(BackendRoute.Film(expected.id))
      .reply(200, fakeFilm);

    const { result } = renderHook(() =>
      useLoadFilm(fakeFilm.id, [], setIsFilmLoading));

    const { film } = result.current;

    expect(film).toEqual(expected);
    expect(setIsFilmLoading).toBeCalled();
    expect(setIsFilmLoading).toBeCalledTimes(2);
  });
});
