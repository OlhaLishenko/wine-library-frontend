import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { wakeUpAuthServer } from '@/api/authClient';

function App() {
  useEffect(() => {
    wakeUpAuthServer();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
