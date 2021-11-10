import { useEffect, useState } from 'react';
import { fetchFilm } from '../services/dal';
import { Film } from '../types/film';

type UseFilmLoad = {
  film: Film | null,
}

const useLoadFilm = (
  filmId: string,
  films: Film[],
  setIsFilmLoading: (value: boolean) => void,
): UseFilmLoad => {
  const [ film, setFilm ] = useState<Film | null>(null);

  useEffect(() => {
    if (filmId) {
      setIsFilmLoading(true);
      const result = films.find((item) => item.id === filmId);
      if (result) {
        setFilm(result);
        setIsFilmLoading(false);
      } else {
        setIsFilmLoading(true);
        fetchFilm(filmId)
          .then((data) => {
            setFilm(data);
          })
          .finally(() => {
            setIsFilmLoading(false);
          });
      }
    }
  }, [ films, filmId, setIsFilmLoading ]);

  return { film };
};

export { useLoadFilm };
