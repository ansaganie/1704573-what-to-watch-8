import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../types/film';

type SmallFilmCardProps = Film & {
  onMouseOver: (evt: React.MouseEvent) => void,
}

function SmallFilmCard(props: SmallFilmCardProps): JSX.Element {
  const { previewImage, name, id } = props;

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={props.onMouseOver}
      id={id}
    >
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
