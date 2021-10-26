import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import styles from './not-found.module.css';

const cover = 'img/bg-the-grand-budapest-hotel.jpg';

function NotFound():JSX.Element {
  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={cover} alt="The Grand Budapest Hotel"/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header/>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>404</h2>
          <span className={styles.text}>We&apos;re sorry but it looks like that page does not exist anymore.</span>
        </div>
      </section>
      <div className="page-content">
        <Footer/>
      </div>
    </React.Fragment>
  );
}

export default NotFound;
