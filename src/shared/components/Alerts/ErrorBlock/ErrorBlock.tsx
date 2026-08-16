import React from 'react';
import styles from './ErrorBlock.module.scss';
import { AlertContent } from '../AlertContent';

type ErrorBlockProps = {
  message: string;
};

export const ErrorBlock: React.FC<ErrorBlockProps> = ({ message }) => {
  return (
    <div className={styles.errorBlock}>
      <AlertContent message={message} />
    </div>
  );
};
