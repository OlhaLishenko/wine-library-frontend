import React, { ReactNode, useContext, useMemo, useState } from 'react';
import styles from './FilterMenu.module.scss';
import clsx from 'clsx';
import { HeaderFiltersMenu } from '@/shared/components/HeaderFiltersMenu';
import { useUiFilters } from '@/shared/hooks/useUiFilters';
import { Icons } from '@/assets/icons';
import AlcoholRange from '../AlcoholRange/AlcoholRange';
import { useWineFilters } from '../../hooks/useWineFilters';
import { WineFilterKey } from '@/shared/types/WineFilters';
import { getFilterOptionName } from '@/utility/getFilterOptionName';
import { FilterItem } from '../FilterItem';

type FilterMenuProps = {
  children: ReactNode;
};

export const FilterMenu: React.FC<FilterMenuProps> = ({ children }) => {
  const filterList = useUiFilters();
  const { toggleOption, filters } = useWineFilters();
  const [openFilterName, setOpenFilterName] = useState<WineFilterKey | null>(
    null
  );
  const handleToggle = (name: WineFilterKey) => {
    setOpenFilterName((prev) => (prev === name ? null : name));
  };

  const activeFilters = useMemo(
    () =>
      Object.entries(filters)
        .filter(([key]) => key !== 'page')
        .flatMap(([filterName, values]) =>
          Array.isArray(values)
            ? (values as string[]).map((value) => ({
                filterName: filterName as WineFilterKey,
                value,
                name: getFilterOptionName(
                  filterList,
                  filterName as WineFilterKey,
                  value
                ),
              }))
            : []
        ),
    [filters, filterList]
  );

  return (
    <div className={styles.filterContainer}>
      <HeaderFiltersMenu>{children}</HeaderFiltersMenu>
      <AlcoholRange />

      <ul className={styles.activeFilters}>
        {activeFilters.map((item) => (
          <li
            key={`${item.filterName}-${item.value}`}
            className={styles.activeFilterItem}
          >
            <span>{item.name}</span>
            <button onClick={() => toggleOption(item.filterName, item.value)}>
              <Icons.Cross class="icon icon--small" />
            </button>
          </li>
        ))}
      </ul>

      <ul className={clsx(styles.filterList)}>
        {filterList.map((filterItem) => (
          <FilterItem
            key={filterItem.filterName}
            filterItem={filterItem}
            isOpen={openFilterName === filterItem.filterName}
            onToggle={() => handleToggle(filterItem.filterName)}
          />
        ))}
      </ul>
    </div>
  );
};
