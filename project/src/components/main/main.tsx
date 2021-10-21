import React from 'react';
import { Film } from '../../types/film';
import FilmCard from '../film-card/film-card';
import Footer from '../footer/footer';
import FilmsList from '../films-list/films-list';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';


const mapStateToProps = (state: State) => ({
  films: state.films,
  promoFilm: state.promoFilm,
});

const connector = connect(mapStateToProps);

type MainProps = ConnectedProps<typeof connector> & {
  promoFilm: Film,
}

function Main(props: MainProps): JSX.Element {
  const { films, promoFilm } = props;

  return (
    <React.Fragment>
      <FilmCard {...promoFilm}/>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href="#" className="catalog__genres-link">All genres</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Comedies</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Crime</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Documentary</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Dramas</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Horror</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Kids & Family</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Romance</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Sci-Fi</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Thrillers</a>
            </li>
          </ul>

          <FilmsList films={films} />

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
