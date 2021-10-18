import React, { useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import { Film } from '../../types/film';
import FilmsList from '../films-list/films-list';
import Sprite from '../sprite/sprite';
import { films } from '../../mock/films';
import { scrollToFilmTitle } from '../../utils/side-effects';
import { AppRoute } from '../../constants';

type MoviePageProps = {
  relatedFilms?: Film[],
}

function FilmPage(props: MoviePageProps): JSX.Element {
  const { relatedFilms } = props;
  const { id } = useParams<{id: string}>();
  useEffect(scrollToFilmTitle);
  const film = films.find((elem) => id === elem.id);

  if (!film) {
    return <Redirect to={AppRoute.Main}/>;
  }

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <Sprite/>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header />
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"/>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film.posterImage}
                alt={`${film.name} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a href="#" className="film-nav__link">Overview</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Details</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <div className="film-rating">
                <div className="film-rating__score">{film.rating}</div>
                <p className="film-rating__meta">
                  <span className="film-rating__level">Very good</span>
                  <span className="film-rating__count">{film.scoresCount} ratings</span>
                </p>
              </div>

              <div className="film-card__text">

                {film.description.map((desc) => <p key={desc.slice(0, 6)}>{desc}</p>)}

                <p className="film-card__director"><strong>Director: {film.director}</strong></p>
                <p className="film-card__starring">
                  <strong>
                    Starring: {film.starring?.join(', ')} and other
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        {
          relatedFilms
            ? (
              <section className="catalog catalog--like-this">
                <h2 className="catalog__title">More like this</h2>

                <FilmsList films={relatedFilms}/>
              </section>
            )
            : ''
        }

        <Footer/>

      </div>
    </React.Fragment>
  );
}

export default FilmPage;
