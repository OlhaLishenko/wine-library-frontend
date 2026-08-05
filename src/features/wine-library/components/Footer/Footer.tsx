import React from 'react';
import styles from './Footer.module.scss';
import { clsx } from 'clsx';
import { Nav } from '../Nav';

type FooterProps = {};

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className={clsx(styles.footer)}>
      <Nav />
    </footer>
  );
};
