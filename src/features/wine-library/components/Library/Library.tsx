import { useLocation } from 'react-router';
import { ProductList } from '@/features/wine-library/components/ProductList';
import { FilterMenu } from '@/features/wine-library/components/FilterMenu';
import { Filters } from '@/features/wine-library/components/Filters';
import { SearchNameInputLayout } from '@/features/wine-library/components/SearchNameInput';
import { useScreenWidth } from '@/shared/hooks/useScreenWidth';
import clsx from 'clsx';
import styles from './Library.module.scss';
import { useAppSelector } from '@/store/hooks';
import { useWineFilters } from '../../hooks/useWineFilters';
import { useEffect, useState } from 'react';
import { Loader } from '@/shared/components/Loader';

export function Library() {
  const location = useLocation();
  const { wineList } = useAppSelector((state) => state.wineList);
  const { isDesktop } = useScreenWidth();
  const { resetFilters } = useWineFilters();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (wineList.length > 0) {
      setLoader(false);
    }
  }, [wineList]);

  return (
    <main className={clsx('container', styles.main)}>
      {isDesktop && (
        <div className={clsx(styles.filterLeftMenu)}>
          <FilterMenu>
            <button onClick={resetFilters}>
              <span className={styles.title}>Clear all</span>
            </button>
          </FilterMenu>
        </div>
      )}
      <div className={styles.container}>
        <SearchNameInputLayout>
          {location.pathname === '/library' && !isDesktop && <Filters />}
        </SearchNameInputLayout>

        <div className={clsx(styles.mainContent)}>
          <div className={styles.libraryList}>
            {loader ? (
              <div className={styles.loader}>
                <Loader loading={loader} />
              </div>
            ) : (
              <ProductList />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
