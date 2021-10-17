import React, { Fragment } from 'react';
import { formatRating, getFilmRatingDescription } from '../../utils/film';
import { FilmProps } from '../../types/film-props';

function Overview(props: FilmProps): JSX.Element {
  const { rating, scoresCount, description, director, starring } = props.film;

  return (
    <Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{formatRating(rating)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getFilmRatingDescription(rating)}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">

        {description.map((desc) => <p key={desc.slice(0, 6)}>{desc}</p>)}

        <p className="film-card__director"><strong>Director: {director}</strong></p>
        <p className="film-card__starring">
          <strong>
            Starring: {starring?.join(', ')} and other
          </strong>
        </p>
      </div>
    </Fragment>
  );
}

export default Overview;
