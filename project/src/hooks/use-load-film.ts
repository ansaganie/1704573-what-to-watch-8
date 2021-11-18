import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Film } from '../types/film';
import { getFilms } from '../store/data/data-selectors';
import { getNotFoundFilmId, getIsFilmLoading } from '../store/film/film-selectors';
import { fetchFilm } from '../store/film/film-thunks';
import { fetchPromoFilm } from '../store/data/data-thunks';

type UseFilmLoad = [ film: Film | null, loading: boolean];

const useLoadFilm = (filmId: string, isPromoFilm?: boolean): UseFilmLoad => {
  const [ film, setFilm ] = useState<Film | null>(null);
  const [ notFound, setNotFound ] = useState(false);

  const dispatch = useDispatch();
  const isFilmLoading = useSelector(getIsFilmLoading);
  const films = useSelector(getFilms);
  const notFoundFilmId = useSelector(getNotFoundFilmId);

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

  useEffect(() => {
    if (filmId === notFoundFilmId) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [filmId, notFoundFilmId]);

  return [ film, ((!notFound && !film) || isFilmLoading) ];
};

export default useLoadFilm;
