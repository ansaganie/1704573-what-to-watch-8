import React, { useState } from 'react';
import SmallFilmCard from '../small-film-card/small-film-card';
import { Film } from '../../types/film';

type FilmsListProps = {
  films: Film[],
}

function FilmsList({ films }: FilmsListProps): JSX.Element {

  const [ activeFilm, setActiveFilm ] = useState('');

  const onSmallFilmCardHover = (evt: React.MouseEvent) => {
    setActiveFilm(evt.currentTarget.id);
  };

  const onSmallFilmCardLeave = () => {
    setActiveFilm('');
  };

  return (
    <div className="catalog__films-list">
      {
        films.map((film) => (
          <SmallFilmCard
            film={film}
            onMouseOver={onSmallFilmCardHover}
            onMouseLeave={onSmallFilmCardLeave}
            isActive={film.id === activeFilm}
            key={film.id}
          />))
      }
    </div>
  );
}

export default FilmsList;
