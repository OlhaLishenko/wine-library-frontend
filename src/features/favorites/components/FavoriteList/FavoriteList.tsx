import React from 'react';
import { ProductCard } from '@/shared/components/ProductCard';
import styles from './FavoriteList.module.scss';
import { FavoriteItem } from '@/shared/types/FavoriteItem';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';

type FavoriteListProps = {
  list: FavoriteItem[];
};

export const FavoriteList: React.FC<FavoriteListProps> = ({ list }) => {
  const navigate = useNavigate();

  const moveToDetails = (
    e: React.MouseEvent<HTMLDivElement>,
    item: FavoriteItem
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/wines/${item.wine.id}`);
  };
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
            <div onClick={(e) => moveToDetails(e, item)}>
              <ProductCard
                key={item.id}
                wineItem={item.wine}
                isFavoritePage={true}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
