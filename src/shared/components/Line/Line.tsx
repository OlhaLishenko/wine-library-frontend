import React from 'react';
import styles from './Line.module.scss';

type LineProps = {};

export const Line: React.FC<LineProps> = ({}) => {
  return <div className={styles.line}></div>;
};
