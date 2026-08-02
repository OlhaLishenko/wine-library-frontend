import React, { useContext } from 'react';
import styles from './Header.module.scss';
import { Icons } from '@/assets/icons';
import { Logo } from '@/shared/components/Logo/Logo';
import clsx from 'clsx';
import { useScreenWidth } from '@/shared/hooks/useScreenWidth';
import { Avatar } from '@/shared/components/Avatar';
import { NavLink, useLocation } from 'react-router';
import { useAppSelector } from '@/store/hooks';
import { User } from '@/features/auth/types/User';
import { NAVLINKS } from '@/shared/constants/navLinks';
import { UIModalContext } from '../../hooks/useUIModalContext';
import { UserInfoBlock } from '@/shared/components/UserInfoBlock';

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  const { isDesktop } = useScreenWidth();
  const { setOpenMenu } = useContext(UIModalContext);
  const currentUser = useAppSelector<User | null>((state) => state.currentUser);
  const location = useLocation();
  const linkToPage =
    location.pathname === '/favorites' ? NAVLINKS.library : NAVLINKS.favorites;

  const userEmail = currentUser ? currentUser.email : 'Unknown email';
  const userFullName = currentUser ? currentUser.fullName : 'Unknown user';

  return (
    <header className={clsx('container', styles.header)}>
      <Logo direction="horizontal" />

      {isDesktop ? (
        <div className={styles.headerNav}>
          <NavLink to={linkToPage.path}>
            <button className={clsx('icon', styles.headerNavIcon)}>
              <linkToPage.icon />
            </button>
          </NavLink>
          <UserInfoBlock user={{ email: userEmail, fullName: userFullName }} />
        </div>
      ) : (
        <button
          className={styles.menuBtn}
          aria-label="Menu"
          onClick={() => setOpenMenu(true)}
        >
          <Icons.Menu />
        </button>
      )}
    </header>
  );
};
