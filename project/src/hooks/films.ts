import { useEffect, useState } from 'react';
import { fetchFilm } from '../services/dal';
import { Film } from '../types/film';

type UseFilmLoad = {
  isLoading: boolean,
  film: Film | undefined,
  setFilm: (film: Film) => void,
}

const useLoadFilm = (id: string, films: Film[]): UseFilmLoad => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ film, setFilm ] = useState<Film>();

  useEffect(() => {
    const result = films.find((item) => +item.id === +id);

    if (result) {
      setFilm(() => result);
      setIsLoading(false);
    } else {
      fetchFilm(id)
        .then((data) => {
          setFilm(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [ films, id ]);

  return { isLoading, film, setFilm };
};

export { useLoadFilm };
