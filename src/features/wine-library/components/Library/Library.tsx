import { useLocation } from 'react-router';
import { ProductList } from '@/features/wine-library/components/ProductList';
import { AppLayout } from '@/layouts/AppLayout/AppLayout';
import { FilterMenu } from '@/features/wine-library/components/FilterMenu';
import { Filters } from '@/features/wine-library/components/Filters';
import { SearchNameInputLayout } from '@/features/wine-library/components/SearchNameInput';
import { useScreenWidth } from '@/shared/hooks/useScreenWidth';
import clsx from 'clsx';
import styles from './Library.module.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadWineList } from '@/store/Library/wineListSlice';
import { useWineFilters } from '../../hooks/useWineFilters';
import { RiseLoader } from 'react-spinners';

export function Library() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.wineList);
  const { isDesktop } = useScreenWidth();
  const { filters, resetFilters } = useWineFilters();

  useEffect(() => {
    dispatch(loadWineList({ filters, name: filters.name }));
  }, [dispatch, filters]);

  return (
    <AppLayout>
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
              {loading ? (
                <div className={styles.loader}>
                  <RiseLoader
                    color="#d4af3786"
                    cssOverride={{}}
                    loading
                    margin={10}
                    size={30}
                    speedMultiplier={0.8}
                  />
                </div>
              ) : (
                <ProductList />
              )}
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
