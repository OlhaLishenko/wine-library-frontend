import React, { useContext, useMemo, useState } from 'react';
import styles from './FilterItem.module.scss';
import { Icons } from '@/assets/icons';
import clsx from 'clsx';
import { Filter, FilterValue } from '@/shared/types/Filters';
import { Checkbox } from '@/features/auth/components/Checkbox/Checkbox';
import { useScreenWidth } from '@/shared/hooks/useScreenWidth';
import { useWineFilters } from '../../hooks/useWineFilters';
import { WineFilterKey } from '@/shared/types/WineFilters';
import { UIModalContext } from '../../hooks/useUIModalContext';

export const getFilterOptionValue = (option: FilterValue): string => {
  if (typeof option === 'string' || typeof option === 'number') {
    return String(option);
  }
  return String('id' in option ? option.id : option.code);
};

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

  const isChecked =
    filters[filterItem.filterName]?.includes(optionValue) ?? false;

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
};

export const FilterItem: React.FC<FilterItemType> = ({ filterItem }) => {
  const [isOpen, setIsOpen] = useState(false);

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
