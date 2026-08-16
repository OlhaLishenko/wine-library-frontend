import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router';
import { wakeUpAuthServer } from '@/api/authClient';
import { UIModalContext } from './features/wine-library/hooks/useUIModalContext';
import { useWineFilters } from './features/wine-library/hooks/useWineFilters';
import { getFavoriteList } from './store/Favorites/getFavorites';
import { useAppDispatch } from './store/hooks';
import { loadWineList } from './store/Library/wineListSlice';

function App() {
  const { openFilters, openMenu } = useContext(UIModalContext);
  const { filters } = useWineFilters();
  const dispatch = useAppDispatch();
  useEffect(() => {
    wakeUpAuthServer();
  }, []);

  useEffect(() => {
    dispatch(loadWineList({ filters, name: filters.name }));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(getFavoriteList());
  }, [dispatch]);

  useEffect(() => {
    if (openFilters || openMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [openFilters, openMenu]);

  return <Outlet />;
}

export default App;
