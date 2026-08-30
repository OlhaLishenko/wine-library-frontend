import React from 'react';
import styles from './PourPlanPage.module.scss';
import { PourPlanWelcome } from '@/features/pour-plan/components/PourPlanWelcome/PourPlanWelcome';

export const PourPlanPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <PourPlanWelcome />
    </div>
  );
};
