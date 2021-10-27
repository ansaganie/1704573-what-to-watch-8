import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { Film } from '../../types/film';
import { AsyncDispatch } from '../../types/action';
import { scrollToFilmTitle } from '../../utils/side-effects';
import { fetchFilm } from '../../services/dal';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmTabs from '../../components/film-tabs/film-tabs';
import NotFound from '../not-found/not-found';
import RelatedFilms from '../../components/related-films';
import Spinner from '../../components/spinner/Spinner';


const mapStateToProps = (state: State) => ({
  films: state.films,
});

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  getFilm(id: string) {
    return dispatch(fetchFilm(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type FilmPageProps = ConnectedProps<typeof connector>;

function FilmPage(props: FilmPageProps): JSX.Element {
  const { films, getFilm } = props;

  const { id } = useParams<{ id: string }>();
  useEffect(scrollToFilmTitle, []);
  const [ film, setFilm ] = useState<Film>();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const result = films.find((item) => +item.id === +id);

    if (result) {
      setFilm(result);
      setIsLoading(false);
      return;
    }

    getFilm(id)
      .then((data) => {
        setFilm(data);
        setIsLoading(false);
      });
  }, [ film, films, getFilm, id ]);

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
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"/>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>
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
