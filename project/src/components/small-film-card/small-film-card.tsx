import React from 'react';

type SmallFilmCardProps = {
  imgUrl: string,
  title: string,
  id: number,
};

const SmallFilmCard = ({imgUrl, title, id}: SmallFilmCardProps): JSX.Element => {
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
};

export default SmallFilmCard;
