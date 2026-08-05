import React, { useContext } from 'react';
import styles from './FilterAsideMenu.module.scss';
import { Icons } from '@/assets/icons';
import clsx from 'clsx';
import { Button } from '@/features/auth/components/Button/Button';
import { FilterMenu } from '../FilterMenu';
import { UIModalContext } from '../../hooks/useUIModalContext';
import { useWineFilters } from '../../hooks/useWineFilters';

type FilterAsideMenuProps = {};

export const FilterAsideMenu: React.FC<FilterAsideMenuProps> = () => {
  const { openFilters, setOpenFilters } = useContext(UIModalContext);
  const { resetFilters } = useWineFilters();
  return (
    <div
      className={clsx('container', styles.filterAsideMenu, {
        [styles.isActive]: openFilters,
      })}
    >
      <FilterMenu>
        <button onClick={() => setOpenFilters(false)}>
          <Icons.Close />
        </button>
      </FilterMenu>
      <div className={styles.filterAsideFooter}>
        <Button
          variant="ghost"
          onClick={() => {
            resetFilters();
            setOpenFilters(false);
          }}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};
