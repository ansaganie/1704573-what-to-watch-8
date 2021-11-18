import { renderHook } from '@testing-library/react-hooks';
import * as redux from 'react-redux';
import { getFilms } from '../store/data/data-selectors';
import { getNotFoundFilmId, getIsFilmLoading } from '../store/film/film-selectors';
import { getFakeFilms } from '../utils/mock';
import useLoadFilm from './use-load-film';

const TEST_FILM_ID = 5;

describe('Hook: useLoadFilm', () => {
  it('should return array with 3 elements', () => {
    const films = getFakeFilms();
    const expectedFilm = films[TEST_FILM_ID];
    const dispatch = jest.fn();
    const useSelector = jest.spyOn(redux, 'useSelector');
    useSelector.mockImplementation((callback) => {
      if (callback === getIsFilmLoading) {
        return false;
      }

      if (callback === getFilms) {
        return films;
      }

      if (callback === getNotFoundFilmId) {
        return 'false';
      }
    });

    jest.spyOn(redux, 'useDispatch')
      .mockImplementation(() => dispatch);

    const { result } = renderHook(() =>
      useLoadFilm(expectedFilm.id),
    );

    const [ film, isFilmLoading ] = result.current;

    expect(film?.id).toEqual(expectedFilm.id);
    expect(isFilmLoading).toEqual(false);
  });
});
