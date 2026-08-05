import React from 'react';
import styles from './ProductList.module.scss';
import { ProductCard } from '@/features/wine-library/components/ProductCard';
import { Button } from '@/features/auth/components/Button/Button';
import { BtnTitle } from '@/shared/components/BtnTitle';
import { useScreenWidth } from '@/shared/hooks/useScreenWidth';
import { useAppSelector } from '@/store/hooks';
import { useWineFilters } from '../../hooks/useWineFilters';

type ProductListProps = {};

export const ProductList: React.FC<ProductListProps> = ({}) => {
  const { wineList, isLast, error } = useAppSelector((state) => state.wineList);
  const { isMobile } = useScreenWidth();
  const { filters, updateFilters } = useWineFilters();

  const buttonTitle = isMobile ? 'Load More' : 'Load More Wines';

  const loadMore = () => {
    if (!isLast) {
      updateFilters({ page: filters.page + 1 });
    }
  };

  return (
    <div className={styles.productListContainer}>
      {error ? (
        <span className={styles.error}>{error}</span>
      ) : wineList.length === 0 ? (
        <span className={styles.error}>
          Can not find wines with that filters
        </span>
      ) : (
        <div className={styles.productList}>
          {wineList.map((item) => (
            <ProductCard wineItem={item} key={item.id} />
          ))}
        </div>
      )}

      {!error && wineList.length !== 0 && (
        <div className={styles.btnContainer}>
          <Button variant="ghost" onClick={loadMore} disabled={isLast}>
            <BtnTitle>{buttonTitle}</BtnTitle>
          </Button>
        </div>
      )}
    </div>
  );
};
