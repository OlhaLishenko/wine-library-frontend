import React, { useContext } from 'react';
import styles from './Filters.module.scss';
import { Icons } from '@/assets/icons';
import { Button } from '@/shared/components/Button/Button';
import clsx from 'clsx';
import { BtnTitle } from '@/shared/components/BtnTitle';
import { UIModalContext } from '../../hooks/useUIModalContext';

type FiltersProps = {};

export const Filters: React.FC<FiltersProps> = () => {
  const { setOpenFilters } = useContext(UIModalContext);

  const btnContent = [
    {
      label: 'Filters',
      title: <BtnTitle>Filters</BtnTitle>,
      variant: 'filter',
      icon: <Icons.Menu className={clsx(styles.icon, styles.dark)} />,
    },
  ];

  return (
    <div className={styles.filterBtns}>
      {btnContent.map((btn) => (
        <Button
          key={btn.label}
          variant={btn.variant as 'filter' | 'ghost'}
          onClick={() => setOpenFilters(true)}
        >
          <div
            className={clsx(
              styles.iconContainer,
              btn.variant === 'filter' ? styles.dark : styles.light
            )}
          >
            {btn.icon}
            <p className={styles.btnTitle}>{btn.title}</p>
          </div>
        </Button>
      ))}
    </div>
  );
};
