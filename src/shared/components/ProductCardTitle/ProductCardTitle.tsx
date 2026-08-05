import React from 'react';
import styles from './ProductCardTitle.module.scss';

type ProductCardTitleProps = {
  name: string;
};

export const ProductCardTitle: React.FC<ProductCardTitleProps> = ({ name }) => {
  return <h3 className={styles.title}>{name}</h3>;
};
