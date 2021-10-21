import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import FilmsList from '../films-list/films-list';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { createSelector } from 'reselect';

const getFilms = (state:State) => state.films;

const getFavoriteFilms = createSelector(
  [getFilms],
  (films) => films.filter((film) => film.isFavorite),
);

const mapStateToProps = (state: State) => ({
  myList: getFavoriteFilms(state),
});

const connector = connect(mapStateToProps);

type MyListProps = ConnectedProps<typeof connector>

function MyList(props: MyListProps): JSX.Element {
  const { myList } = props;

  return (
    <div className="user-page">
      <Header title={'My list'}/>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList films={myList}/>
      </section>
      <Footer/>
    </div>
  );
}

export default connector(MyList);
