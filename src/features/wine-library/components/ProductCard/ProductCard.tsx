import React from 'react';
import styles from './ProductCard.module.scss';
import { WineType } from '@/shared/types/WineType';
import { getImageUrl } from '@/utility/getImageUrl';
import { Line } from '@/shared/components/Line';
import { Button } from '@/features/auth/components/Button/Button';
import { BtnTitle } from '@/shared/components/BtnTitle';
import { TITLE } from '@/shared/constants/context';
import { normolizeTitle } from '@/utility/normolizeTitle';

type ProductCardProps = {
  wineItem: WineType;
};

export const ProductCard: React.FC<ProductCardProps> = ({ wineItem }) => {
  const { alcoholIndicator, alcoholTitle, volumeIndicator } =
    TITLE.library.productCard;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={getImageUrl(`${wineItem.imageUrl}`)}
          alt={wineItem.name}
        />
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.title}>{wineItem.name}</h3>
        <div className={styles.infoContainer}>
          <div className={styles.subtitle}>
            <span className={styles.subtitle}>{wineItem.country}</span>
            <span className={styles.subtitle}>{wineItem.producer}</span>
          </div>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              {normolizeTitle(wineItem.sugarType)}
            </div>
            <div className={styles.infoItem}>
              {normolizeTitle(wineItem.agingType)}
            </div>
          </div>
          <Line />
          <div className={styles.bottomInfo}>
            <div className={styles.container}>
              <div className={styles.bottomInfoItem}>
                <span className={styles.bottomTitle}>
                  {wineItem.alcohol}
                  {alcoholIndicator}
                </span>
                <span className={styles.subtitle}>{alcoholTitle}</span>
              </div>
              <div className={styles.bottomInfoItem}>
                <span className={styles.bottomTitle}>{wineItem.volume}</span>
                <span className={styles.subtitle}>{volumeIndicator}</span>
              </div>
            </div>
            <Button>
              <BtnTitle>{TITLE.library.productCardBtn}</BtnTitle>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
