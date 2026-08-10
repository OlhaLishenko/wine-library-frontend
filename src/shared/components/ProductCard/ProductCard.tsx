import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './ProductCard.module.scss';
import { WineType } from '@/shared/types/WineType';
import { getImageUrl } from '@/utility/getImageUrl';
import { Line } from '@/shared/components/Line';
import { Button } from '@/features/auth/components/Button/Button';
import { BtnTitle } from '@/shared/components/BtnTitle';
import { TITLE } from '@/shared/constants/context';
import { normolizeTitle } from '@/utility/normolizeTitle';
import { useNavigate } from 'react-router';
import { ProductCardSubtitle } from '@/shared/components/ProductCardSubtitle/ProductCardSubtitle';
import { ProductCardTitle } from '@/shared/components/ProductCardTitle/ProductCardTitle';
import { SliderContext } from '@/shared/hooks/SliderContext';
import clsx from 'clsx';
import { Icons } from '@/assets/icons';
import { useAppDispatch } from '@/store/hooks';
import { seveItemToFavorites } from '@/store/Favorites/savetoFavorites';
import { favoritesService } from '@/services/favorites.service';
import { useFavorites } from '@/features/favorites/hooks/useFavorites';
import { setLocalFavoriteList } from '@/store/Favorites/getFavorites';
import { FavoriteItem } from '@/shared/types/FavoriteItem';

type ProductCardProps = {
  wineItem: WineType;
  isSlider?: boolean;
  isFavorites?: boolean;
  deleteFavItem?: (id: number) => void;
  inFavoriteList: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({
    wineItem,
    isSlider = false,
    isFavorites = false,
    deleteFavItem,
    inFavoriteList,
  }) => {
    const navigate = useNavigate();
    const { alcoholIndicator, alcoholTitle, volumeIndicator } =
      TITLE.library.productCard;
    const slideRef = useRef<HTMLDivElement>(null);
    const { setSlideWidth } = useContext(SliderContext);
    const dispatch = useAppDispatch();

    const { localFavoriteList } = useFavorites();

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

    const btnTitle = isFavorites
      ? TITLE.favorites.productCardBtn
      : TITLE.library.productCardBtn;

    const handleCardAction = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!isFavorites) {
        navigate(`/wines/${wineItem.id}`);
      } else {
        deleteFavItem && deleteFavItem(wineItem.id);
      }
    };

    const saveToFavorites = () => {
      if (inFavoriteList) {
        deleteFavItem && deleteFavItem(wineItem.id);
        return;
      }
      dispatch(seveItemToFavorites(wineItem.id));
      const wineToAdd: FavoriteItem = {
        id: localFavoriteList.length,
        wine: wineItem,
        addedAt: '',
      };
      console.log(wineToAdd);

      const updatedList = [...localFavoriteList, wineToAdd];
      dispatch(setLocalFavoriteList(updatedList));
    };

    return (
      <div
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
          <button className={styles.favMark} onClick={saveToFavorites}>
            <div
              className={clsx(styles.iconContainer, {
                [styles.iconActive]: inFavoriteList,
              })}
            >
              {inFavoriteList ? (
                <Icons.LikeFull className="icon icon--small" />
              ) : (
                <Icons.Like className="icon icon--small" />
              )}
            </div>
          </button>
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
              <Button onClick={handleCardAction}>
                <BtnTitle>{btnTitle}</BtnTitle>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
