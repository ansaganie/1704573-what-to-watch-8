import React from 'react';
import { Film } from '../../types/film';

type SmallFilmCardProps = {
  film: Film,
};

function SmallFilmCard(props: SmallFilmCardProps): JSX.Element {
  const { imgUrl, title, id } = props.film;
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={imgUrl} alt={title} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={`/films/${id}`}>{title}</a>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
