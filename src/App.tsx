import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router';
import { wakeUpAuthServer } from '@/api/authClient';
import { UIModalContext } from './features/wine-library/hooks/useUIModalContext';

function App() {
  const { openFilters, openMenu } = useContext(UIModalContext);
  useEffect(() => {
    wakeUpAuthServer();
  }, []);

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
