import React from 'react';
import { ProductCard } from '@/shared/components/ProductCard';
import styles from './FavoriteList.module.scss';
import { FavoriteItem } from '@/shared/types/FavoriteItem';
import { motion, AnimatePresence } from 'framer-motion';

type FavoriteListProps = {
  list: FavoriteItem[];
  deleteFavItem: (id: number) => void;
};

export const FavoriteList: React.FC<FavoriteListProps> = ({
  list,
  deleteFavItem,
}) => {
  return (
    <div className={styles.list}>
      <AnimatePresence>
        {list.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
          >
            <ProductCard
              key={item.id}
              wineItem={item.wine}
              isFavorites={true}
              deleteFavItem={deleteFavItem}
              inFavoriteList={true}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
