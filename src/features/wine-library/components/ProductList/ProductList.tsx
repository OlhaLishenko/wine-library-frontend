import React from 'react';
import styles from './ProductList.module.scss';
import { ProductCard } from '@/shared/components/ProductCard';
import { Button } from '@/shared/components/Button/Button';
import { BtnTitle } from '@/shared/components/BtnTitle';
import { useScreenWidth } from '@/shared/hooks/useScreenWidth';
import { useAppSelector } from '@/store/hooks';
import { useWineFilters } from '../../hooks/useWineFilters';
import { EmptyBlock } from '@/shared/components/Alerts/EmptyBlock';
import { TITLE } from '@/shared/constants/context';
import { ErrorBlock } from '@/shared/components/Alerts/ErrorBlock';

type ProductListProps = {};

export const ProductList: React.FC<ProductListProps> = ({}) => {
  const { wineList, isLast, error } = useAppSelector((state) => state.wineList);
  const { isMobile } = useScreenWidth();
  const { filters, updateFilters, resetFilters } = useWineFilters();

  const buttonTitle = isMobile ? 'Load More' : 'Load More Wines';

  const loadMore = () => {
    if (!isLast) {
      updateFilters({ page: filters.page + 1 });
    }
  };

  const alerts = TITLE.library.alerts;
  return (
    <div className={styles.productListContainer}>
      {error ? (
        <ErrorBlock message={error} />
      ) : wineList.length === 0 ? (
        <EmptyBlock
          text={alerts.empty.title}
          btnTitle={alerts.empty.btnName}
          subText={alerts.empty.text}
          btnAction={resetFilters}
        />
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
