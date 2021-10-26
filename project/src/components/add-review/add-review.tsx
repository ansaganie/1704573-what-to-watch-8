import React, { useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import Header from '../header/header';
import { scrollToFilmTitle } from '../../utils/side-effects';
import ReviewForm from '../review-form/review-form';
import { AppRoute } from '../../constants';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: State) => ({
  films: state.films,
});

const connector = connect(mapStateToProps);

type AddReviewProps = ConnectedProps<typeof connector>;

function AddReview(props: AddReviewProps): JSX.Element {
  const { films } = props;

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

export { AddReview };
export default connector(AddReview);
