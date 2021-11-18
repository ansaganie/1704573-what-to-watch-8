import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../constants';
import useLoadFilm from '../../hooks/use-load-film';
import useScrollToTitle from '../../hooks/use-scroll-to-title';
import Header from '../../components/header/header';
import ReviewForm from './components/review-form/review-form';
import NotFound from '../not-found/not-found';
import Spinner from '../../UI/spinner/Spinner';

function AddReview(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  useScrollToTitle(id);

  const [ film, isFilmLoading ] = useLoadFilm(id);

  if (isFilmLoading) {
    return (
      <Spinner fullScreen/>
    );
  }

  if (!film) {
    return <NotFound/>;
  }

  const { posterImage, backgroundImage, name, rating } = film;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header filmCard>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.getFilmsLink(id)} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link">Add review</span>
              </li>
            </ul>
          </nav>
        </Header>
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
        <ReviewForm rating={rating} filmId={id}/>
      </div>
    </section>
  );
}

export default AddReview;
