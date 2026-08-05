import React from 'react';
import styles from './TopNav.module.scss';
import { Link, useLocation } from 'react-router';
import { Icons } from '@/assets/icons';
import clsx from 'clsx';

type TopNavProps = { wineName?: string };

export const TopNav: React.FC<TopNavProps> = ({ wineName }) => {
  const { pathname } = useLocation();

  const currentPage = wineName ? wineName : pathname[pathname.length - 1];
  return (
    <div className={styles.topNav}>
      <Link to="/library">
        <Icons.Arrow className={styles.icon} />
      </Link>
      <Link to="/library" className={clsx(styles.link)}>
        Library
      </Link>
      <span className={styles.link}>/</span>
      <Link
        className={clsx(styles.link, styles.linkActive)}
        to={`${currentPage}`}
        aria-disabled
      >
        {currentPage}
      </Link>
    </div>
  );
};
