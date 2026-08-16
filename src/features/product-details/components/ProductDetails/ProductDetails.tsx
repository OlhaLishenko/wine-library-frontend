import React from 'react';
import styles from './ProductDetails.module.scss';
import { WineType } from '@/shared/types/WineType';
import { getImageUrl } from '@/utility/getImageUrl';
import { ProductCardTitle } from '@/shared/components/ProductCardTitle';
import { ProductCardSubtitle } from '@/shared/components/ProductCardSubtitle';
import { Button } from '@/shared/components/Button/Button';
import { BtnTitle } from '@/shared/components/BtnTitle/BtnTitle';
import { clsx } from 'clsx';
import { getPropertyList } from '@/utility/getPropertyList';
import { DetailsList } from '@/shared/components/DetailsList';
import { DetailsTable } from '@/shared/components/DetailsTable';
import { SectionText } from '@/shared/components/SectionText';
import { Line } from '@/shared/components/Line';
import { TopNav } from '@/shared/components/TopNav';
import { normolizeTitle } from '@/utility/normolizeTitle';
import { ProductSliderSection } from '@/shared/components/Slider/ProductSliderSection';
import { useScreenWidth } from '@/shared/hooks/useScreenWidth';
import { useAppSelector } from '@/store/hooks';
import { Icons } from '@/assets/icons';
import { useFavorites } from '@/features/favorites/hooks/useFavorites';

type ProductDetailsProps = {
  wineDetails: WineType | null;
  sliderWineList: WineType[];
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  wineDetails,
  sliderWineList,
}) => {
  const { loader } = useAppSelector((state) => state.saveFavorite);
  const { toggleFavItem, favoriteIds } = useFavorites();

  if (!wineDetails) {
    return;
  }

  const isFav = favoriteIds.has(wineDetails.id);

  const { isMobile } = useScreenWidth();

  const propertyList = getPropertyList(wineDetails);

  const sectionListFirst = [
    {
      title: 'About this wine',
      body: <SectionText text={wineDetails.description} />,
    },
    {
      title: 'Grape varieties',
      body: <DetailsList list={wineDetails.grapes} />,
    },
    {
      title: 'Food pairings',
      body: <DetailsList list={wineDetails.foods} />,
    },
  ];

  const sectionTable = {
    title: 'Wine information',
    body: <DetailsTable propertyList={propertyList} />,
  };

  const mainProrerties = [
    { title: 'Vintage', value: wineDetails.vintage },
    { title: 'Type', value: wineDetails.wineType },
    { title: 'Alcohol', value: wineDetails.alcohol },
    { title: 'Volume', value: wineDetails.volume },
  ];

  const sliderContent = {
    title: 'New wines',
    list: sliderWineList,
  };

  return (
    <div className={styles.productDetails}>
      <TopNav wineName={wineDetails.name} />
      <div className={styles.topWrapper}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={getImageUrl(`${wineDetails.imageUrl}`)}
            alt={wineDetails.name}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>
              {normolizeTitle(wineDetails.wineType)}
            </span>
            <span className={styles.infoLabel}>
              {normolizeTitle(wineDetails.sugarType)}
            </span>
          </div>
          <div className={styles.title}>
            <ProductCardTitle name={wineDetails.name} />
            <ProductCardSubtitle wineItem={wineDetails} />
          </div>
          <Line />
          <div className={styles.propertyContainer}>
            {mainProrerties.map((item) => (
              <div className={styles.propertyItem} key={item.title}>
                <span className={styles.propertyText}>{item.title}</span>
                <span
                  className={clsx(styles.propertyText, styles.propertyValue)}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <Button
            onClick={() => toggleFavItem(wineDetails)}
            fullWidth
            variant={!isMobile ? 'narrow' : 'primary'}
            loading={loader}
          >
            {isFav ? (
              <BtnTitle>
                <Icons.LikeFull
                  className={clsx(styles.icon, 'icon icon--small')}
                />
                Remove from favorites
              </BtnTitle>
            ) : (
              <BtnTitle>+ Add to favorites</BtnTitle>
            )}
          </Button>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.containerList}>
          {sectionListFirst.map((section) => (
            <div className={styles.aboutSection} key={section.title}>
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              {section.body}
            </div>
          ))}
        </div>
        <div className={styles.tableContainer}>
          <h3 className={styles.sectionTitle}>{sectionTable.title}</h3>
          {sectionTable.body}
        </div>
      </div>
      <ProductSliderSection content={sliderContent} />
    </div>
  );
};
