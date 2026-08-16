import React, { useContext, useEffect } from 'react';
import styles from './AppLayout.module.scss';
import { SeparatorLine } from '@/shared/components/SeparatorLine';
import { Header } from '@/features/wine-library/components/Header';
import { Footer } from '@/features/wine-library/components/Footer';
import { clsx } from 'clsx';
import { UserNavigation } from '@/features/wine-library/components/UserNavigation';
import { useScreenWidth } from '@/shared/hooks/useScreenWidth';
import { Line } from '@/shared/components/Line';
import { UIModalContext } from '@/features/wine-library/hooks/useUIModalContext';
import { FilterAsideMenu } from '@/features/wine-library/components/FilterAsideMenu';

type AppLayoutProps = { children: React.ReactNode };

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isDesktop } = useScreenWidth();

  return (
    <div className={clsx(styles.appLayout)}>
      <div className={clsx(styles.appLayoutContainer)}>
        <SeparatorLine />
        <Header />
        <Line />
        {children}
      </div>

      {!isDesktop && <Footer />}

      <FilterAsideMenu />

      <UserNavigation />
    </div>
  );
};
