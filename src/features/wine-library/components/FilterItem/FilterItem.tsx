import React, { useContext, useState } from 'react';
import styles from './FilterItem.module.scss';
import { Icons } from '@/assets/icons';
import clsx from 'clsx';
import { Filter, FilterValue } from '@/shared/types/Filters';
import { Checkbox } from '@/features/auth/components/Checkbox/Checkbox';
import { useScreenWidth } from '@/shared/hooks/useScreenWidth';
import { useWineFilters } from '../../hooks/useWineFilters';
import { UIModalContext } from '../../hooks/useUIModalContext';
import { getFilterOptionValue } from '@/utility/getFilterOptionValue';
import { getArrayFilterValue } from '@/utility/getArrayFilterValue';

const IconControl = ({ isOpen }: { isOpen: boolean }) => {
  const { isDesktop } = useScreenWidth();

  if (isDesktop) {
    return <Icons.Arrow class={styles.control} />;
  }

  return <>{isOpen ? <Icons.Minus /> : <Icons.Plus />}</>;
};

const OptionItem = ({
  option,
  filterItem,
}: {
  option: FilterValue;
  filterItem: Filter;
}) => {
  const { toggleOption, filters } = useWineFilters();
  const { setOpenFilters } = useContext(UIModalContext);

  const optionValue = getFilterOptionValue(option);
  const optionLabel =
    typeof option === 'string' || typeof option === 'number'
      ? String(option)
      : option.name;

  const isChecked = getArrayFilterValue(
    filters,
    filterItem.filterName
  ).includes(optionValue);

  const handleChangeFilter = (option: FilterValue) => {
    toggleOption(filterItem.filterName, getFilterOptionValue(option));
    setOpenFilters(false);
  };

  return (
    <li key={optionLabel} className={clsx(styles.option)}>
      <Checkbox
        value={optionValue}
        checked={isChecked}
        onChange={() => handleChangeFilter(option)}
        id={`${filterItem.filterName}-${optionValue}`}
        label={optionLabel}
      />
    </li>
  );
};

type FilterItemType = {
  filterItem: Filter;
  isOpen: boolean;
  onToggle: () => void;
};

export const FilterItem: React.FC<FilterItemType> = ({
  filterItem,
  isOpen,
  onToggle,
}) => {
  const columnOptionList =
    filterItem.label === 'Producer' ||
    filterItem.label === 'Region' ||
    filterItem.label === 'Vintage (year)' ||
    filterItem.label === 'Country' ||
    filterItem.label === 'Grape variety';

  return (
    <li>
      <button
        type="button"
        className={clsx(styles.filterBtn)}
        onClick={onToggle}
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
        {filterItem.values.map((option) => (
          <OptionItem
            key={getFilterOptionValue(option)}
            option={option}
            filterItem={filterItem}
          />
        ))}
      </ul>
    </li>
  );
};
