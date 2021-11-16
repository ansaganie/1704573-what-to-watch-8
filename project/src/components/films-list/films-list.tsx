import React from 'react';
import { Film } from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmsListProps = {
  films: Film[],
}

function FilmsList({ films }: FilmsListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {
        films.map((film) => (
          <FilmCard
            film={film}
            key={film.id}
          />
        ))
      }
    </div>
  );
}

export default FilmsList;
