import React from 'react';
import styles from './PourPlanStatCard.module.scss';

type PourPlanStatCardProps = {
  title: string;
  description: string;
};

export const PourPlanStatCard: React.FC<PourPlanStatCardProps> = ({
  title,
  description,
}) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
