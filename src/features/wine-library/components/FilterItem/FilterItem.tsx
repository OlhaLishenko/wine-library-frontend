import React, { useContext, useMemo, useState } from 'react';
import styles from './FilterItem.module.scss';
import { Icons } from '@/assets/icons';
import clsx from 'clsx';
import { Filter, FilterValue } from '@/shared/types/Filters';
import { Checkbox } from '@/features/auth/components/Checkbox/Checkbox';
import { useScreenWidth } from '@/shared/hooks/useScreenWidth';
import { useWineFilters } from '../../hooks/useWineFilters';
import { selectedFilterContext } from '../../hooks/useSelectedFilterContext';
import { useSearchParams } from 'react-router';
import { WineFilterKey } from '@/shared/types/WineFilters';
import { UIModalContext } from '../../hooks/useUIModalContext';

export const getFilterOptionValue = (option: FilterValue): string =>
  String('id' in option ? option.id : option.code);

export const getFilterOptionName = (
  filterList: Filter[],
  filterName: WineFilterKey,
  value: string
): string => {
  const filter = filterList.find((f) => f.filterName === filterName);
  const option = filter?.values.find(
    (opt) => getFilterOptionValue(opt) === value
  );
  return option?.name ?? value;
};

const IconControl = ({ isOpen }: { isOpen: boolean }) => {
  const { isDesktop } = useScreenWidth();

  if (isDesktop) {
    return <Icons.Arrow class={styles.control} />;
  }

  return <>{isOpen ? <Icons.Minus /> : <Icons.Plus />}</>;
};

type FilterItemType = {
  filterItem: Filter;
};

export const FilterItem: React.FC<FilterItemType> = ({ filterItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleOption, filters } = useWineFilters();
  const { setOpenFilters } = useContext(UIModalContext);

  const columnOptionList =
    filterItem.label === 'Producer' ||
    filterItem.label === 'Region' ||
    filterItem.label === 'Vintage (year)' ||
    filterItem.label === 'Country' ||
    filterItem.label === 'Grape variety';

  const handleChangeFilter = (option: FilterValue) => {
    toggleOption(filterItem.filterName, getFilterOptionValue(option));
    setOpenFilters(false);
  };

  const rawValue = filters[filterItem.filterName];
  const isChecked = Array.isArray(rawValue)
    ? rawValue.includes(optionValue)
    : false;

  return (
    <li>
      <button
        type="button"
        className={clsx(styles.filterBtn)}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={clsx(styles.filterItem)}>
          {filterItem.label}
          <div className={clsx(styles.icon)}>
            <IconControl isOpen={isOpen} />
          </div>
        </span>
      </button>

      <ul
        className={clsx(styles.optionList, {
          [styles.open]: isOpen,
          [styles.optionListColumn]: columnOptionList,
        })}
      >
        {filterItem.values.map((option) => {
          const optionValue = getFilterOptionValue(option);
          const isChecked =
            filters[filterItem.filterName]?.includes(optionValue) ?? false;

          return (
            <li key={option.name} className={clsx(styles.option)}>
              <Checkbox
                value={optionValue}
                checked={isChecked}
                onChange={() => handleChangeFilter(option)}
                id={`${filterItem.filterName}-${optionValue}`}
                label={option.name}
              />
            </li>
          );
        })}
      </ul>
    </li>
  );
};
