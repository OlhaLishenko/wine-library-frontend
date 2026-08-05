import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

type ScreenContextType = {
  screenWidth: number;
  setScreenWidth: Dispatch<SetStateAction<number>>;
};
export const ScreenContext = createContext<ScreenContextType>({
  screenWidth: window.innerWidth,
  setScreenWidth: () => {},
});

export const ScreenWidthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ScreenContext.Provider value={{ screenWidth, setScreenWidth }}>
      {children}
    </ScreenContext.Provider>
  );
};
