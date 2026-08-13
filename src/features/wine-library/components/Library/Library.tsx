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
import { RiseLoader } from 'react-spinners';
import { Loader } from '@/shared/components/Loader';

export function Library() {
  const location = useLocation();
  const { loading } = useAppSelector((state) => state.wineList);
  const { isDesktop } = useScreenWidth();
  const { resetFilters } = useWineFilters();

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
            {loading ? (
              <div className={styles.loader}>
                <Loader loading={loading} />
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
