import React from 'react';
import styles from './spinner.module.css';

function Spinner():JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
    </div>
  );
}

export default Spinner;
