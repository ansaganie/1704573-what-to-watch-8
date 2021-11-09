import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../store/reducer';
import { scrollToFilmTitle } from '../../utils/side-effects';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmTabs from '../../components/film-tabs/film-tabs';
import NotFound from '../not-found/not-found';
import RelatedFilms from '../../components/related-films/related-films';
import Spinner from '../../components/spinner/Spinner';
import { AuthStatus } from '../../constants';
import { useLoadFilm } from '../../hooks/films';
import PlayButton from '../../components/play-button/play-button';
import MyListButton from '../../components/my-list-button/my-list-button';


const mapStateToProps = (state: State) => ({
  films: state.data.films,
  authStatus: state.user.authStatus,
});

const connector = connect(mapStateToProps);

type FilmPageProps = ConnectedProps<typeof connector>;

function FilmPage(props: FilmPageProps): JSX.Element {
  const { films, authStatus } = props;
  const isAuthorized = authStatus === AuthStatus.Auth;

  const { id } = useParams<{ id: string }>();
  const { isFilmLoading, film  } = useLoadFilm(+id, films);

  useEffect(scrollToFilmTitle, [ id ]);

  if (isFilmLoading) {
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
    isFavorite,
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
                <PlayButton filmId={+id}/>
                {
                  isAuthorized &&
                  <MyListButton
                    isFavorite={isFavorite}
                    filmId={+id}
                  />
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
        <RelatedFilms filmId={+id}/>
        <Footer/>
      </div>
    </React.Fragment>
  );
}

export { FilmPage };
export default connector(FilmPage);
