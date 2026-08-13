import { WineFilters, WineFilterKey } from '@/shared/types/WineFilters';

export const getArrayFilterValue = (
  filters: WineFilters,
  key: WineFilterKey
): string[] => {
  const value = filters[key];
  return Array.isArray(value) ? value : [];
};
