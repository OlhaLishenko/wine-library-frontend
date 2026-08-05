// import {
//   createContext,
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useMemo,
//   useState,
// } from 'react';

// type PageContextType = {
//   page: number;
//   setPage: Dispatch<SetStateAction<number>>;
//   hasMore: boolean;
//   setHasMore: Dispatch<SetStateAction<boolean>>;
// };

// export const PageContext = createContext<PageContextType>({
//   page: 0,
//   setPage: () => {},
//   hasMore: true,
//   setHasMore: () => {},
// });

// export const PageProvider = ({ children }: { children: ReactNode }) => {
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);

//   const value = useMemo(
//     () => ({ page, setPage, hasMore, setHasMore }),
//     [page, hasMore]
//   );

//   return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
// };
