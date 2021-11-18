import React from 'react';
import PromoFilm from '../promo-film/promo-film';
import Footer from '../footer/footer';
import Catalog from '../catalog/catalog';

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
