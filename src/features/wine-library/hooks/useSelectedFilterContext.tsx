import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

type SelectedFilter = {
  selectedFilter: string[];
  setSelectedFilter: Dispatch<SetStateAction<string[]>>;
};

export const selectedFilterContext = createContext<SelectedFilter>({
  selectedFilter: [],
  setSelectedFilter: () => {},
});

export function SelectedFilterProvider({ children }: { children: ReactNode }) {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const value = useMemo(
    () => ({ selectedFilter, setSelectedFilter }),
    [selectedFilter]
  );

  return (
    <selectedFilterContext.Provider value={value}>
      {children}
    </selectedFilterContext.Provider>
  );
}
