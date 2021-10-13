import React, { useState } from 'react';
import SmallFilmCard from '../small-film-card/small-film-card';
import { Film } from '../../types/film';

type FilmsListProps = {
  films: Film[],
}

function FilmsList({ films }: FilmsListProps): JSX.Element {

  const [ activeFilm, setActiveFilm ] = useState(films[0].id);

  return (
    <div className="catalog__films-list">
      {films.map((film) => <SmallFilmCard {...film} key={film.id}/>)}
    </div>
  );
}

export default FilmsList;
