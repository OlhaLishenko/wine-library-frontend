import { FilterValue } from '@/shared/types/Filters';

export const getFilterOptionValue = (option: FilterValue): string => {
  if (typeof option === 'string' || typeof option === 'number') {
    return String(option);
  }
  return String('id' in option ? option.id : option.code);
};
