import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Film } from '../types/film';
import { getFilms } from '../store/data/data-selectors';
import { getIsFilmLoading } from '../store/film/film-selectors';
import { fetchFilm } from '../store/film/film-thunks';
import { fetchPromoFilm } from '../store/data/data-thunks';

type UseFilmLoad = [ film: Film | null, isFilmLoading: boolean];

const useLoadFilm = (
  filmId: string,
  isPromoFilm?: boolean,
): UseFilmLoad => {
  const dispatch = useDispatch();
  const [ film, setFilm ] = useState<Film | null>(null);
  const isFilmLoading = useSelector(getIsFilmLoading);
  const films = useSelector(getFilms);

  useEffect(() => {
    const result = films.find((item) => item.id === filmId);

    if (result) {
      setFilm(result);
    }
  }, [filmId, films]);

  useEffect(() => {
    if (!film && !isPromoFilm) {
      dispatch(fetchFilm(filmId));
    }

    if (!film && isPromoFilm) {
      dispatch(fetchPromoFilm());
    }
  }, [film, filmId, dispatch, isPromoFilm]);

  return [ film, isFilmLoading ];
};

export { useLoadFilm };
