import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './SearchNameInput.module.scss';
import { Input } from '@/shared/components/Input/Input';
import clsx from 'clsx';
import debounce from 'lodash.debounce';
import { useWineFilters } from '../../hooks/useWineFilters';

type SearchNameInputLayoutProps = { children?: React.ReactNode };

export const SearchNameInputLayout: React.FC<SearchNameInputLayoutProps> = ({
  children,
}) => {
  const { filters, setNameSearch } = useWineFilters();
  const [inputValue, setInputValue] = useState(filters.name);

  useEffect(() => {
    setInputValue(filters.name);
  }, [filters.name]);

  const debouncedSetName = useMemo(
    () => debounce((value: string) => setNameSearch(value), 400),
    [setNameSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSetName.cancel();
    };
  }, [debouncedSetName]);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetName(value);
  };

  return (
    <div className={clsx(styles.searchLayout)}>
      <Input
        value={inputValue}
        onChange={handleQuery}
        id="wineName"
        name="wineName"
        type="text"
        placeholder="Search for wines..."
        autoComplete="email"
        required
        error={null}
      />
      {children}
    </div>
  );
};
