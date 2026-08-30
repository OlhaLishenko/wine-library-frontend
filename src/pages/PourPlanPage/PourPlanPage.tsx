import React, { useState } from 'react';
import styles from './PourPlanPage.module.scss';
import { PourPlanWelcome } from '@/features/pour-plan/components/PourPlanWelcome/PourPlanWelcome';
import { PourPlanForm } from '@/features/pour-plan/components/PourPlanForm/PourPlanForm';

export const PourPlanPage: React.FC = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className={styles.page}>
      {started ? (
        <PourPlanForm />
      ) : (
        <PourPlanWelcome onStart={() => setStarted(true)} />
      )}
    </div>
  );
};
