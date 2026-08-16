import { Filter } from '@/shared/types/Filters';
import { WineFilterKey } from '@/shared/types/WineFilters';
import { getFilterOptionValue } from './getFilterOptionValue';

export const getFilterOptionName = (
  filterList: Filter[],
  filterName: WineFilterKey,
  value: string
): string => {
  const filter = filterList.find((f) => f.filterName === filterName);
  const option = filter?.values.find(
    (opt) => getFilterOptionValue(opt) === value
  );

  if (option && typeof option === 'object' && 'name' in option) {
    return option.name;
  }

  return option != null ? String(option) : value;
};
