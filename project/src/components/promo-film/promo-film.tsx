import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useLoadFilm } from '../../hooks/films';
import { fetchPromoFilm } from '../../store/data/data-thunks';
import { State } from '../../store/reducer';
import { AsyncDispatch } from '../../types/action';
import { AuthStatus } from '../../constants';
import Header from '../header/header';
import Spinner from '../spinner/Spinner';
import PlayButton from '../play-button/play-button';
import MyListButton from '../my-list-button/my-list-button';

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
  const isAuthorized = authStatus === AuthStatus.Auth;
  let background: JSX.Element = <> </>;
  let promoCard: JSX.Element = <> </>;
  const [ isFilmLoading, setIsFilmLoading ] = useState(true);
  const { film } = useLoadFilm(promoFilmId, films, setIsFilmLoading);

  useEffect(() => {
    loadPromoFilm();
  }, [loadPromoFilm]);

  if (film) {
    const {
      posterImage,
      backgroundImage,
      name,
      released,
      genre,
      id,
      isFavorite,
    } = film;

    background = (
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name}/>
      </div>
    );

    promoCard = (
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
    );
  }

  return (
    <section
      className="film-card"
      style={{backgroundImage: 'linear-gradient(-180deg, #180202 100%, #000000 0%)'}}
    >
      {background}
      <h1 className="visually-hidden">WTW</h1>
      <Header/>
      { (isPromoFilmLoading || isFilmLoading) && <Spinner/> }
      {promoCard}
    </section>
  );
}

export { PromoFilm as FilmCard };
export default connector(PromoFilm);
