import React from 'react';
import PromoFilm from '../../components/promo-film/promo-film';
import Footer from '../../components/footer/footer';
import Catalog from '../../components/catalog/catalog';

function Main(): JSX.Element {
  return (
    <React.Fragment>
      <PromoFilm/>
      <div className="page-content">
        <Catalog/>
        <Footer/>
      </div>
    </React.Fragment>
  );
}

export default Main;
