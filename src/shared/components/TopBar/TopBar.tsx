import React from 'react';
import styles from './TopBar.module.scss';
import { Icons } from '@/assets/icons';
import { Button } from '@/shared/components/Button/Button';
import { FavoriteItem } from '@/shared/types/FavoriteItem';
import clsx from 'clsx';

type TopBarProps = {
  sortList: () => void;
  list: FavoriteItem[];
  sortBtnTitle: string;
  removeAll: () => void;
};

export const TopBar: React.FC<TopBarProps> = ({
  sortList,
  list,
  sortBtnTitle,
  removeAll,
}) => {
  return (
    <div className={styles.topBar}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>My Favorites</h1>
        <h1 className={styles.listAmoint}>{list.length} wines</h1>
      </div>
      <div className={styles.btnContainer}>
        <Button onClick={removeAll} disabled={list.length === 0}>
          Remove all
        </Button>
        <div className={styles.sortBtnContainer}>
          <Button
            label="fullWidth"
            variant="ghost"
            fullWidth
            onClick={sortList}
            disabled={list.length === 0}
          >
            <div
              className={clsx(styles.btnContent, {
                [styles.alert]: list.length === 1,
              })}
            >
              <span className={styles.btnTitle}>{sortBtnTitle}</span>
              <div className={styles.iconContainer}>
                <Icons.Arrow className="icon icon--small" />
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
