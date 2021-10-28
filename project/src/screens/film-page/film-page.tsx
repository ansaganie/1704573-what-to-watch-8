import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { scrollToFilmTitle } from '../../utils/side-effects';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmTabs from '../../components/film-tabs/film-tabs';
import NotFound from '../not-found/not-found';
import RelatedFilms from '../../components/related-films/related-films';
import Spinner from '../../components/spinner/Spinner';
import { AuthStatus } from '../../constants';
import { useLoadFilm } from '../../hooks/films';


const mapStateToProps = (state: State) => ({
  films: state.films,
  authStatus: state.authStatus,
});

const connector = connect(mapStateToProps);

type FilmPageProps = ConnectedProps<typeof connector>;

function FilmPage(props: FilmPageProps): JSX.Element {
  const { films, authStatus } = props;
  const isAuthorized = authStatus === AuthStatus.Auth;

  const { id } = useParams<{ id: string }>();
  const { isLoading, film  } = useLoadFilm(id, films);

  useEffect(scrollToFilmTitle, [ id ]);

  if (isLoading) {
    return (
      <Spinner/>
    );
  }

  if (!film) {
    return (
      <NotFound/>
    );
  }

  const {
    backgroundImage,
    name,
    genre,
    released,
    posterImage,
  } = film;

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name}/>
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header/>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>
                {
                  isAuthorized &&
                  <button className="btn btn--list film-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"/>
                    </svg>
                    <span>My list</span>
                  </button>
                }
                { isAuthorized && <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={posterImage}
                alt={`${name} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <FilmTabs film={film}/>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <RelatedFilms filmId={id}/>
        <Footer/>
      </div>
    </React.Fragment>
  );
}

export { FilmPage };
export default connector(FilmPage);
