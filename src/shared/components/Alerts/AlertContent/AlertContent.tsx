import React from 'react';
import styles from './AlertContent.module.scss';
import { Icons } from '@/assets/icons';
import { TITLE } from '@/shared/constants/context';

type AlertContentProps = {
  message: string;
};

export const AlertContent: React.FC<AlertContentProps> = ({ message }) => {
  return (
    <div className={styles.content}>
      <Icons.ErrorAlert />
      <div className={styles.textContent}>
        <h1 className={styles.textContentTitle}>{TITLE.modal.title}</h1>
        <h2 className={styles.textContentSubtitle}>{message}</h2>
      </div>
    </div>
  );
};
