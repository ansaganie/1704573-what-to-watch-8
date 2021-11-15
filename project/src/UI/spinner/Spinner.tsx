import React from 'react';
import styles from './spinner.module.css';

type SpinnerProps = {
  centered?: boolean,
  fullScreen?: boolean,
}

function Spinner(props: SpinnerProps):JSX.Element {
  const { centered, fullScreen } = props;
  let className = styles.wrapper;

  if (centered) {
    className = styles.centered;
  }

  if (fullScreen) {
    className = styles.fullScreen;
  }

  return (
    <div className={className}>
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
