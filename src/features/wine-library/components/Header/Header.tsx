import React, { useContext, useState } from 'react';
import styles from './Header.module.scss';
import { Icons, IconsPoll } from '@/assets/icons';
import { Logo } from '@/shared/components/Logo/Logo';
import clsx from 'clsx';
import { useScreenWidth } from '@/shared/hooks/useScreenWidth';
import { NavLink, useLocation } from 'react-router';
import { useAppSelector } from '@/store/hooks';
import { User } from '@/features/auth/types/User';
import { NAVLINKS } from '@/shared/constants/navLinks';
import { UIModalContext } from '../../hooks/useUIModalContext';
import { UserInfoBlock } from '@/shared/components/UserInfoBlock';
import { useLogOut } from '@/shared/hooks/useLogOut';

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  const [minimized, setMinimized] = useState(false);

  const { isDesktop } = useScreenWidth();
  const { setOpenMenu } = useContext(UIModalContext);
  const currentUser = useAppSelector<User | null>((state) => state.currentUser);
  const location = useLocation();
  const favoritesCount = useAppSelector(
    (state) => state.favoriteList.localFavoriteList.length
  );

  const { signOutCurrentUser } = useLogOut();

  const linkToPage =
    location.pathname === '/favorites' ? NAVLINKS.library : NAVLINKS.favorites;

  const userEmail = currentUser ? currentUser.email : 'Unknown email';
  const userFullName = currentUser ? currentUser.fullName : 'Unknown user';

  window.addEventListener('scroll', () => {
    const inTop = window.scrollY === 0;

    if (inTop) {
      setMinimized(false);
    } else {
      setMinimized(true);
    }
  });

  return (
    <header className={clsx('container', styles.header)}>
      <Logo direction="horizontal" showLogo={!minimized} />

      {isDesktop ? (
        <div className={styles.headerNav}>
          <NavLink to={linkToPage.path}>
            <button className={clsx('icon', styles.headerNavIcon)}>
              <linkToPage.icon />
              <div className={styles.favCountMarker}>
                <span className={styles.favCountTitle}>{favoritesCount}</span>
              </div>
            </button>
          </NavLink>

          <NavLink to={'/sommelier'}>
            <button className={styles.btnBig}>
              <IconsPoll.sommelier className={styles.icon} />
              <span className={styles.btnBigTitle}>
                Virtual<br></br>Sommelier
              </span>
            </button>
          </NavLink>

          <UserInfoBlock user={{ email: userEmail, fullName: userFullName }} />
          <button className={styles.logOutBtn} onClick={signOutCurrentUser}>
            <Icons.LogOut />
          </button>
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
