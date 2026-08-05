import React, { ReactNode } from 'react';
import styles from './HeaderFiltersMenu.module.scss';

type HeaderFiltersMenuProps = {
  children: ReactNode;
};

export const HeaderFiltersMenu: React.FC<HeaderFiltersMenuProps> = ({
  children,
}) => {
  return (
    <div className="modalHeader">
      <h3 className={styles.title}>Filters</h3>
      {children}
    </div>
  );
};
