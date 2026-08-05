import React, { useContext, useEffect, useRef } from 'react';
import styles from './ProductCard.module.scss';
import { WineType } from '@/shared/types/WineType';
import { getImageUrl } from '@/utility/getImageUrl';
import { Line } from '@/shared/components/Line';
import { Button } from '@/features/auth/components/Button/Button';
import { BtnTitle } from '@/shared/components/BtnTitle';
import { TITLE } from '@/shared/constants/context';
import { normolizeTitle } from '@/utility/normolizeTitle';
import { Link } from 'react-router';
import { ProductCardSubtitle } from '@/shared/components/ProductCardSubtitle/ProductCardSubtitle';
import { ProductCardTitle } from '@/shared/components/ProductCardTitle/ProductCardTitle';
import { ScreenContext } from '@/shared/hooks/ScreenContext';
import { SliderContext } from '@/shared/hooks/SliderContext';
import clsx from 'clsx';

type ProductCardProps = {
  wineItem: WineType;
  isSlider?: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  wineItem,
  isSlider = 'false',
}) => {
  const { alcoholIndicator, alcoholTitle, volumeIndicator } =
    TITLE.library.productCard;

  const slideRef = useRef<HTMLAnchorElement>(null);
  const { setSlideWidth } = useContext(SliderContext);

  useEffect(() => {
    const handleResizeSlide = () => {
      if (slideRef.current) {
        setSlideWidth(slideRef.current.offsetWidth);
      }
    };

    handleResizeSlide();

    window.addEventListener('resize', handleResizeSlide);

    return () => window.removeEventListener('resize', handleResizeSlide);
  }, [setSlideWidth]);

  return (
    <Link
      to={`/wines/${wineItem.id}`}
      className={clsx(styles.card, {
        [styles.cardSlider]: isSlider,
      })}
      ref={slideRef}
    >
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={getImageUrl(`${wineItem.imageUrl}`)}
          alt={wineItem.name}
        />
      </div>
      <div className={styles.productInfo}>
        <ProductCardTitle name={wineItem.name} />
        <div className={styles.infoContainer}>
          <ProductCardSubtitle wineItem={wineItem} />
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
    </Link>
  );
};
