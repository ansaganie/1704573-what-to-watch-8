import React, { useState } from 'react';
import FilmCard from '../../components/film-card/film-card';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import Genres from '../../components/genres/genres';
import { FILMS_INITIAL_COUNT, FILMS_STEP } from '../../constants';
import { getFilteredFilms } from '../../selectors/selectors';

const mapStateToProps = (state: State) => ({
  films: getFilteredFilms(state),
  promoFilm: state.promoFilm,
});

const connector = connect(mapStateToProps);

type MainProps = ConnectedProps<typeof connector>;

function Main(props: MainProps): JSX.Element {
  const { films, promoFilm } = props;
  const [ shownFilmsCount, setShownFilmsCount ] = useState<number>(FILMS_INITIAL_COUNT);

  const shownFilms = films.slice(0, shownFilmsCount);

  const handleShowMoreClick = () => {
    setShownFilmsCount((count) => FILMS_STEP + count);
  };

  const resetShownFilmsCount = () => {
    setShownFilmsCount(FILMS_INITIAL_COUNT);
  };

  return (
    <React.Fragment>
      <FilmCard film={promoFilm}/>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <Genres resetShownFilmsCount={resetShownFilmsCount}/>
          <FilmsList films={shownFilms}/>
          {
            shownFilmsCount <= shownFilms.length &&
            <div className="catalog__more">
              <button onClick={handleShowMoreClick} className="catalog__button" type="button">Show more</button>
            </div>
          }
        </section>
        <Footer/>
      </div>
    </React.Fragment>
  );
}

export default connector(Main);
