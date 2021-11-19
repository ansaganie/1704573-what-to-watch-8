import React from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './not-found-screen.module.css';

function NotFound():JSX.Element {
  return (
    <div className="user-page">

      <h1 className="visually-hidden">WTW</h1>
      <Header userPage>
        <h1 className="page-title user-page__title">Not Found</h1>
      </Header>
      <section className="catalog">
        <div className={styles.wrapper}>
          <h2 className={styles.title}>404</h2>
          <span className={styles.text}>We&apos;re sorry but it looks like that page does not exist anymore.</span>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default NotFound;
