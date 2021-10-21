import React from 'react';
import FilmCard from '../film-card/film-card';
import Footer from '../footer/footer';
import FilmsList from '../films-list/films-list';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import Genres from '../genres/genres';
import { getFilteredFilms } from '../../selectors/selectors';

const mapStateToProps = (state: State) => ({
  films: getFilteredFilms(state),
  promoFilm: state.promoFilm,
});

const connector = connect(mapStateToProps);

type MainProps = ConnectedProps<typeof connector>;

function Main(props: MainProps): JSX.Element {
  const { films, promoFilm } = props;

  return (
    <React.Fragment>
      <FilmCard {...promoFilm}/>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <Genres/>
          <FilmsList films={films}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
}

export default connector(Main);
