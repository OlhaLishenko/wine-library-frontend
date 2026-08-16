import { useEffect, useState } from 'react';
import { Filter, FiterObj } from '../types/Filters';

export const transformFilterList = (filterList: FiterObj): Filter[] => {
  const newList = [];

  for (const [key, value] of Object.entries(filterList)) {
    const newItem = {
      ...value,
      filterName: key,
    };

    newList.push(newItem);
  }

  return newList;
};

export const useUiFilters = () => {
  const [filterList, setFilterList] = useState<Filter[]>([]);

  useEffect(() => {
    fetch('/data/wine_filters.json')
      .then((response) => response.json())
      .then((result) => {
        const normalizedList = transformFilterList(result);

        setFilterList(normalizedList);
      });
  }, []);

  return filterList;
};
