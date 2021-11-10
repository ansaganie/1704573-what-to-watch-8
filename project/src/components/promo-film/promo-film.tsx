import React, { useEffect } from 'react';
import Header from '../header/header';
import { State } from '../../store/reducer';
import { AsyncDispatch } from '../../types/action';
import { fetchPromoFilm } from '../../store/data/data-thunks';
import { connect, ConnectedProps } from 'react-redux';
import Spinner from '../spinner/Spinner';
import { AuthStatus } from '../../constants';
import PlayButton from '../play-button/play-button';
import MyListButton from '../my-list-button/my-list-button';
import { useLoadFilm } from '../../hooks/films';

const mapStateToProps = (state: State) => ({
  promoFilmId: state.data.promoFilmId,
  films: state.data.films,
  isPromoFilmLoading: state.data.isPromoFilmLoading,
  authStatus: state.user.authStatus,
});

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  loadPromoFilm() {
    dispatch(fetchPromoFilm());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PromoFilmProps = ConnectedProps<typeof connector>;

function PromoFilm(props: PromoFilmProps): JSX.Element {
  const {
    promoFilmId,
    films,
    isPromoFilmLoading,
    loadPromoFilm,
    authStatus,
  } = props;

  useEffect(() => {
    loadPromoFilm();
  }, [loadPromoFilm]);

  const isAuthorized = authStatus === AuthStatus.Auth;
  const { isFilmLoading, film } = useLoadFilm(promoFilmId, films);

  if (isPromoFilmLoading || isFilmLoading) {
    return (
      <Spinner/>
    );
  }

  if (!film) {
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
  } = film;

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
