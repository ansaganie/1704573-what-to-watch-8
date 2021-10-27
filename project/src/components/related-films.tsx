import React, { useEffect, useState } from 'react';
import FilmsList from './films-list/films-list';
import { AsyncDispatch } from '../types/action';
import { fetchRelatedFilms } from '../services/dal';
import { connect, ConnectedProps } from 'react-redux';
import { Film } from '../types/film';
import Spinner from './spinner/Spinner';

const MAX_RELATED_FILMS_COUNT = 4;

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  getRelatedFilms(id: string) {
    return dispatch(fetchRelatedFilms(id));
  },
});

const connector = connect(null, mapDispatchToProps);

type RelatedFilmsProps = ConnectedProps<typeof connector> & {
  filmId: string,
}

function RelatedFilms(props: RelatedFilmsProps): JSX.Element {
  const { filmId, getRelatedFilms } = props;

  const [ films, setFilms ] = useState<Film[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    getRelatedFilms(filmId)
      .then((data) => {
        setFilms(data);
        setIsLoading(false);
      });
  }, [ getRelatedFilms, films, filmId ]);

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

export { RelatedFilms };
export default connector(RelatedFilms);
