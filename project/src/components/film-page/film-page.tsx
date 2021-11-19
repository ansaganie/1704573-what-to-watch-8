import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../store/store';
import { AppRoute, AuthStatus } from '../../constants';
import { getAuthStatus } from '../../store/user/user-selectors';
import { FilmId } from '../../types/film';
import useLoadFilm from '../../hooks/use-load-film';
import Header from '../header/header';
import Footer from '../footer/footer';
import FilmTabs from '../film-tabs/film-tabs';
import NotFound from '../not-found-screen/not-found-screen';
import RelatedFilms from '../related-films/related-films';
import Spinner from '../spinner/Spinner';
import PlayButton from '../play-button/play-button';
import MyListButton from '../my-list-button/my-list-button';
import useScrollToTitle from '../../hooks/use-scroll-to-title';
import BackgroundImage from '../background-image/background-image';


const mapStateToProps = (state: State) => ({
  authStatus: getAuthStatus(state),
});

const connector = connect(mapStateToProps);

type FilmPageProps = ConnectedProps<typeof connector>;

function FilmPage({ authStatus }: FilmPageProps): JSX.Element {
  const isAuthorized = authStatus === AuthStatus.Auth;
  const { id: filmId } = useParams<{ id: FilmId }>();
  const [ film, isFilmLoading ] = useLoadFilm(filmId);

  useScrollToTitle(filmId);

  if (isFilmLoading) {
    return (
      <Spinner fullScreen/>
    );
  }

  if (!film) {
    return <NotFound/>;
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
          <BackgroundImage backgroundImage={backgroundImage} alt={name}/>
          <h1 className="visually-hidden">WTW</h1>
          <Header filmCard/>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>
              <div className="film-card__buttons">
                <PlayButton filmId={filmId}/>
                {
                  isAuthorized && (
                    <>
                      <MyListButton
                        isFavorite={isFavorite}
                        filmId={filmId}
                      />
                      <Link
                        to={AppRoute.getAddReviewLink(filmId)}
                        className="btn film-card__button"
                      >
                        Add review
                      </Link>
                    </>
                  )
                }
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
            <FilmTabs film={film}/>
          </div>
        </div>
      </section>
      <div className="page-content">
        <RelatedFilms filmId={filmId}/>
        <Footer/>
      </div>
    </React.Fragment>
  );
}

export { FilmPage };
export default connector(FilmPage);
