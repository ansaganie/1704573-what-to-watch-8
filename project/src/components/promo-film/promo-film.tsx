import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../store/store';
import { AuthStatus } from '../../constants';
import useLoadFilm from '../../hooks/use-load-film';
import Header from '../header/header';
import Spinner from '../spinner/Spinner';
import PlayButton from '../play-button/play-button';
import MyListButton from '../my-list-button/my-list-button';

const mapStateToProps = (state: State) => ({
  promoFilmId: state.data.promoFilmId,
  authStatus: state.user.authStatus,
});

const connector = connect(mapStateToProps);

type PromoFilmProps = ConnectedProps<typeof connector>;

function PromoFilm(props: PromoFilmProps): JSX.Element {
  const {
    promoFilmId,
    authStatus,
  } = props;

  const [ film, isFilmLoading ] = useLoadFilm(promoFilmId, true);
  const isAuthorized = authStatus === AuthStatus.Auth;
  let background: JSX.Element | null = null;
  let promoCard: JSX.Element | null = null;

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
      <Header filmCard/>
      { isFilmLoading && <Spinner/> }
      {promoCard}
    </section>
  );
}

export { PromoFilm };
export default connector(PromoFilm);
