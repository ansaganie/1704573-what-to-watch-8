import React from 'react';
import FilmCard from '../../components/film-card/film-card';
import Footer from '../../components/footer/footer';
import Catalog from '../../components/catalog/catalog';

function Main(): JSX.Element {
  return (
    <React.Fragment>
      <FilmCard/>
      <div className="page-content">
        <Catalog/>
        <Footer/>
      </div>
    </React.Fragment>
  );
}

export default Main;
