import React from 'react';
import styles from './BtnTitle.module.scss';

type BtnTitleProps = {
  children: React.ReactNode;
};

export const BtnTitle: React.FC<BtnTitleProps> = ({ children }) => {
  return <p className={styles.btnTitle}>{children}</p>;
};
