import React from 'react';
import styles from './PourPlanSection.module.scss';

type PourPlanSectionProps = {
  index: number;
  title: string;
  children: React.ReactNode;
};

export const PourPlanSection: React.FC<PourPlanSectionProps> = ({
  index,
  title,
  children,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <span className={styles.index}>{index}</span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
};
