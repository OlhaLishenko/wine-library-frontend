import { useSearchParams } from 'react-router';
import { useMemo, useCallback } from 'react';
import { WineFilters, WineFilterKey } from '@/shared/types/WineFilters';
import { Filter, FilterValue } from '@/shared/types/Filters';

export const useWineFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const page = searchParams.get('page');
    const minAlcohol = searchParams.get('minAlcohol');
    const maxAlcohol = searchParams.get('maxAlcohol');
    const name = searchParams.get('name');

    return {
      page: page ? Number(page) : 0,
      name: name ?? '',
      wineTypes: searchParams.getAll('wineTypes') ?? [],
      sugarTypes: searchParams.getAll('sugarTypes') ?? [],
      countryIds: searchParams.getAll('countryIds') ?? [],
      regionIds: searchParams.getAll('regionIds') ?? [],
      producerIds: searchParams.getAll('producerIds') ?? [],
      vintages: searchParams.getAll('vintages') ?? [],
      agingTypes: searchParams.getAll('agingTypes') ?? [],
      grapeIds: searchParams.getAll('grapeIds') ?? [],
      minAlcohol: minAlcohol ? Number(minAlcohol) : 8,
      maxAlcohol: maxAlcohol ? Number(maxAlcohol) : 20,
    };
  }, [searchParams]);

  const toggleOption = useCallback(
    (key: WineFilterKey, option: string) => {
      const next = new URLSearchParams(searchParams);
      const current = next.getAll(key);

      next.delete(key);

      const updated = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];

      updated.forEach((value) => next.append(key, value));

      next.delete('name');
      next.set('page', '0');

      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  const updateFilters = useCallback(
    (
      patch: Partial<Pick<WineFilters, 'page' | 'minAlcohol' | 'maxAlcohol'>>
    ) => {
      const next = new URLSearchParams(searchParams);

      Object.entries(patch).forEach(([key, value]) => {
        if (value === undefined || value === null || value === 0) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });

      const isOnlyPageChange =
        Object.keys(patch).length === 1 && 'page' in patch;
      if (!isOnlyPageChange) {
        next.delete('name');
      }

      if (!('page' in patch)) {
        next.set('page', '0');
      }

      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  const setNameSearch = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (trimmed.length === 0) {
        const next = new URLSearchParams(searchParams);
        next.delete('name');
        setSearchParams(next);
        return;
      }
      setSearchParams({ name: trimmed, page: '0' });
    },
    [searchParams, setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return { filters, toggleOption, updateFilters, resetFilters, setNameSearch };
};
