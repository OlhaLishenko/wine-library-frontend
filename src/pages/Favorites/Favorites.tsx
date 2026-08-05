import React from 'react';
import styles from './Favorites.module.scss';
import { AppLayout } from '@/layouts/AppLayout';

type FavoritesProps = {};

export const Favorites: React.FC<FavoritesProps> = ({}) => {
  return (
    <AppLayout>
      <div className={styles.favorites}>
        <h1 className={styles.title}>Favorites</h1>
        <p className={styles.description}>
          Here you can find your favorite wines.
        </p>
      </div>
    </AppLayout>
  );
};
