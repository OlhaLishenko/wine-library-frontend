import React from 'react';
import styles from './DetailsList.module.scss';
import clsx from 'clsx';

type DetailsListProps = {
  list: string[];
};

export const DetailsList: React.FC<DetailsListProps> = ({ list }) => {
  return (
    <div className={styles.detailsWrapper}>
      {list.map((item) => (
        <span className={clsx(styles.item)}>{item}</span>
      ))}
    </div>
  );
};
