import { useEffect, useState } from 'react';
import { fetchFilm } from '../services/dal';
import { Film } from '../types/film';

type UseFilmLoad = {
  isFilmLoading: boolean,
  film: Film | null,
}

const useLoadFilm = (filmId: string, films: Film[]): UseFilmLoad => {
  const [ isFilmLoading, setIsFilmLoading ] = useState(true);
  const [ film, setFilm ] = useState<Film | null>(null);

  useEffect(() => {
    if (filmId) {
      const result = films.find((item) => item.id === filmId);

      if (result) {
        setFilm(result);
        setIsFilmLoading(false);
      } else {
        fetchFilm(filmId)
          .then((data) => {
            setFilm(data);
          })
          .finally(() => {
            setIsFilmLoading(false);
          });
      }
    }
  }, [ films, filmId ]);

  return { isFilmLoading, film };
};

export { useLoadFilm };
