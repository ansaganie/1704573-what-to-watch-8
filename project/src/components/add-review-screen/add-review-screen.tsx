import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { FilmId } from '../../types/film';
import useLoadFilm from '../../hooks/use-load-film';
import useScrollToTitle from '../../hooks/use-scroll-to-title';
import Header from '../header/header';
import ReviewForm from '../review-form/review-form';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Spinner from '../spinner/Spinner';
import BackgroundImage from '../background-image/background-image';

function AddReviewScreen(): JSX.Element {
  const { id: filmId } = useParams<{ id: FilmId }>();
  const [ film, isFilmLoading ] = useLoadFilm(filmId);
  useScrollToTitle(filmId);

  if (isFilmLoading) {
    return (
      <Spinner fullScreen/>
    );
  }

  if (!film) {
    return <NotFoundScreen/>;
  }

  const { posterImage, backgroundImage, name, rating } = film;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <BackgroundImage backgroundImage={backgroundImage} alt={name}/>
        <h1 className="visually-hidden">WTW</h1>
        <Header filmCard>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link
                  to={AppRoute.getFilmsLink(filmId)}
                  className="breadcrumbs__link"
                >
                  {name}
                </Link>
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
        <ReviewForm rating={rating} filmId={filmId}/>
      </div>
    </section>
  );
}

export default AddReviewScreen;
