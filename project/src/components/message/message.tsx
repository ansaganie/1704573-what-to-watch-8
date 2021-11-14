import React from 'react';
import styles from './message.module.css';

type MessageProps = {
  message: string,
  lightBackground?: boolean,
  centered?: boolean,
  fontSize?: number,
}

function Message(props: MessageProps): JSX.Element {
  const {
    message,
    lightBackground,
    centered,
    fontSize,
  } = props;

  const inlineCss = {
    fontSize,
  };

  return (
    <div
      className={`
        ${styles.root}
        ${centered && styles.centered}
        ${lightBackground && styles.lightBackground}
      `}
      style={inlineCss}
    >
      {message}
    </div>
  );
}

export default Message;
