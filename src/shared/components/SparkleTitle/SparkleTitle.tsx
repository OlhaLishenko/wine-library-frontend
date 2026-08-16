import React from 'react';
import styles from './SparkleTitle.module.scss';
import { SparkleIcon } from '../icons/Icons';

type SparkleTitleProps = {
  title: string;
};

export const SparkleTitle: React.FC<SparkleTitleProps> = ({ title }) => {
  return (
    <span className={styles.sparkleTitle}>
      <SparkleIcon /> {title}
    </span>
  );
};
