import React, { useEffect } from 'react';
import Header from '../header/header';
import { State } from '../../store/reducer';
import { AsyncDispatch } from '../../types/action';
import { fetchPromoFilm } from '../../store/thunks';
import { connect, ConnectedProps } from 'react-redux';
import Spinner from '../spinner/Spinner';
import { setPromoFilmLoaded } from '../../store/action';
import { AuthStatus } from '../../constants';

const mapStateToProps = (state: State) => ({
  promoFilm: state.data.promoFilm,
  isPromoFilmLoading: state.data.isPromoFilmLoading,
  authStatus: state.user.authStatus,
});

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  downloadPromoFilm: () => {
    dispatch(fetchPromoFilm())
      .finally(() => dispatch(setPromoFilmLoaded()));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type FilmCardProps = ConnectedProps<typeof connector>;

function FilmCard(props: FilmCardProps): JSX.Element {
  const {
    promoFilm,
    isPromoFilmLoading,
    downloadPromoFilm,
    authStatus,
  } = props;

  const isAuthorized = authStatus === AuthStatus.Auth;

  useEffect(() => {
    downloadPromoFilm();
  }, [ downloadPromoFilm ]);

  if (isPromoFilmLoading) {
    return (
      <Spinner/>
    );
  }

  if (!promoFilm) {
    return (
      <> </>
    );
  }

  const { posterImage, backgroundImage, name, released, genre } = promoFilm;

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name}/>
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <Header/>
      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img
              src={posterImage}
              alt={name}
              width="218"
              height="327"
            />
          </div>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { FilmCard };
export default connector(FilmCard);
