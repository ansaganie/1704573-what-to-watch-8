import React, { useState } from 'react';
import SmallFilmCard from '../small-film-card/small-film-card';
import { Film } from '../../types/film';

type FilmsListProps = {
  films: Film[],
}

function FilmsList({ films }: FilmsListProps): JSX.Element {

  const [ , setActiveFilm ] = useState('');

  const onSmallFilmCardHover = (evt: React.MouseEvent) => {
    setActiveFilm(evt.currentTarget.id);
  };

  return (
    <div className="catalog__films-list">
      {
        films.map((film) => (
          <SmallFilmCard
            {...film}
            onMouseOver={onSmallFilmCardHover}
            key={film.id}
          />))
      }
    </div>
  );
}

export default FilmsList;
