import React from 'react';
import styles from './ProductCardSubtitle.module.scss';
import { WineType } from '@/shared/types/WineType';

type ProductCardSubtitleProps = {
  wineItem: WineType;
};

export const ProductCardSubtitle: React.FC<ProductCardSubtitleProps> = ({
  wineItem,
}) => {
  return (
    <div className={styles.subtitle}>
      <span className={styles.subtitle}>{wineItem.country}</span>
      <span className={styles.subtitle}>{wineItem.producer}</span>
    </div>
  );
};
