import React from 'react';
import { Film } from '../../types/film';

function SmallFilmCard(props: Film): JSX.Element {
  const { previewImage, name, id } = props;
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={`/films/${id}`}>{name}</a>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
