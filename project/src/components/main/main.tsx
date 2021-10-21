import React, { Dispatch, useEffect } from 'react';
import FilmCard from '../film-card/film-card';
import Footer from '../footer/footer';
import FilmsList from '../films-list/films-list';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import Genres from '../genres/genres';
import { getCountedFilms } from '../../selectors/selectors';
import { Actions } from '../../types/action';
import { setShownFilmsCount } from '../../store/action';
import { FILMS_INITIAL_COUNT, FILMS_STEP } from '../../constants';

const mapStateToProps = (state: State) => ({
  films: getCountedFilms(state),
  promoFilm: state.promoFilm,
  count: state.shownFilmsCount,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  setCount(count: number) {
    dispatch(setShownFilmsCount(count));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type MainProps = ConnectedProps<typeof connector>;

function Main(props: MainProps): JSX.Element {
  const { films, promoFilm, setCount, count } = props;

  useEffect(() => {
    setCount(FILMS_INITIAL_COUNT);
  }, [ setCount ]);

  const handleShowMoreClick = () => {
    setCount(FILMS_STEP + count);
  };

  return (
    <React.Fragment>
      <FilmCard {...promoFilm}/>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <Genres/>
          <FilmsList films={films}/>
          {
            count <= films.length &&
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
