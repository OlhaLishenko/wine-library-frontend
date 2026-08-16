import App from '@/App';
import { UIModalContext } from '@/features/wine-library/hooks/useUIModalContext';
import { AppLayout } from '@/layouts/AppLayout';
import React, { useContext, useEffect } from 'react';
import styles from './MainLayout.module.scss';
import { Icons } from '@/assets/icons';

export const MainLayout: React.FC = () => {
  const { openFilters, openMenu } = useContext(UIModalContext);

  useEffect(() => {
    document.body.style.overflow = openFilters || openMenu ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [openFilters, openMenu]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppLayout>
      {!openFilters && !openMenu && (
        <button className={styles.goToTopBtn} onClick={scrollToTop}>
          <Icons.ArrowLeft className={styles.icon} />
        </button>
      )}

      <App />
    </AppLayout>
  );
};
