import React from 'react';
import Header from '../header/header';
import { Film } from '../../types/film';
import Footer from '../footer/footer';
import FilmsList from '../films-list/films-list';

type MyListProps = {
  myList: Film[],
}

function MyList({ myList }: MyListProps): JSX.Element {
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

export default MyList;
