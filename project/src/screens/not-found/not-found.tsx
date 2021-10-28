import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import styles from './not-found.module.css';

function NotFound():JSX.Element {
  return (
    <div className="user-page">

      <h1 className="visually-hidden">WTW</h1>
      <Header title={'Not Found'}/>
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
