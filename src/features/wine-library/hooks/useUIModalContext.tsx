import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  SetStateAction,
  Dispatch,
} from 'react';

type UIModalState = {
  openFilters: boolean;
  setOpenFilters: Dispatch<SetStateAction<boolean>>;
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
};

export const UIModalContext = createContext<UIModalState>({
  openFilters: false,
  setOpenFilters: () => {},
  openMenu: false,
  setOpenMenu: () => {},
});

export function UIModalProvider({ children }: { children: ReactNode }) {
  const [openFilters, setOpenFilters] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const value = useMemo(
    () => ({ openFilters, setOpenFilters, openMenu, setOpenMenu }),
    [openFilters, openMenu]
  );

  return (
    <UIModalContext.Provider value={value}>{children}</UIModalContext.Provider>
  );
}
