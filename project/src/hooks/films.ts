import { useEffect, useState } from 'react';
import { fetchFilm } from '../services/dal';
import { Film } from '../types/film';

type UseFilmLoad = {
  isLoading: boolean,
  film: Film | undefined,
}

const useLoadFilm = (id: string, films: Film[]): UseFilmLoad=> {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ film, setFilm ] = useState<Film>();

  useEffect(() => {
    const result = films.find((item) => +item.id === +id);

    if (result) {
      setFilm(result);
      setIsLoading(false);
      return;
    }

    fetchFilm(id)
      .then((data) => {
        setFilm(data);
        setIsLoading(false);
      });
  }, [ films, id ]);

  return { isLoading, film };
};

export { useLoadFilm };
