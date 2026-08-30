import React from 'react';
import styles from './PourPlanPaceCard.module.scss';
import clsx from 'clsx';

type PourPlanPaceCardProps = {
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
};

export const PourPlanPaceCard: React.FC<PourPlanPaceCardProps> = ({
  title,
  description,
  selected,
  onSelect,
}) => {
  return (
    <button
      type="button"
      className={clsx(styles.card, selected && styles.selected)}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </button>
  );
};
