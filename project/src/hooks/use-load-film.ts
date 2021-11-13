import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Film } from '../types/film';
import { getFilms } from '../store/data/data-selectors';
import { setFilmInFocus } from '../store/film/film-actions';
import { getFilmInFocus, getIsFilmLoading } from '../store/film/film-selectors';
import { fetchFilm } from '../store/film/film-thunks';

type UseFilmLoad = [ film: Film | null, isFilmLoading: boolean];

const useLoadFilm = (
  filmId: string,
): UseFilmLoad => {
  const dispatch = useDispatch();
  const film = useSelector(getFilmInFocus);
  const isFilmLoading = useSelector(getIsFilmLoading);
  const films = useSelector(getFilms);

  useEffect(() => {
    const result = films.find((item) => item.id === filmId);
    if (result) {
      dispatch(setFilmInFocus(result));
    } else {
      dispatch(fetchFilm(filmId));
    }
  }, [dispatch, film, filmId, films]);

  return [ film, isFilmLoading ];
};

export { useLoadFilm };
