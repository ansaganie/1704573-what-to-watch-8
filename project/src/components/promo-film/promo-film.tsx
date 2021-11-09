import React, { useEffect } from 'react';
import Header from '../header/header';
import { State } from '../../store/reducer';
import { AsyncDispatch } from '../../types/action';
import { fetchPromoFilm } from '../../store/data/thunks';
import { connect, ConnectedProps } from 'react-redux';
import Spinner from '../spinner/Spinner';
import { setPromoFilm, setPromoFilmLoaded } from '../../store/action';
import { AuthStatus } from '../../constants';
import PlayButton from '../play-button/play-button';
import MyListButton from '../my-list-button/my-list-button';

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
  setFilm: setPromoFilm,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PromoFilmProps = ConnectedProps<typeof connector>;

function PromoFilm(props: PromoFilmProps): JSX.Element {
  const {
    promoFilm,
    isPromoFilmLoading,
    downloadPromoFilm,
    authStatus,
    setFilm,
  } = props;

  const isAuthorized = authStatus === AuthStatus.Auth;

  useEffect(() => {
    if (!promoFilm) {
      downloadPromoFilm();
    }
  }, [ downloadPromoFilm, promoFilm ]);

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

  const {
    posterImage,
    backgroundImage,
    name,
    released,
    genre,
    id,
    isFavorite,
  } = promoFilm;

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
              <PlayButton filmId={id}/>
              {
                isAuthorized &&
                <MyListButton
                  setFilm={setFilm}
                  filmId={id}
                  isFavorite={isFavorite}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { PromoFilm as FilmCard };
export default connector(PromoFilm);
