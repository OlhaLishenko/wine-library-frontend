import React from 'react';
import styles from './Nav.module.scss';
import clsx from 'clsx';
import { NavContent } from '@/shared/components/NavContent';

type NavProps = {};

export const Nav: React.FC<NavProps> = ({}) => {
  return (
    <nav className={clsx(styles.nav, styles.navWrapper)}>
      <NavContent variant="buttonMenu" />
    </nav>
  );
};
