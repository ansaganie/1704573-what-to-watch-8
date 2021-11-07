import React from 'react';
import styles from './spinner.module.css';

type SpinnerProps = {
  isFullScreen?: boolean,
}

function Spinner(props: SpinnerProps):JSX.Element {
  const { isFullScreen } = props;

  return (
    <div className={isFullScreen ? styles.fullScreen : styles.wrapper}>
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
