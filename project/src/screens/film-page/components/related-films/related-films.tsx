import React, { useEffect, useState } from 'react';
import FilmsList from '../../../../components/films-list/films-list';
import { Film } from '../../../../types/film';
import Spinner from '../../../../components/spinner/Spinner';
import { fetchRelatedFilms } from '../../../../services/dal';

const MAX_RELATED_FILMS_COUNT = 4;

type RelatedFilmsProps = {
  filmId: string,
}

function RelatedFilms(props: RelatedFilmsProps): JSX.Element {
  const { filmId } = props;

  const [ films, setFilms ] = useState<Film[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    fetchRelatedFilms(filmId)
      .then((data) => {
        data && setFilms(data);
        setIsLoading(false);
      });
  }, [ filmId ]);

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
