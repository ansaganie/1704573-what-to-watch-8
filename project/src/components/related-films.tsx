import React, { useState } from 'react';
import FilmsList from './films-list/films-list';

type RelatedFilmsProps = {
  filmId: string,
}

function RelatedFilms(props: RelatedFilmsProps): JSX.Element {
  const { filmId } = props;

  const [ films, setFilms ] = useState([]);

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <FilmsList films={films}/>
    </section>
  );
}

export default RelatedFilms;
