import React from 'react';
import styles from './DetailsTable.module.scss';
import { clsx } from 'clsx';
import { normolizeTitle } from '@/utility/normolizeTitle';

type DetailsTableProps = {
  propertyList: { title: string; value: string | number }[];
};

export const DetailsTable: React.FC<DetailsTableProps> = ({ propertyList }) => {
  return (
    <div className={styles.tableWrapper}>
      {propertyList.map((item) => (
        <span className={clsx(styles.container)} key={item.title}>
          <div className={styles.title}>{normolizeTitle(item.title)}</div>
          <div className={styles.value}>
            {normolizeTitle(String(item.value))} {item.title === 'price' && '$'}
          </div>
        </span>
      ))}
    </div>
  );
};
