import React, { useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import Header from '../header/header';
import { scrollToFilmTitle } from '../../utils/side-effects';
import { films } from '../../mock/films';
import ReviewForm from '../review-form/review-form';
import { AppRoute } from '../../constants';

function AddReview(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  useEffect(scrollToFilmTitle);
  const film = films.find((elem) => id === elem.id);

  if (!film) {
    return <Redirect to={AppRoute.Main}/>;
  }

  const { posterImage, backgroundImage, name } = film;
  const breadcrumbsElement = (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <span className="breadcrumbs__link">Add review</span>
        </li>
      </ul>
    </nav>
  );

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt="The Grand Budapest Hotel"/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header breadcrumbs={breadcrumbsElement}/>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={posterImage}
            alt={`${name} poster`}
            width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm/>
      </div>
    </section>
  );
}

export default AddReview;
