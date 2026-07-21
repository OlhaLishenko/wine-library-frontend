import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

type ModalScreenContextType = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const ModalScreenContext = createContext<ModalScreenContextType>({
  openModal: true,
  setOpenModal: () => {},
});

export const ModalScreenContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const value = useMemo(
    () => ({
      openModal,
      setOpenModal,
    }),
    [openModal]
  );

  return (
    <ModalScreenContext.Provider value={value}>
      {children}
    </ModalScreenContext.Provider>
  );
};
