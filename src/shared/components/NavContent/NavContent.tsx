import React from 'react';
import styles from './NavContent.module.scss';
import clsx from 'clsx';
import { NavLink } from 'react-router';
import { NAVLINKS } from '@/shared/constants/navLinks';

type NavContentProps = {
  variant: 'aside' | 'buttonMenu';
};

export const NavContent: React.FC<NavContentProps> = ({ variant }) => {
  const linkList = Object.values(NAVLINKS).flat();

  const linkClassName = (isActive: boolean) => {
    if (isActive && variant === 'buttonMenu') {
      return styles.active;
    }

    if (isActive && variant === 'aside') {
      return styles.activeAside;
    }
  };

  return (
    <ul
      className={clsx(styles.nav, {
        [styles.horizontalMode]: variant === 'aside',
      })}
    >
      {linkList.map((link) => (
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            clsx(styles.navLink, linkClassName(isActive), {
              [styles.navLinkAside]: variant === 'aside',
            })
          }
          key={link.name}
        >
          <li
            key={link.name}
            className={clsx(styles.navItem, {
              [styles.navItemAside]: variant === 'aside',
            })}
          >
            {link.icon}
            <span
              className={clsx(styles.navTitle, {
                [styles.horizontalModeTitle]: variant === 'aside',
              })}
            >
              {link.name}
            </span>
          </li>
        </NavLink>
      ))}
    </ul>
  );
};
