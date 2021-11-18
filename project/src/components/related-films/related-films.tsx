import React, { useEffect, useState } from 'react';
import { Film, FilmId } from '../../types/film';
import { fetchRelatedFilms } from '../../services/dal';
import FilmsList from '../films-list/films-list';
import Spinner from '../spinner/Spinner';

const MAX_RELATED_FILMS_COUNT = 4;

type RelatedFilmsProps = {
  filmId: FilmId,
}

function RelatedFilms(props: RelatedFilmsProps): JSX.Element | null {
  const { filmId } = props;

  const [ films, setFilms ] = useState<Film[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    fetchRelatedFilms(filmId)
      .then((data) => {
        data && setFilms(data.filter(({ id }) => id !== filmId));
        setIsLoading(false);
      });
  }, [ filmId ]);

  if (!isLoading && (!films || films.length === 0)) {
    return null;
  }

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      {
        isLoading ? <Spinner/>
          : <FilmsList films={films.slice(0, MAX_RELATED_FILMS_COUNT)}/>
      }
    </section>
  );
}

export default RelatedFilms;
