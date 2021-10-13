import React, { useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import Header from '../header/header';
import { scrollToFilmTitle } from '../../utils/side-effects';
import { films } from '../../mock/films';

function AddReview(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  useEffect(scrollToFilmTitle);
  const film = films.find((elem) => id === elem.id);

  if (!film) {
    return <Redirect to={'/'}/>;
  }

  const { posterImage, backgroundImage, name, rating } = film;
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

  const ratingElement: JSX.Element[] = [];

  for (let i = 10; i >= 1; i--) {
    const checked = i === Math.round(rating);

    ratingElement.push(
      <React.Fragment>
        <input className="rating__input" id={`star-${i}`} type="radio" name="rating" value={i} checked={checked}/>
        <label className="rating__label" htmlFor={`star-${i}`}>Rating {i}</label>
      </React.Fragment>,
    );
  }

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
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {ratingElement}
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
}

export default AddReview;
